import { describe, test, expect } from "vitest";
import { generateRandomEnties } from "./utils";
import { CSV_DELIMITER, bufferFromCSV, parseCSV } from "../app/src/main/lib";
import { faker } from "@faker-js/faker";

/**
 * This test file assures that the CSV parsing and reading
 * process works as expected.
 *
 * The bufferFromCSV and parseCSV functions are defined in
 * src/main/lib/utils.ts.
 *
 * The bufferFromCSV function takes an array of entries and
 * returns a buffer that contains the CSV data.
 *
 * IGNORE TypeError: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined
 * Because the file where the functions are from uses a worker, which is not available in the test environment.
 */

describe("csv parsing and reading for buffers", () => {
  let entries = generateRandomEnties(1000);

  test("get buffer from CSV entries", () => {
    let buffer = bufferFromCSV(entries);

    expect(buffer.toString("utf-8").split("\n")).toEqual([
      "name,password,email,icon",
      ...entries.map(entry =>
        Object.values(entry)
          .map(v => (v ? ((v as string).includes(CSV_DELIMITER) ? `"${v}"` : v) : "null"))
          .join(CSV_DELIMITER)
      )
    ]);
  });

  test("parse CSV buffer", () => {
    let buffer = bufferFromCSV(entries);
    let parsed = parseCSV(buffer);

    expect(parsed).toEqual(entries);
  });

  test("correctly parse CSV buffer with commas", () => {
    let entries = [
      {
        name: "John, Doe",
        password: "password",
        email: faker.internet.email(),
        icon: faker.internet.avatar()
      },
      {
        name: "Jane, Doe",
        password: "password",
        email: faker.internet.email(),
        icon: faker.internet.avatar()
      }
    ];

    let buffer = bufferFromCSV(entries);
    let parsed = parseCSV(buffer);

    expect(parsed).toEqual(entries);
  });
});
