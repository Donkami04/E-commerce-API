const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async createUser(data) {
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await models.User.create({
        ...data,
        password: hash,
      });
      if(newUser.role === 'admin'){
        boom.unauthorized();
      }
    delete newUser.dataValues.password; //Esto evita retornar al usuario el password
    return newUser;
  }

  async createAdmin(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newAdmin = await models.User.create({
      ...data,
      password: hash,
    });
  delete newAdmin.dataValues.password; //
  return newAdmin;
}

  async find() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] } });
    return users;

  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
