import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  // it("should be able to create customer", async () => {
  //   const customer = await prismaClient.customer.create({
  //     data: {
  //       id: "hw",
  //       name: "Hello World",
  //       email: "helloworld@example.com",
  //       phone: "080808080808",
  //     },
  //   });

  //   console.log("LOG:", customer);

  //   expect(customer.id).toBe("hw");
  //   expect(customer.name).toBe("Hello World");
  //   expect(customer.email).toBe("helloworld@example.com");
  //   expect(customer.phone).toBe("080808080808");
  // });

  // it("should be able to cupdate customer", async () => {
  //   const customer = await prismaClient.customer.update({
  //     data: {
  //       name: "Hello World 1",
  //     },
  //     where: {
  //       id: "hw",
  //     },
  //   });

  //   console.log("LOG:", customer);

  //   expect(customer.id).toBe("hw");
  //   expect(customer.name).toBe("Hello World 1");
  //   expect(customer.email).toBe("helloworld@example.com");
  //   expect(customer.phone).toBe("080808080808");
  // });

  // it("should be able to read customer", async () => {
  //   const customer = await prismaClient.customer.findUnique({
  //     where: {
  //       id: "hw",
  //     },
  //   });

  //   expect(customer.id).toBe("hw");
  //   expect(customer.name).toBe("Hello World 1");
  //   expect(customer.email).toBe("helloworld@example.com");
  //   expect(customer.phone).toBe("080808080808");
  // });

  it("should be able to delete customer", async () => {
    const customer = await prismaClient.customer.delete({
      where: {
        id: "hw",
      },
    });

    expect(customer.id).toBe("hw");
    expect(customer.name).toBe("Hello World 1");
    expect(customer.email).toBe("helloworld@example.com");
    expect(customer.phone).toBe("080808080808");
  });
});
