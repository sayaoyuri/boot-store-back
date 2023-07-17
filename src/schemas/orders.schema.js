import Joi from "joi";

export const order_schema = Joi.object({
  name: Joi.string().min(4).max(40).required(),
  category: Joi.string().required(),
  price: Joi.number().min(0).required(),
  platform: Joi.string().required(),
  image: Joi.string().required()
});
