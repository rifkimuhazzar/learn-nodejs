import { prismaClient } from "../src/prisma-client";

it("should be able to do sorting", async () => {
  const customers = await prismaClient.customer.findMany({
    orderBy: [
      {
        name: "desc",
      },
      {
        email: "asc",
      },
    ],
  });

  console.log(customers);
});
