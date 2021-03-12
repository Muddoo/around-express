const cards = require('../models/card');

const handleError = (res, status = 500, err = 'Internal Server Error') => res.status(status).send({ error: err });

const getCards = (req, res) => {
  cards.find({})
    .populate('owner')
    .then((all) => res.send(all))
    .catch(() => handleError(res));
};

const createCard = (req, res) => {
  cards.create({ ...req.body, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => (err.name === 'ValidationError' ? handleError(res, 400, err.message) : handleError(res)));
};

const deleteCard = (req, res) => {
  cards.findByIdAndDelete(req.params.cardId)
    .orFail(() => handleError(res, 404, 'Not Found'))
    .then(() => res.send({ message: 'Card Deleted' }))
    .catch((err) => (err.name === 'CastError' ? handleError(res, 400, err.message) : handleError(res)));
};

const likeCard = (req, res) => {
  cards.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  }, { new: true })
    .orFail(() => handleError(res, 404, 'Not Found'))
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => (err.name === 'CastError' ? handleError(res, 400, err.message) : handleError(res)));
};

const dislikeCard = (req, res) => {
  cards.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  }, { new: true })
    .orFail(() => handleError(res, 404, 'Not Found'))
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => (err.name === 'CastError' ? handleError(res, 400, err.message) : handleError(res)));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
