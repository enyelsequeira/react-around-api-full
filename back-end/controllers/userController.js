/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
// Keeping the logic for the actual router are used in the controllers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { NODE_ENV, JWT_SECRET } = process.env;
const ValidationError = require("../middleware/errors/ValidationError");
const isEmail = require("validator/lib/isEmail");
const NotFoundError = require("../middleware/errors/NotFoundError");
const ConflictError = require("../middleware/errors/ConflictError");

// logic to get users info
function getUsers(req, res, next) {
  return User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
}

// logic to get a specific user info
function getOneUser(req, res, next) {
  return User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError({ message: "User not Found" });
      // res.send(users);
    })
    .catch(next);
}

// creating User
const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  isEmail(email);

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash, name, about, avatar })
      .then((user) => {
        if (!user) {
          throw new ValidationError(
            "invalid data passed to the methods for creating a user"
          );
        }
        res.status(201).send({
          _id: user._id,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === "MongoError" || err.code === 11000) {
          throw new ConflictError("sorry user already exist");
        }
        next(err);
      })
      .catch(next);
  });
};

// Updating profile patching
const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      throw new NotFoundError("Could not update the users name");
    })
    .catch(next);
};
// req.user._id
// updating Avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("user not found");
      }
      res.send({ data: user });
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!isEmail(email)) {
    throw new ValidationError("Incorrect Email or Password");
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      // console.log('THIS IS JOHNS ID -', user._id);
      // const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
      //   expiresIn: '7d',
      // });
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
        { expiresIn: "7d" }
      );
      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      // we return the token
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("user not found");
      }
      // console.log('THIS IS OUR USER THAT WE"RE SENDING TO FRONTEND', user);
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
