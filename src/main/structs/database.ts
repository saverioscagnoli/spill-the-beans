import sqlite3 from "sqlite3";

interface DatabaseOpts<T extends string> {
  path: string;
  fields: T[];
}

type Entry<T extends string> = { [key in T]: string };

class Database<T extends string> {
  private db: sqlite3.Database;
  private path: string;

  public constructor({ path, fields }: DatabaseOpts<T>) {
    this.path = path;
    this.db = new sqlite3.Database(path);
    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS entries (${fields
          .map(f => `${f} TEXT`)
          .join(", ")})`
      );
    });
    this.db.close();
  }

  public async getEntries(): Promise<Entry<T>[]> {
    return new Promise((res, rej) => {
      this.db = new sqlite3.Database(this.path);
      this.db.all("SELECT * FROM entries", (err, rows: Entry<T>[]) => {
        if (err) {
          this.db.close();
          rej(err);
        }
        this.db.close();
        res(rows);
      });
    });
  }

  public async addEntry(entry: Entry<T>): Promise<void> {
    let qms = Object.keys(entry)
      .map(() => "?")
      .join(", ");
    let values = Object.values(entry);
    return new Promise((res, rej) => {
      this.db = new sqlite3.Database(this.path);
      this.db.run(
        `INSERT INTO entries (${Object.keys(entry).join(
          ", "
        )}) VALUES (${qms})`,
        values,
        err => {
          if (err) {
            this.db.close();
            rej(err);
          }
          this.db.close();
          res();
        }
      );
    });
  }

  public async deleteEntry(entry: Entry<T>): Promise<void> {
    let qms = Object.keys(entry)
      .map(() => "?")
      .join(", ");
    let values = Object.values(entry);
    return new Promise((res, rej) => {
      this.db = new sqlite3.Database(this.path);
      this.db.run(
        `DELETE FROM entries WHERE (${Object.keys(entry).join(
          ", "
        )}) = (${qms})`,
        values,
        err => {
          if (err) {
            this.db.close();
            rej(err);
          }
          this.db.close();
          res();
        }
      );
    });
  }
}

export { Database };
