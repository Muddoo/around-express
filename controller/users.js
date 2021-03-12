const users = require('../models/user');

const handleError = (res, status = 500, err = 'Internal Server Error') => res.status(status).send({ error: err });

const getUsers = (req, res) => {
  users.find({})
    .then((all) => res.send(all))
    .catch(() => handleError(res));
};

const getUser = (req, res) => {
  users.findById(req.params.userId)
    .orFail(() => handleError(res, 404, 'Not Found'))
    .then((user) => res.send(user))
    .catch((err) => (err.name === 'CastError' ? handleError(res, 400, err.message) : handleError(res)));
};

const createUser = (req, res) => {
  users.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => (err.name === 'ValidationError' ? handleError(res, 400, err.message) : handleError(res)));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  users.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => handleError(res, 404, 'Not Found'))
    .then((user) => res.send(user))
    .catch((err) => (err.name === 'CastError' ? handleError(res, 400, err.message) : handleError(res)));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  users.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => handleError(res, 404, 'Not Found'))
    .then((user) => res.send(user))
    .catch((err) => (err.name === 'CastError' ? handleError(res, 400, err.message) : handleError(res)));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
