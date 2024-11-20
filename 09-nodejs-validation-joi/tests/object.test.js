import Joi from "joi";

describe("Joi", () => {
  // it("should be able to validate object", () => {
  //   const loginSchema = Joi.object({
  //     username: Joi.string().min(3).max(100).email().required(),
  //     password: Joi.string().min(8).max(100).required(),
  //   });
  //   const request = {
  //     username: "h",
  //     password: "password",
  //   };
  //   const result = loginSchema.validate(request, { abortEarly: false });
  //   console.log(result);
  //   console.log(result.error.details);
  // });

  it("should be able to validate nested object", () => {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }).required(),
    });

    const request = {
      address: {},
    };

    const result = createUserSchema.validate(request, { abortEarly: false });

    // console.log(result);
    // console.log(result.error);
    // console.log(result.error.details);

    if (result.error) {
      result.error.details.forEach((value) => {
        console.log(`${value.path} = ${value.message}`);
      });
    }
  });
});
