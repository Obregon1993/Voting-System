const express = require('express');

const handlers = require('./handlers');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/login', (req, res) => {});

app.use(handlers.notFound);
app.use(handlers.errors);

app.listen(port, console.log(`server listening on port ${port}`));
