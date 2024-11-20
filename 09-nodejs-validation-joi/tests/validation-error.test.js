import Joi from "joi";

it("should be able to return validation error", () => {
  const usernameSchema = Joi.string().min(5).email().required();

  const usernameInput = usernameSchema.validate("Hi", { abortEarly: false });
  console.log(usernameInput);

  if (usernameInput.error) {
    console.log(usernameInput.error);
    console.log(usernameInput.error.details);

    usernameInput.error.details.forEach((detail) => {
      console.log(`${detail.path} = ${detail.message}`);
    });
  }
});
