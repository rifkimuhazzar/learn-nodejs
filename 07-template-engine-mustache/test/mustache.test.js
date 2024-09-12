import Mustache from "mustache";
import fs from "fs/promises";

test("Menggunakan Mustache", () => {
  const data = Mustache.render("Hello {{name}}", { name: "World" });
  expect(data).toBe("Hello World");
});

test("Menggunakan Mustache Cache", () => {
  Mustache.parse("Hello {{name}}");
  const data = Mustache.render("Hello {{name}}", { name: "World" });
  expect(data).toBe("Hello World");
});

test("Tags", () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}!", {
    name: "World",
    hobby: "<b>Programming</b>",
  });
  expect(data).toBe("Hello World, my hobby is <b>Programming</b>!");
});

test("Tags Nested Object", () => {
  const data = Mustache.render("Hello {{person.name}}", {
    person: { name: "World" },
  });
  expect(data).toBe("Hello World");
});

test("Mustache File", async () => {
  const helloTemplate = await fs
    .readFile("./templates/hello.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { title: "Hello World" });
  expect(data).toContain("Hello World");
});

test("Mustache Sections Not Show", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});
  expect(data).not.toContain("Hello Person");
});

test("Mustache Sections Show", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { person: { name: "Mustache" } });
  expect(data).toContain("Hello Person");
});

test("Mustache Sections Data", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: { name: { firstName: "Mustache" } },
  });
  expect(data).toContain("Hello Person Mustache!");
});

test("Mustache Inverted Sections", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});
  expect(data).toContain("Hello Guest");
});

test("Mustache Sections List", async () => {
  const helloTemplate = await fs
    .readFile("./templates/hobbies.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    hobbies: ["Programming", "Workout", "Watching Series and Anime"],
  });
  expect(data).toContain("Programming");
  expect(data).toContain("Workout");
  expect(data).toContain("Watching Series and Anime");
});

test("Mustache Sections List of Object", async () => {
  const helloTemplate = await fs
    .readFile("./templates/student.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    students: [
      { name: "Express 1", value: 90 },
      { name: "Express 2", value: 96 },
      { name: "Express 3", value: 82 },
    ],
  });
  expect(data).toContain("Express 1");
  expect(data).toContain("90");
});

test("Mustache Functions", async () => {
  const parameter = {
    name: "World",
    upper: () => (text, render) => render(text).toUpperCase(),
  };

  const data = Mustache.render(
    "Hello {{#upper}}{{name}} & Express{{/upper}}",
    parameter
  );
  expect(data).toBe("Hello WORLD & EXPRESS");
});

test("Mustache Comment", async () => {
  const helloTemplate = await fs
    .readFile("./templates/comment.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { title: "Hello World" });
  expect(data).toContain("Hello World");
  expect(data).not.toContain("This is a comment");
});

test("Mustache  Partials", async () => {
  const contentTemplate = await fs
    .readFile("./templates/content.mustache")
    .then((data) => data.toString());
  const headerTemplate = await fs
    .readFile("./templates/header.mustache")
    .then((data) => data.toString());
  const footerTemplate = await fs
    .readFile("./templates/footer.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(
    contentTemplate,
    {
      title: "Hello World",
      content: "This is content",
    },
    {
      header: headerTemplate,
      footer: footerTemplate,
    }
  );

  expect(data).toContain("Hello World");
  expect(data).toContain("This is content");
  expect(data).toContain("This is footer");
});
