const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const UsersService = require('./users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require("nodemailer");

const service = new UsersService(models.User);

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    // Si no existe el usuario
    if (!user) {
      throw boom.unauthorized('Usuario no encontrado');
    }

    // Si la contraseña no es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Contraseña incorrecta');
    }
    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token,
    };
  }

  async sendRecoveryPassword(email) {
    const user = await service.findByEmail(email);
    // Si no existe el usuario
    if (!user) {
      throw boom.unauthorized('Usuario no encontrado');
    }
    const payload = {
      sub: user.id
    };

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});

    const link = `http://myfrontend/recovery/?token=${token}`;
    await service.update(user.id, {recovery_token: token});

    const mail =
    {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465, // true si es 465, de lo contrario false
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Email enviado' };
  }
}

module.exports = AuthService;
