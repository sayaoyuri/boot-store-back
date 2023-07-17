import Joi from "joi";

export const order_schema = Joi.object({
  email: Joi.string().email().max(128).required(),
  name: Joi.string().min(4).max(40).required(),
  category: Joi.string().required(),
  price: Joi.number().min(0).required(),
  platform: Joi.string().required(),
  image: Joi.string().required()
});

export const email_schema = Joi.object({
  email: Joi.string().email().max(128).required(),
});
