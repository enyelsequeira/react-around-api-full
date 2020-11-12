/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const Card = require('../models/Card');
const ValidationError = require('../middleware/errors/ValidationError');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ForbiddenError = require('../middleware/errors/ForbiddenError');

// logic to get cards
function getCards(req, res) {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      console.log(card, 88885858);
      if (!card) {
        throw new ValidationError(
          'invalid data passed to the methods for creating a card'
        );
      }
      res.send(card);
    })
    .catch(next);
};

const deleteCard = async (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
    if (String(card.owner) !== req.user._id) {
      throw new ForbiddenError('User is not authorized for this method');
    }
    if (card === null) {
      throw new NotFoundError('card not found');
    }
  });

  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ message: 'Card deleted' }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new ValidationError('this card was already liked');
    })
    .catch(next);
};

const deleteCardLike = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new ValidationError('this card was not liked yet');
    })
    .catch(next);

// PUT /cards/:cardId/likes — like a card
// DELETE /cards/:cardId/likes — unlike a card

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
};
