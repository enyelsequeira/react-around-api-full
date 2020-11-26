const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  deleteCardLike,
} = require('../controllers/cardController');

const router = express.Router();
// router === /cards, (logic)
router.get('/cards', getCards);
router.post(
  '/cards',
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
      link: Joi.string()
        .required()
        .uri({ scheme: ['http', 'https'] }),
      likes: Joi.array().items(Joi.string()),
    }),
  }),
  createCard
);
router.delete(
  '/cards/:cardId',
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
      cardId: Joi.string().required().alphanum(),
    }),
  }),
  deleteCard
);
router.put(
  '/cards/likes/:id',
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
  likeCard
);
router.delete(
  '/cards/likes/:id',
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
  deleteCardLike
);

module.exports = router;
