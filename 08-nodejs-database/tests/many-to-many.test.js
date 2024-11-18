import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  // it("should be able to insert with many to many relation", async () => {
  //   const like = await prismaClient.like.create({
  //     data: {
  //       customer_id: "w1",
  //       product_id: "P0001",
  //     },
  //     include: {
  //       customer: true,
  //       product: true,
  //     },
  //   });
  //   console.log(like);
  // });
  // it("should be able to find one with many to many relation", async () => {
  //   const customer = await prismaClient.customer.findUnique({
  //     where: {
  //       id: "h1",
  //     },
  //     include: {
  //       likes: {
  //         include: {
  //           product: true,
  //         },
  //       },
  //     },
  //   });
  //   console.log(customer);
  // });
  // it("should be able to find many with many to many relation", async () => {
  //   const customers = await prismaClient.customer.findMany({
  //     where: {
  //       likes: {
  //         some: {
  //           product: {
  //             name: {
  //               contains: "A",
  //             },
  //           },
  //         },
  //       },
  //     },
  //     include: {
  //       likes: {
  //         include: {
  //           product: true,
  //         },
  //       },
  //     },
  //   });
  //   console.log(customers);
  // });
  // it("should be able to create implicit many to many relation", async () => {
  //   const customer = await prismaClient.customer.update({
  //     where: {
  //       id: "h1",
  //     },
  //     data: {
  //       loves: {
  //         connect: [{ id: "P0001" }, { id: "P0002" }],
  //       },
  //     },
  //     include: {
  //       loves: true,
  //     },
  //   });
  //   console.log(customer);
  // });

  it("should be able to find implicit many to many relation", async () => {
    const customer = await prismaClient.customer.findMany({
      where: {
        loves: {
          some: {
            name: {
              contains: "A",
            },
          },
        },
      },
      include: {
        loves: true,
      },
    });

    console.log(customer);
    console.log(customer[0]);
  });
});
