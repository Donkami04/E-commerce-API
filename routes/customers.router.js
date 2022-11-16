const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');

const validationHandler = require('../middlewares/validator.handler');
const {checkRoles} = require('./../middlewares/auth.handler');

const CustomerService = require('../services/customers.service');
const service = new CustomerService();

const {createCustomerSchema, getCustomerSchema, updateCustomerSchema} = require('../schemas/customer.schema');

const router = express.Router();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validationHandler(getCustomerSchema, 'params'),
  checkRoles('customer', 'admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if(+req.user.sub === +id || req.user.role === 'admin'){
        const customer = await service.findOne(id);
        res.json(customer);
    } else {
        throw boom.unauthorized()
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      if(+req.user.sub === +id) {
        res.status(201).json(await service.update(id, body));
      } else {
        throw boom.unauthorized();
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if(+req.user.sub === +id) {
        res.status(200).json(await service.delete(id));
      } else {
        throw boom.unauthorized();
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
