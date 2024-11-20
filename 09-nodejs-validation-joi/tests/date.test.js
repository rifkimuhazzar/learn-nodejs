import Joi from "joi";

it("should be able to validate date", () => {
  const birthDateSchema = Joi.date().required().min("1-1-1988").max("now");

  const input1 = birthDateSchema.validate("12-22-1987");
  console.log(input1);
  console.log(typeof input1.value);
  console.log(typeof input1.error);

  const input2 = birthDateSchema.validate("11-20-2000");
  console.log(input2);

  const input3 = birthDateSchema.validate("11-20-2025");
  console.log(input3);
});
