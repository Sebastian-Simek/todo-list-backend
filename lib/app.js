const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

app.use(express.json());
app.unsubscribe(cookieParser());

app.use('/api/v1/users', require('./controllers/users'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
