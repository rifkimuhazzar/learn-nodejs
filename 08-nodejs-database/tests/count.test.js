import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to count", async () => {
    const total = await prismaClient.customer.count({
      where: {
        name: "World 1",
      },
    });

    console.log(total);
    expect(total).toEqual(1);
  });
});
