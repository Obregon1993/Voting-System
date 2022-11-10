require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const users = [
  { username: 'kevin', password: 'password' },
  { username: 'raul', password: 'password' },
];

//const votes
const candidates = [
  {
    parties: 'Democratic Party',
    options: ['Juan', 'Pepe'],
  },
  {
    parties: 'Republican Party',
    options: ['John', 'Antonio'],
  },
  {
    parties: 'Libertarian Party',
    options: ['George', 'Liam'],
  },
  {
    parties: 'Socialist Party',
    options: ['Carlos', 'Jose'],
  },
  {
    parties: 'Natural Party',
    options: ['Mike', 'Donald'],
  },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log('DROP ALL USERS');

    await db.Candidates.remove();
    console.log('DROP ALL CANDIDATES');

    await Promise.all(
      users.map(async (user) => {
        const data = await db.User.create(user);
        await data.save();
      })
    );
    console.log('CREATED USERS', JSON.stringify(users));

    await Promise.all(
      candidates.map(async (candidate) => {
        candidate.options = candidate.options.map((option) => ({
          option,
          votes: 0,
        }));
        const data = await db.Candidates.create(candidate);
        const user = await db.User.findOne({ username: 'username' });
        data.user = user;
        user.candidates.push(data._id);
        await user.save();
        await data.save();
      })
    );
    console.log('CREATED CANDIDATES', JSON.stringify(candidates));
  } catch (err) {
    console.error(err);
  }
};

seed();
