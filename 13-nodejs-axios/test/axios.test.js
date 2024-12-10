import axios from "axios";
import fs from "node:fs";

describe("HTTP Client", () => {
  it("should be supported axios", async () => {
    const httpClient = axios.create({
      timeout: 5000,
      baseURL: "https://eogswxetv897xj2.m.pipedream.net",
    });
    expect(httpClient).toBeDefined();
  });
});

describe("HTTP Method", () => {
  const httpClient = axios.create({
    timeout: 5000,
    baseURL: "https://eo6cctu0n7vztf6.m.pipedream.net",
  });

  httpClient.interceptors.request.use(
    async (config) => {
      console.log(`Send request to ${config.baseURL + config.url}`);
      return config;
    },
    async (error) => {
      console.error(`Reuest error: ${error.message}`);
      return Promise.reject(error);
    },
    {
      synchronous: false,
    }
  );

  httpClient.interceptors.response.use(
    async (response) => {
      const fullUrl = response.config.baseURL + response.config.url;
      const body = JSON.stringify(response.data);
      console.log(`Receive response from ${fullUrl} with body ${body}`);
      return response;
    },
    async (error) => {
      console.log(`Response Error: ${error.message}`);
      return Promise.reject(error);
    },
    {
      synchronous: false,
    }
  );

  it("should support GET method", async () => {
    const response = await httpClient.get("/");
    expect(response.status).toBe(200);
  });

  it("should support GET method with config", async () => {
    const response = await httpClient.get("/", {
      params: {
        name: "Express",
      },
      headers: {
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  });

  it("should support POST with JSON request body", async () => {
    const json = {
      username: "helloworld",
      password: "password123",
    };
    const response = await httpClient.post("/", json, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  });

  it("should support POST with TEXT request body", async () => {
    const text = "Hello World";
    const response = await httpClient.post("/", text, {
      headers: {
        "Content-Type": "plain/text",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  });

  it("should support POST with FORM request body", async () => {
    const form = {
      "first-name": "Hello",
      "last-name": "World",
    };
    const response = await httpClient.post("/", form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  });

  it("should support POST with MULTIPART request body", async () => {
    const data = fs.readFileSync("image.png");
    const form = new FormData();
    form.append("first-name", "Express");
    form.append("last-name", "Nest");
    form.append("file", new Blob(data), "screenshot.png");
    const response = await httpClient.post("/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  });
});

describe("Error Handler", () => {
  const httpClient = axios.create({
    baseURL: "https://programmerzamannow.com",
    timeout: 5000,
    validateStatus: (s) => s < 500,
  });

  it.only("should error and status to be 404", async () => {
    // Secara default (tanpa validateStatus) maka selain status 2xx akan dianggap error
    /* 
    try {
      await httpClient.get("/not-found");
    } catch (error) {
      console.error(error);
      expect(error.response.status).toBe(404);
    } 
    */
    const response = await httpClient.get("/not-found");
    expect(response.status).toBe(404);
  });
});
