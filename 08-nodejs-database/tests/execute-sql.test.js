import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to execute sql", async () => {
    const id = 1;
    const name = "Hello World";

    const impacted =
      await prismaClient.$executeRaw`insert into sample (id, name) values (${id}, ${name});`;

    expect(impacted).toBe(1);
  });
});
