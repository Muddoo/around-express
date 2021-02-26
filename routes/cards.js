const router = require('express').Router();
const path = require('path');
const cards = require('../controller')(path.join(__dirname, '..', 'data', 'cards.json'));

router.get('/', async (req,res) => res.send(await cards));

module.exports = router;