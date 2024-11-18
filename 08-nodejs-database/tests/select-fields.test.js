import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  /*
    it("should be able to create and select fields", async () => {
      const newCustomer = await prismaClient.customer.create({
        data: {
          id: "w4",
          name: "World 4",
          email: "world4@example.com",
          phone: "888888888888",
        },
        select: {
          id: true,
          name: true,
        },
      });

      console.log(newCustomer);
      expect(newCustomer.id).toBe("w4");
      expect(newCustomer.name).toBe("World 4");
      expect(newCustomer.email).toBeUndefined();
      expect(newCustomer.phone).toBeUndefined();
    });
  */

  it("should be able to select fields", async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(customers);
    for (const customer of customers) {
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.email).toBeUndefined();
      expect(customer.phone).toBeUndefined();
    }
  });
});
