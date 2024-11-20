import Joi from "joi";

describe("Joi", () => {
  it("should be able to create schema", () => {
    const schema = Joi.string().min(3).max(100).required();
    const result = schema.validate("Hello");

    if (result.error) {
      console.log(result.error);
    }
    console.log(result);
  });

  it("should be able to validate basic data type", () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().max(1000000).min(1000);

    const usernameInput = usernameSchema.validate("hello@example.com");
    console.info(usernameInput);

    const isAdminInput = isAdminSchema.validate("true");
    console.info(isAdminInput);
    console.info(typeof isAdminInput.value);
    console.info(typeof isAdminInput.error);

    const priceInput = priceSchema.validate("100000");
    console.info(priceInput);
  });
});
