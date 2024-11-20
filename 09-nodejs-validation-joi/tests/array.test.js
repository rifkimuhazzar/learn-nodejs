import Joi from "joi";

describe("Joi", () => {
  // it("should be able to validate array", () => {
  //   const hobbiesSchema = Joi.array()
  //     .items(Joi.string().required().min(3).max(100))
  //     .min(1)
  //     .unique();

  //   const hobbies = ["Workout", "Coding", "Watching Series/Movies/Anime"];
  //   const result = hobbiesSchema.validate(hobbies, { abortEarly: false });
  //   console.log(result);
  // });

  it("should be able to validate array of object", () => {
    const addressesSchema = Joi.array()
      .min(1)
      .items(
        Joi.object({
          street: Joi.string().required().max(200),
          city: Joi.string().required().max(100),
          country: Joi.string().required().max(100),
          zipCode: Joi.string().required().max(10),
        })
      );

    const adress = [
      {
        street: "Jalan Hello World",
        city: "Singapore",
        country: "Singapore",
        zipCode: "01010101",
      },
    ];
    const result = addressesSchema.validate(adress, { abortEarly: false });
    console.log(result);
  });
});
