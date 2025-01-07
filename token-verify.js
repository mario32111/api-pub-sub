const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczNjI3NTE5M30.zPlr-kYqF06JvAQW-nSmuquZJXNlmWDjn06rUjcYxi4';


function verifyToken(token, secret) {
  //esto firma el token
  return jwt.verify(token, secret);
}

const isMatch = verifyToken(token, secret);
console.log(isMatch);
