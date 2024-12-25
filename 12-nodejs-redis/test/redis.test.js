import Redis from "ioredis";

describe("Learn Nodejs Redis", () => {
  let redis = null;
  beforeEach(() => {
    redis = new Redis({
      host: "localhost",
      port: 6379,
      db: 0,
    });
  });

  afterEach(async () => {
    await redis.quit();
  });

  it("should be able to ping redis", async () => {
    const result = await redis.ping();
    console.log(result);
    expect(result).toBe("PONG");
  });

  it("should support string", async () => {
    await redis.setex("name", 2, "Express");
    let name = await redis.get("name");
    console.log(name);
    expect(name).toBe("Express");

    await new Promise((resolve) => void setTimeout(resolve, 3000));
    name = await redis.get("name");
    console.log(name);
    expect(name).toBeNull();
  });

  it("should support list", async () => {
    await redis.rpush("names", "React");
    await redis.rpush("names", "Next");
    await redis.rpush("names", "Express");
    await redis.rpush("names", "Fastify");

    expect(await redis.llen("names")).toBe(4);

    const names = await redis.lrange("names", 0, -1);

    expect(names).toEqual(["React", "Next", "Express", "Fastify"]);
    expect(await redis.lpop("names")).toBe("React");
    expect(await redis.lpop("names")).toBe("Next");
    expect(await redis.rpop("names")).toBe("Fastify");
    expect(await redis.llen("names")).toBe(1);

    await redis.del("names");
  });

  it("should support set", async () => {
    await redis.sadd("test", "Express");
    await redis.sadd("test", "Express");
    await redis.sadd("test", "Fastify");
    await redis.sadd("test", "Nest");
    await redis.sadd("test", "Fastify");

    expect(await redis.scard("test")).toBe(3);
    expect(await redis.smembers("test")).toEqual([
      "Express",
      "Fastify",
      "Nest",
    ]);

    await redis.del("test");
  });

  it("should support sorted set", async () => {
    await redis.zadd("names", 100, "Nest");
    await redis.zadd("names", 85, "Express");
    await redis.zadd("names", 95, "Fastify");
    await redis.zadd("names", 80, "Express");

    expect(await redis.zcard("names")).toBe(3);
    expect(await redis.zrange("names", 0, -1)).toEqual([
      "Express",
      "Fastify",
      "Nest",
    ]);
    expect(await redis.zpopmax("names")).toEqual(["Nest", "100"]);
    expect(await redis.zpopmin("names")).toEqual(["Express", "80"]);
    expect(await redis.zpopmin("names")).toEqual(["Fastify", "95"]);

    // await redis.del("names");
  });

  it("should support hash", async () => {
    await redis.hset("user:1", {
      username: "helloworld",
      name: "Hello World",
      email: "helloworld@example.com",
    });

    expect(await redis.hgetall("user:1")).toEqual({
      username: "helloworld",
      name: "Hello World",
      email: "helloworld@example.com",
    });

    await redis.del("user:1");
  });

  it("should support geo point", async () => {
    await redis.geoadd("sellers", 103.798976, 1.350453, "Toko A");
    await redis.geoadd("sellers", 103.802095, 1.355065, "Toko B");

    const distance = await redis.geodist("sellers", "Toko A", "Toko B", "km"); // default meter (M/m)
    // expect(distance).toBe("619.1831");
    expect(distance).toBe("0.6192");

    const search = await redis.geosearch(
      "sellers",
      "fromlonlat",
      103.801935,
      1.352668,
      "byradius",
      5,
      "km"
    );
    expect(search).toEqual(["Toko A", "Toko B"]);

    await redis.del("sellers");
  });

  it("should suppport hyperloglog", async () => {
    await redis.pfadd("names", "React", "Vue", "Angular");
    await redis.pfadd("names", "React", "Vue", "Express");
    await redis.pfadd("names", "Fastify", "Nest", "Vue");

    const total = await redis.pfcount("names");
    expect(total).toBe(6);

    await redis.del("names");
  });

  it("should support pipeline", async () => {
    const pipeline = await redis.pipeline();
    await pipeline.setex("name", 2, "Express");
    await pipeline.setex("address", 2, "USA");

    await pipeline.exec();

    console.log(await redis.get("name"));
    console.log(await redis.get("address"));
  });

  it("should support transaction", async () => {
    const transaction = redis.multi();
    await transaction.setex("name", 3, "Next");
    await transaction.setex("country", 3, "USA");

    await transaction.exec();

    console.log(await redis.get("name"));
    console.log(await redis.get("country"));
  });

  it("should support publish stream", async () => {
    for (let i = 0; i < 10; i++) {
      await redis.xadd(
        "members",
        "*",
        "name",
        `Express ${i + 1}`,
        "Address",
        "Singapore"
      );
    }
  });

  it("should support create consumer group and consumer", async () => {
    await redis.xgroup("create", "members", "group-1", "0");
    await redis.xgroup("createconsumer", "members", "group-1", "consumer-1");
    await redis.xgroup("createconsumer", "members", "group-1", "consumer-2");
  });

  it("should be able to consume stream", async () => {
    const result = await redis.xreadgroup(
      "group",
      "group-1",
      "consumer-1",
      "count",
      2,
      "block",
      3000,
      "streams",
      "members",
      ">"
    );
    expect(result).not.toBeNull();
    // expect(result).toBeNull();
    console.log(JSON.stringify(result, null, 2));
  });

  it("should be able to subscribe to pubsub", async () => {
    redis.subscribe("channel-1");
    redis.on("message", (channel, message) => {
      console.log(`Recieve message: ${message}, from channel: ${channel}`);
    });

    // wait 30 seconds
    await new Promise((resolve) => void setTimeout(resolve, 30000));
  }, 35000);

  it("should be able to publish to pubsub", async () => {
    for (let i = 0; i < 10; i++) {
      await redis.publish("channel-1", `Hello World ${i + 1}`);
    }
  });
});
