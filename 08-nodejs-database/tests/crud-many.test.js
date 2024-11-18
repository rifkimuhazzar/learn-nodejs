import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  /* 
    it("should be able to create many records", async () => {
      const { count } = await prismaClient.customer.createMany({
        data: [
          {
            id: "h3",
            name: "Hello 3",
            email: "hello3@example.com",
            phone: "555555555555",
          },
          {
            id: "w3",
            name: "World 3",
            email: "world3@example.com",
            phone: "666666666666",
          },
        ],
      });

      console.log(count);

      expect(count).toBe(2);
    });
  */
  /*
    it("should be able to update many records", async () => {
      const result = await prismaClient.customer.updateMany({
        data: {
          name: "World 1",
          email: "world1@example.com",
        },
        where: {
          name: "World",
        },
      });

      console.log(result);
      expect(result.count).toEqual(1);
    });
  */
  /*
    it("should be able to delete many records", async () => {
      const { count } = await prismaClient.customer.deleteMany({
        where: {
          name: "World 2",
        },
      });

      console.log(count);
      expect(count).toEqual(1);
    });
  */

  it("should be able to read many records", async () => {
    const customers = await prismaClient.customer.findMany({});
    console.log(customers);
    expect(customers.length).toEqual(2);
  });
});
