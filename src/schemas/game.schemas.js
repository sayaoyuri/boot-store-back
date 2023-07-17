import Joi from "joi";

export const registerGameSchema = Joi.object({
  name: Joi.string().min(4).max(50).required(),
  category: Joi.string().required(),
  description: Joi.string().min(4).max(200).required(),
  price: Joi.number().min(0).required(),
  platform: Joi.string().required(),
  image: Joi.string().required()
});