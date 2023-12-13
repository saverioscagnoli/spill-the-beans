import { ipcMain } from "electron";
import { Database } from "../structs/database";
import os from "os";
import bcrypt from "bcrypt";
import { join } from "path";
import { existsSync, readdirSync, statSync, unlinkSync } from "fs";
import { generate } from "generate-password";
import { decrypt, encrypt } from "../crypt";

interface BackendOpts {
  catalogPath: string;
  safesPath: string;
}

class Backend {
  private static instance: Backend;
  private catalog: Database<"name" | "path" | "password">;
  private safesPath: string;

  private constructor({ catalogPath, safesPath }: BackendOpts) {
    this.catalog = new Database({
      path: catalogPath,
      fields: ["name", "path", "password"]
    });

    this.safesPath = safesPath;
  }

  public static build(opts?: BackendOpts) {
    if (!Backend.instance) {
      if (!opts) throw new Error("No opts provided");
      Backend.instance = new Backend(opts);
    }

    return Backend.instance;
  }

  public listen() {
    ipcMain.handle("get-username", this.getUsername.bind(this));
    ipcMain.handle("create-safe", this.createSafe.bind(this));
    ipcMain.handle("open-safe", this.openSafe.bind(this));
    ipcMain.handle("get-safes", this.getSafes.bind(this));
    ipcMain.handle("delete-safe", this.deleteSafe.bind(this));
    ipcMain.handle("gen-password", this.generatePassword.bind(this));
    ipcMain.handle("get-entries", this.getEntries.bind(this));
    ipcMain.handle("create-entry", this.createEntry.bind(this));
  }

  private getUsername(): string {
    return os.userInfo().username;
  }

  private async createSafe(_, args: { name: string; password: string }) {
    let salt = await bcrypt.genSalt(16);
    let hash = await bcrypt.hash(args.password, salt);

    this.catalog.addEntry({
      name: args.name,
      path: join(this.safesPath, `${args.name}.safe`),
      password: hash
    });

    new Database({
      path: join(
        this.safesPath,
        args.name.endsWith(".safe") ? args.name : `${args.name}.safe`
      ),
      fields: ["name", "password", "iv"]
    });

    return true;
  }

  private async openSafe(_, args: { name: string; password: string }) {
    let entries = await this.catalog.getEntries();
    let safe = entries.find(e => e.name === args.name.replace(/.safe/g, ""));

    if (!safe) return;

    return await bcrypt.compare(args.password, safe.password);
  }

  private async getSafes() {
    if (!existsSync(this.safesPath)) {
      return [];
    }

    let safes = readdirSync(this.safesPath).filter(s => s.endsWith(".safe"));

    return safes.map(name => {
      let path = join(this.safesPath, name);
      let date = statSync(path).birthtime;
      return {
        name,
        created: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
        path
      };
    });
  }

  private async deleteSafe(_, args: { name: string }) {
    if (!existsSync(this.safesPath)) {
      return;
    }

    let safePath = join(this.safesPath, args.name);

    if (!existsSync(safePath)) {
      return;
    }

    unlinkSync(safePath);
  }

  private generatePassword(
    _,
    args: {
      length: number;
      numbers: boolean;
      symbols: boolean;
      lowercase: boolean;
      uppercase: boolean;
      exclude: string;
    }
  ) {
    return generate({
      length: args.length,
      numbers: args.numbers,
      symbols: args.symbols,
      lowercase: args.lowercase,
      uppercase: args.uppercase,
      exclude: args.exclude
    });
  }

  private async getEntries(_, args: { path: string }) {
    let safe = new Database({
      path: args.path,
      fields: ["name", "password", "iv"]
    });
    let entries = await safe.getEntries();
    return Promise.all(
      entries.map(async e => {
        return {
          name: e.name,
          password: await decrypt({ iv: e.iv, password: e.password })
        };
      })
    );
  }

  private async createEntry(_, args: { path: string; name: string; password: string }) {
    let safe = new Database({
      path: args.path,
      fields: ["name", "password", "iv"]
    });
    let data = (await encrypt(args.password)) || { iv: "", password: "" };

    safe.addEntry({ name: args.name, password: data.password, iv: data.iv });
  }
}

export { Backend };
