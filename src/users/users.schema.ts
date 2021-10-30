import Joi from 'joi';

export const userSchema = Joi.object().keys({
  login: Joi.string()
    .required(),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*[A-Za-z])(?=.*[0-9]).{2,}$/)
    .required(),
  age: Joi.number()
    .integer()
    .max(4)
    .max(130)
    .required(),
});
