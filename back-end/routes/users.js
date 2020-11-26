const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
  }),
  getUserInfo
);

// general user routes
router.get(
  '/users',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
  }),
  getUsers
);
router.get(
  '/users/:id',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
    params: Joi.object().keys({
      id: Joi.string().required().alphanum(),
    }),
  }),
  getOneUser
);
router.patch(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);
router.patch(
  '/users/me/avatar',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .uri({ scheme: ['http', 'https'] }),
    }),
  }),
  updateAvatar
);

module.exports = router;
// http://localhost:3000/users/5f845d006c7b26589c33b82
