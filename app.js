require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { handleErrors } = require('./middlewares/handle-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./middlewares/cors-options');

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(cors(corsOptions));
app.use(requestLogger);
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
