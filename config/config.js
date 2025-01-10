require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.EMAIL,
  smtpPassword: process.env.EMAIL_PASSWORD,
  smtpHost: process.env.EMAIL_HOST,
  smtpPort: parseInt(process.env.EMAIL_PORT, 10), // Convertimos el puerto a número
};

module.exports = { config };
