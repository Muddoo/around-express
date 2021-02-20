const router = require('express').Router();
const users = require('../data/users.json');

const isUser = (req,res,next) => {
  const user = users.find(u => u._id === req.params.id);
  if(!user) return res.status(404).send({ message: "User ID not found" });
  next();
};

router.get('/', (req,res) => {
  res.send(users);
});

router.get('/:id', isUser, (req,res) => {
  const user = users.find(u => u._id === req.params.id);
  res.send(user);
})

module.exports = router;