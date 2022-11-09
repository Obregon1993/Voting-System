const jwt = require('jsonwebtoken');
const db = require('../models');

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({ is, username }, process.env.SECRET);

    res.status(201).json({ id, username, token });
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Sorry, but username is already taken';
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      res.json({
        id,
        username,
        token,
      });
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    next(error);
  }
};
