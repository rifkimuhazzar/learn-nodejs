import { prismaClient } from "../src/prisma-client";

describe("Prsima Client", () => {
  // it("should be able to do aggregate", async () => {
  //   const result = await prismaClient.product.aggregate({
  //     _min: {
  //       price: true,
  //       stock: true,
  //     },
  //     _max: {
  //       price: true,
  //       stock: true,
  //     },
  //     _avg: {
  //       price: true,
  //       stock: true,
  //     },
  //   });
  //   console.log(result);
  // });

  // it("should be able to do aggregate with group by", async () => {
  //   const result = await prismaClient.product.groupBy({
  //     by: ["category"],
  //     _min: {
  //       price: true,
  //       stock: true,
  //     },
  //     _max: {
  //       price: true,
  //       stock: true,
  //     },
  //     _avg: {
  //       price: true,
  //       stock: true,
  //     },
  //   });

  //   console.log(result);
  //   for (const item of result) {
  //     console.log(
  //       `Category: ${item.category}, Min: ${item._min.price}, Max: ${item._max.price}, Avg: ${item._avg.price}`
  //     );
  //   }
  // });

  it("should be able to do aggregate with group by and having", async () => {
    const result = await prismaClient.product.groupBy({
      by: ["category"],
      _min: {
        price: true,
        stock: true,
      },
      _max: {
        price: true,
        stock: true,
      },
      _avg: {
        price: true,
        stock: true,
      },
      having: {
        price: {
          _avg: {
            gt: 1500,
          },
        },
      },
    });

    console.log(result);
  });
});
