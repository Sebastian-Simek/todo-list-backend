const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://glowing-paletas-75ae6b.netlify.app/',
    ],
    credentials: true,
  })
);

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/tasks', require('./controllers/tasks'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
