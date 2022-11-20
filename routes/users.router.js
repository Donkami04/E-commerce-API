const express = require('express');
const passport = require('passport');
const {checkRoles} = require('./../middlewares/auth.handler');
const boom = require('@hapi/boom');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

//Get users
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
});

//Get One User
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  checkRoles('customer', 'admin'),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      if(+req.user.sub === +id || req.user.role === 'admin'){
        const user = await service.findOne(id);
        res.json(user);
      } else {
        throw boom.unauthorized()
      }
    } catch (error) {
      next(error);
    }
  }
);

//Create user
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.createUser(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/new-admin',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAdmin = await service.createAdmin(body);
      res.status(201).json(newAdmin);
    } catch (error) {
      next(error);
    }
  }
);

//Edit one user
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      if(+req.user.sub === +id && body.role !== 'admin') {
        const user = await service.update(id, body);
        res.json(user);
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
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if(+req.user.sub === +id || req.user.role === 'admin') {
      await service.delete(id);
      res.status(201).json({id});
      } else {
        throw boom.unauthorized();
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

