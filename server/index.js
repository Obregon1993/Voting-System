require('dotenv').config();

//importing npm package
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//database connection
const db = require('./models');

//importing handlers
const handlers = require('./handlers');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/login', (req, res) => {});

app.use(handlers.notFound);
app.use(handlers.errors);

app.listen(port, console.log(`server listening on port ${port}`));
