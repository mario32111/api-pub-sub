const bcrypt = require('bcrypt');

async function verifyPassword() {
  const password = 'password 123 .202';
  const hash = '$2b$10$A7mok6hpuWFRTEZLHaxEs.tLOURazD0wT5c2YayTkrHv3ajZf5Zoe';
  const isMatch = await bcrypt.compare(password, hash);
  console.log(isMatch);
}

verifyPassword();
