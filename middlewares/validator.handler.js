const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    //esto hace que sea dinamoico, y sirva para cualquier tipo de peticion, isn importar si es get, post, update o delete
    const data = req[property]
    const { error } = schema.validate(data, {abortEarly: false});
    if (error){
      next(boom.badRequest(error));
    }
    next();
  }
};

module.exports = validatorHandler;
