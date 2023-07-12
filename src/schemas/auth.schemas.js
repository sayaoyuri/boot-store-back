import joi from "joi";

export const signup_schema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});

export const signin_schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

