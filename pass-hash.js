const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'password 123 .202';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

hashPassword();
