require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const cors = require('cors');
const { createUser, login } = require('./controllers/userController');
const { requestLogger } = require('./middleware/logger');
const { errorLogger } = require('express-winston');

const app = express();
// listen to port 3000
const { PORT = 3000 } = process.env;
app.use(requestLogger);

app.use(express.json(), cors());

const connectionURL = 'mongodb://localhost:27017/aroundb';

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app.use(express.static(path.join(__dirname, 'public')));

// auth user routes
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errorLogger);
// in case route is not defined
app.use((req, res) => {
  res.status(404).send({ message: 'Requested Resource not found' });
});
