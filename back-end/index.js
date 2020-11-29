require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/userController");
const { requestLogger, errorLogger } = require("./middleware/logger");
const auth = require("./middleware/auth");

const app = express();
// listen to port 3000
const { PORT = 3000 } = process.env;
app.use(requestLogger);

app.use(express.json(), cors());

const connectionURL = "mongodb://localhost:27017/aroundb";

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// only for reviewers
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
// auth user routes

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      //! these objectskeys should not be needed since you are giving default
      // name: Joi.string().min(2).max(30),
      // about: Joi.string().min(2).max(30),
      // avatar: Joi.string().uri({ scheme: ["http", "https"] }),
      email: Joi.string().required().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }),
  }),
  createUser,
);
app.use(auth);
app.use("/", userRouter);
app.use("/", cardRouter);

app.use(errorLogger);
// in case route is not defined
app.use((err, req, res, next) => {
  if (err.name === "MongoError" && err.code === 11000) {
    res.status(409).send({ message: "Email already exists" });
  } else if (err.statusCode === undefined) {
    const { statusCode = 400, message } = err;
    res.status(statusCode).send({
      message: statusCode === 400 ? "Invalid data passed" : message,
    });
  } else {
    const { statusCode, message } = err;
    res.status(statusCode).send({ message });
  }
});
