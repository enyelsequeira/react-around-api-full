const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const router = express.Router();
const {
  getUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/users/me", auth, getUserInfo);

// general user routes
router.get("/users", auth, getUsers);
router.get(
  "/users/:id",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required().hex(),
    }),
  }),
  getOneUser,
);
router.patch(
  "/users/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  "/users/me/avatar",
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateAvatar,
);

module.exports = router;
// http://localhost:3000/users/5f845d006c7b26589c33b82
