import Joi from "joi";

const createContactValidation = Joi.object({
  first_name: Joi.string().required().max(100),
  last_name: Joi.string().optional().max(100),
  email: Joi.string().optional().max(200).email(),
  phone: Joi.string().optional().max(20),
});

const getContactValidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  first_name: Joi.string().required().max(100),
  last_name: Joi.string().optional().max(100),
  email: Joi.string().optional().max(200).email(),
  phone: Joi.string().optional().max(20),
});

const searchContactValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).max(100).positive().default(10),
});

export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
};
