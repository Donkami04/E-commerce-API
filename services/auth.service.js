const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {config} = require('./../config/config');
const jwt = require('jsonwebtoken');
const UserService = require('./user.service');
const service = new UserService;

class AuthService {

  async getUser(email,password){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();;
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    }
  }
// comprobar si el token de signToken es el mismo que de recovery
  async sendRecovery (email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15 min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Recuperacion de password',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail (infoMail){
      const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      },
    });
    await transporter.sendMail(infoMail)
    return { message: 'mail sent'}
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'Password changed' };
      } catch(error) {
        throw boom.unauthorized();
      }



    // delete user.dataValues.password;
  }
}

module.exports = AuthService;
