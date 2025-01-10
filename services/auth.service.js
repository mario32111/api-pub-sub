const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const UsersService = require('./users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
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

  async sendMail(email) {
    const user = await service.findByEmail(email);
    // Si no existe el usuario
    if (!user) {
      throw boom.unauthorized('Usuario no encontrado');
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports, 587 in false
      auth: {
        user: 'marioge44@gmail.com',
        pass: 'gzcn qqeo hngt dvtj',
      },
    });

    await transporter.sendMail({
      from: 'marioge44@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recuperación de contraseñaxd", // Subject line
      text: "alguien ahi?", // plain text body
      html: "<b>Kiuboooooooooooooooooooooooo</b>", // html body
    });

    return { message: 'Email enviado' };
  }
}

module.exports = AuthService;
