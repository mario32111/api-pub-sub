const jwt= require('jsonwebtoken');
//para generar el secret puedes usar una pagina que la genmera con diferentes algoritmos
const secret = 'myCat';

const payload = {
  sub: 1,
  role: 'customer'
};

function signToken(payload, secret) {
  //esto firma el token
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
