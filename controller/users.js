const users = require('../models/user');

const getUsers = (req, res) => {
  users.find({})
    .then((all) => res.send(all))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

const getUser = (req, res) => {
  users.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send({ error: err.message }));
};

const createUser = (req, res) => {
  users.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  users.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ error: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  users.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ error: err.message }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
