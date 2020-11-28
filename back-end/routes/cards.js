const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  deleteCardLike,
} = require("../controllers/cardController");

const router = express.Router();
// router === /cards, (logic)
router.get("/cards", getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard,
);
router.delete(
  "/cards/:cardId",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    params: Joi.object().keys({
      cardId: Joi.string().required().hex(),
    }),
  }),
  deleteCard,
);
router.put(
  "/cards/likes/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required().hex(),
    }),
  }),
  likeCard,
);
router.delete(
  "/cards/likes/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required().hex(),
    }),
  }),
  deleteCardLike,
);

module.exports = router;
