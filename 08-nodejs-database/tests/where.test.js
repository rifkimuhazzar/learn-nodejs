import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to use or operator", async () => {
    const products = await prismaClient.product.findMany({
      where: {
        OR: [{ name: "A" }, { name: "B" }],
      },
      orderBy: {
        name: "desc",
      },
    });

    console.log(products);
    expect(products.length).toEqual(2);
    expect(products[0].name).toBe("B");
    expect(products[1].name).toBe("A");
  });
});
