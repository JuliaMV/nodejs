import Joi from 'joi';

const userSchema = Joi.object().keys({
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*[A-Za-z])(?=.*[0-9]).{2,}$/)
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required(),
});

export default userSchema;
