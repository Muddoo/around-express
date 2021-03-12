const router = require('express').Router();
const { getUsers, getUser, createUser, updateUser, updateAvatar} = require('../controller/users')
const users = require('../models/user')


router.get('/', getUsers)
router.get('/:userId', getUser)
router.post('/', createUser)
router.patch('/me', updateUser)
router.patch('/me/avatar', updateAvatar)

module.exports = router;