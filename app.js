const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { handleErrors } = require('./middlewares/handle-errors');

const { PORT = 3000 } = process.env;

const app = express();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZlNDEwY2M4NjUzNDMzM2I3NGEyYTUiLCJpYXQiOjE2ODQ5NDcyNDYsImV4cCI6MTY4NTU1MjA0Nn0.9TaTwGec-hbT3dKKl_asn7j4_Itf6AlNqx6s82__IdU

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use('/', require('./routes/index'));

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
