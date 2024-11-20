import Joi from "joi";

describe("Joi", () => {
  it("should be able to create custom validation", () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("hello")) return helpers.error("password.wrong");
          return value;
        })
        .messages({
          "password.wrong": "Password can't start with 'hello'",
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword)
          return helpers.error("register.password.different");
        return value;
      })
      .messages({
        "register.password.different":
          "Password and Confirm Password is different",
      });

    const request = {
      username: "helloworld@example.com",
      password: "world123",
      confirmPassword: "world123",
    };
    const result = registerSchema.validate(request, { abortEarly: false });
    console.log(result);
    // console.log(result.error);
    // console.log(result.error.details);
  });
});
