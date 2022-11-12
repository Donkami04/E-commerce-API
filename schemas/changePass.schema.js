const Joi = require('joi');

const token = Joi.string();
const newPassword = Joi.string().min(8);
const confirm = Joi.string().min(8);


const updatePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
  confirm: confirm.required(),
});


module.exports = { updatePasswordSchema }
