import { prismaClient } from "../src/prisma-client";

it("should be able to do paging", async () => {
  const page1 = await prismaClient.customer.findMany({
    skip: 0,
    take: 1,
  });
  console.log(page1);
  expect(page1.length).toEqual(1);

  const page2 = await prismaClient.customer.findMany({
    skip: 1,
    take: 1,
  });
  console.log(page2);
  expect(page2.length).toEqual(1);
});
