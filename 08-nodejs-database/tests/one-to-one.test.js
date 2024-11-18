import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  // it("should be able to create one to one relation", async () => {
  //   const newWallet = await prismaClient.wallet.create({
  //     data: {
  //       id: "wallet1",
  //       balance: 1000000,
  //       customer_id: "h1",
  //     },
  //     include: {
  //       customer: true,
  //     },
  //   });
  //   console.log(newWallet);
  // });

  // it("should be able to create a customer with its relation (a wallet)", async () => {
  //   const customerAndItsWallet = await prismaClient.customer.create({
  //     data: {
  //       id: "h5",
  //       name: "Hello 5",
  //       email: "hello5@example.com",
  //       phone: "999999999999",
  //       wallet: {
  //         create: {
  //           id: "wallet2",
  //           balance: 500000,
  //         },
  //       },
  //     },
  //     include: {
  //       wallet: true,
  //     },
  //   });
  //   console.log(customerAndItsWallet);
  // });

  // it("should be able to find one to one relation", async () => {
  //   const customerWithItsWallet = await prismaClient.customer.findUnique({
  //     where: {
  //       id: "h1",
  //     },
  //     include: {
  //       wallet: true,
  //     },
  //   });

  //   console.log(customerWithItsWallet);
  // });

  it("should be able to find one to one relation with filter", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        wallet: {
          isNot: null,
        },
      },
      include: {
        wallet: true,
      },
    });

    console.log(customers);
  });
});
