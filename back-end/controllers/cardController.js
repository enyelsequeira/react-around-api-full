/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const Card = require('../models/Card');

// logic to get cards
function getCards(req, res) {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) =>
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: 'card ID not found' });
      // res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });

const likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }
      return res.status(404).send({ message: 'Card not Found' });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
const deleteCardLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }
      return res.status(404).send({ message: 'Card not Found' });
    })
    .catch((error) => {
      res.status(500).send(error);
    });

// PUT /cards/:cardId/likes — like a card
// DELETE /cards/:cardId/likes — unlike a card

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
};
