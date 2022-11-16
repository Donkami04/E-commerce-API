const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include:['user']
    });
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const customerU = await this.findOne(id);
    const rta = await customerU.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { message: 'The customer was deleted' };
  }

}

module.exports = CustomerService;
