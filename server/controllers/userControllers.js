const User = require('../Models/user');

const userController = {};

userController.getUser = (req, res, next) => {
  // deconstruct properties required in mongoose/mongo model from request.body
  const { username, password } = req.body;
  // instantiate a new card document via the mongoose model
  User.findOne({ username, password })
    .then((results) => {
      // console.log(results);
      res.locals.user = results;
      return next();
    })
    .catch(() => next(new Error('No User')));
};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryObj = {
    username,
    password,
  };

  User.create(queryObj)
    .then((results) => {
      console.log('Create new user => ', results);
      res.locals.user = results;
      return next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = userController;
