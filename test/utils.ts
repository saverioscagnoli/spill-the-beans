import { Entry } from "../app/src/main/structs";
import { faker } from "@faker-js/faker";
import { rng } from "../app/src/main/lib";

function flip(n: number = 50): boolean {
  return rng({ min: 0, max: 100 }) <= n;
}

function generateRandomEnties(n: number = 1000): Entry[] {
  return Array.from({ length: n }, () => ({
    name: faker.person.firstName(),
    password: faker.internet.password(),
    email: flip(rng({ min: 0, max: 100 })) ? faker.internet.email() : null,
    icon: flip(rng({ min: 0, max: 100 })) ? faker.image.avatar() : null
  })) as Entry[];
}

export { flip, generateRandomEnties };
