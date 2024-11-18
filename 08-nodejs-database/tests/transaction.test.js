import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  // it("should be able to execute sequential transaction", async () => {
  //   const [hello, world] = await prismaClient.$transaction(
  //     [
  //       prismaClient.customer.create({
  //         data: {
  //           id: "h1",
  //           name: "Hello",
  //           email: "hello@example.com",
  //           phone: "111111111111",
  //         },
  //       }),
  //       prismaClient.customer.create({
  //         data: {
  //           id: "w1",
  //           name: "World",
  //           email: "world@example.com",
  //           phone: "222222222222",
  //         },
  //       }),
  //     ],
  //     {
  //       timeout: 5,
  //     }
  //   );

  //   expect(hello.name).toBe("Hello");
  //   expect(world.name).toBe("World");
  // });

  it("should be able to execute interactive transaction", async () => {
    const [hello, world] = await prismaClient.$transaction(
      async (prisma) => {
        const hello = await prisma.customer.create({
          data: {
            id: "h2",
            name: "Hello 2",
            email: "hello2@example.com",
            phone: "333333333333",
          },
        });
        const world = await prisma.customer.create({
          data: {
            id: "w2",
            name: "World 2",
            email: "world2@example.com",
            phone: "444444444444",
          },
        });

        return [hello, world];
      },
      { timeout: 5 }
    );

    expect(hello.name).toBe("Hello 2");
    expect(world.name).toBe("World 2");
  });
});
