const db = require('../models');

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log('happens');
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);
    if (valid) {
      res.json({
        id,
        username,
      });
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    next(error);
  }
};
