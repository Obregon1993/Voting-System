const db = require('../models');

exports.showCandidates = async (req, res, next) => {
  try {
    const candidate = await db.Candidates.find().populate('user', [
      'username',
      'id',
    ]);

    res.status(200).json(candidate);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.usersCandidates = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await db.User.findById(id).populate('candidates');
    console.log('happens', user, id);
    res.status(200).json(user.candidates);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.createCandidates = async (req, res, next) => {
  try {
    console.log(req.decoded);
    const { id } = req.decoded;
    const user = await db.User.findById(id);
    const { parties, options } = req.body;

    const candidate = await db.Candidates.create({
      parties,
      user,
      options: options.map((option) => ({ option, votes: 0 })),
    });

    user.candidates.push(candidate._id);
    await user.save();

    res.status(201).json({ ...candidate._doc, user: user._id });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.getCandidates = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidates = await db.Candidates.findById(id).populate('user', [
      'username',
      'id',
    ]);

    if (!candidates) throw new Error('No party Found');
    res.status(200).json(candidates);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.deleteCandidates = async (req, res, next) => {
  try {
    const { id: candidatesId } = req.params;
    const { id: userId } = req.decoded;

    const candidates = await db.Candidates.findById(candidatesId);
    if (!candidates) throw new Error('No party Found');
    if (candidates.user.toString() !== userId) {
      throw new Error('Unauthorized Access');
    }
    await candidates.remove();
    res.status(200).json(candidates);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.vote = async (req, res, next) => {
  try {
    const { id: candidatesId } = req.params;
    const { id: userId } = req.decoded;
    const { answer } = req.body;

    if (answer) {
      const candidates = await db.Candidates.findById(candidatesId);
      if (!candidates) throw new Error('No party found');

      const vote = candidates.options.map((option) => {
        if (option.option === answer) {
          return {
            option: option.option,
            _id: option._id,
            votes: option.votes + 1,
          };
        } else {
          return option;
        }
      });

      if (
        candidates.voted.filter((user) => user.toString() === userId).length <=
        0
      ) {
        candidates.voted.push(userId);
        candidates.options = vote;
        await candidates.save();
        res.status(202).json(candidates);
      } else {
        throw new Error('Already Voted');
      }
    } else {
      throw new Error('No Answer provided');
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
