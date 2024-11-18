import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  // it("should be able to one to many insert and include", async () => {
  //   const comment = await prismaClient.comments.create({
  //     data: {
  //       customer_id: "h1",
  //       title: "Insert Comment 1",
  //       description: "Insert comment 1 example",
  //     },
  //     include: {
  //       customer: true,
  //     },
  //   });
  //   console.log(comment);
  // });
  // it("should be able to insert with many relation", async () => {
  //   const customer = await prismaClient.customer.create({
  //     data: {
  //       id: "w5",
  //       name: "World 5",
  //       email: "world5@example.com",
  //       phone: "101010101010",
  //       comments: {
  //         createMany: {
  //           data: [
  //             {
  //               title: "W5 Comment 1",
  //               description: "W5 Description 1",
  //             },
  //             {
  //               title: "W5 Comment 2",
  //               description: "W5 Description 2",
  //             },
  //           ],
  //         },
  //       },
  //     },
  //     include: {
  //       comments: true,
  //     },
  //   });
  //   console.log(customer);
  // });

  it("should be able to find many with relation", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        comments: {
          some: {
            title: {
              contains: "Comment",
            },
          },
        },
      },
      include: {
        comments: true,
      },
    });

    console.log(customers);
  });
});
