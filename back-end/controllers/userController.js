/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
// Keeping the logic for the actual router are used in the controllers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// logic to get users info
function getUsers(req, res) {
  return User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// logic to get a specific user info
function getOneUser(req, res) {
  // console.log(req.params.id);

  return User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User id found" });
      // res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: "User not found" });
    });
}

const createUser = (req, res) => {
  const user = req.body;

  bcrypt.hash(user.password, 10).then((hash) => {
    User.create({ ...user, password: hash }).then((createdUser) =>
      res
        .status(200)
        .send({ data: createdUser })
        .catch((err) => {
          if (err.name === "ValidationError") {
            res.status(400).send({ message: err.message });
          } else {
            res.status(500).send({ message: err.message });
          }
        }));
  });
};

// Updating profile patching
const updateProfile = (req, res) =>
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(404).send({ message: "User ID not found" });
    })
    .catch((err) => {
      if (err.message === "Validation failed") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: "could not create user" });
    });
// req.user._id
const updateAvatar = (req, res) =>
  User.findByIdAndUpdate(req.user._id, { avatar: newAvatar })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
      return res.status(404).send({ message: "User not found" });
    })
    .catch((err) => {
      if (err.message === "Validation failed") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: "could not update Avatar" });
    });

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, "some-secret-key", { expiresIn: "7d" });
      // we return the token
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getUserInfo = (req, res) => res.status(200).send(req.user);

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo
};
