const cards = require('../models/card');

const getCards = (req, res) => {
  cards.find({})
    .populate('owner')
    .then((all) => res.send(all))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

const createCard = (req, res) => {
  cards.create({ ...req.body, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const deleteCard = (req, res) => {
  cards.findByIdAndDelete(req.params.cardId)
    .then((card) => (card ? res.send({ message: 'Card Deleted' }) : res.status(404).send({ message: 'Not Found' })))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const likeCard = (req, res) => {
  cards.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  }, { new: true })
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const dislikeCard = (req, res) => {
  cards.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  }, { new: true })
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({ error: err.message }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
