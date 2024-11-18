function tagFunction(array, ...args) {
  console.log(array);
  console.log(args);
}

test("tag function", () => {
  const name1 = "Prisma 1";
  const name2 = "Prisma 2";

  tagFunction`Hello ${name1} ${name2}!, how are you?`;
  tagFunction`Bye ${name1} ${name2}!, see you tomorrow`;
});

test("tag function sql", () => {
  const name = "Prisma'; drop table users";
  const age = 25;

  tagFunction`select * from users where name = ${name} and age = ${age}`;
});
