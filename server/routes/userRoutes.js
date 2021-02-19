const express = require('express');
const userController = require('../controllers/userControllers');

const userRouter = express.Router();

// directs post requests made to the root endpoint of /card to the cardController
userRouter.post('/', userController.getUser, (req, res) => {
  res.status(200).send(res.locals.user);
});

userRouter.post('/new', userController.createUser, (req, res) => {
  res.status(200).send(res.locals.user);
});

module.exports = userRouter;