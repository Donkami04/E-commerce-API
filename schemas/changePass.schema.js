const Joi = require('joi');
const boom = require('boom');

const token = Joi.string();
const newPassword = Joi.string().min(8);
const confirm = Joi.string().min(8);


const updatePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
  confirm: confirm.required(),
});

if(newPassword !== confirm) {
  throw boom.badRequest();
}


module.exports = { updatePasswordSchema }
