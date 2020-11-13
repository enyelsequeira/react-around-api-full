const express = require('express');

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
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/likes/:id', likeCard);
router.delete('/cards/likes/:id', deleteCardLike);

module.exports = router;
