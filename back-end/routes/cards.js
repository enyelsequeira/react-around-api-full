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
router.put('/cards/:id/likes', likeCard);
router.delete('cards/:id/likes', deleteCardLike);

module.exports = router;
