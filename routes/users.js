const router = require('express').Router();
const path = require('path');
let users = require('../controller')(path.join(__dirname, '..', 'data', 'users.json'));

const isUser = async (req,res,next) => {
  users = await users;
  const user = users.find(u => u._id === req.params.id);
  if(!user) return res.status(404).send({ message: "User ID not found" });
  next();
};

router.get('/', async (req,res) => res.send(await users));

router.get('/:id', isUser, async (req,res) => {
  users = await users;
  const user = users.find(u => u._id === req.params.id);
  res.send(user);
})

module.exports = router;