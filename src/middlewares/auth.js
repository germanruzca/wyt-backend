const jwt = require('jsonwebtoken');
const { service } = require('../../config/index');
const { actionSecret } = service;

exports.checkAuth = function(req, res, next) {
  const header = req.header('Authorization');
  if(!header) {
    throw new Error('Acceso denegado');
  } else {
    const [bearer, token] = header.split(' ');

    if(bearer == 'Bearer' && token!=undefined) {
      try {
        const payload = jwt.verify(token, actionSecret);
        console.log(actionSecret)
        req.user = payload.user;
        next()
      } catch (e) {
        if(error.name == 'TokenExpiredError'){
          throw new Error('Token expirado. Inicie sesión nuevamente');
        } else if(error.name == 'JsonWebTokenError'){
          throw new Error('Token inválido');
        }
      }

    }else {
      throw new Error('Token incorrecto');
    }
  }
}