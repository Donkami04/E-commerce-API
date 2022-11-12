const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); //probar el validate
    if (error) {
      // next(boom.badRequest());
      throw error;
    }
    next();
  }
}

module.exports = validatorHandler;
