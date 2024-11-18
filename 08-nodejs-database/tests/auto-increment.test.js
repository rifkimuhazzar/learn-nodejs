import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to do auto increment", async () => {
    const newCategory = await prismaClient.category.create({
      data: {
        name: "Hello 2",
      },
    });

    console.log(newCategory);
    expect(newCategory).toHaveProperty("id");
  });
});
