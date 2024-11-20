import Joi from "joi";

describe("Joi", () => {
  // it("should be able to use cutom message", () => {
  //   const schema = Joi.string().min(3).max(10).required().messages({
  //     "string.min": "{{#label}} panjang harus minimal {{#limit}} karakter",
  //     "string.max": "{{#label}} panjang harus maksimal {{#limit}} karakter",
  //   });
  //   const request = "aaaaaaaaaaaaaaa";
  //   const result = schema.validate(request, { abortEarly: false });
  //   console.log(result);
  //   console.log(result.error);
  //   console.log(result.error.details);
  // });

  it("should be able to use custom message in object validation", () => {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        "any.required": "{{#label}} harus diisi",
        "string.email": "{{#label}} harus email yang valid",
      }),
      password: Joi.string().required().min(6).max(10).messages({
        "any.required": "{{#label}} harus diisi",
        "string.min": "{{#label}} minimal {{#limit}} karakter",
        "string.max": "{{#label}} maksimal {{#limit}} karakter",
      }),
    });

    const request = {
      username: "helloworld@example.com",
      password: "helloworld",
    };
    const result = schema.validate(request, { abortEarly: false });
    console.log(result);
    console.log(result.error);
  });
});
