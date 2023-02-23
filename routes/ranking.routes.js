const express = require('express');
const { rankingList } = require('../controllers/ranking.controller');
const { isLoggedIn } = require('../middlewares/route-guard');

const router = express.Router();


router.get('/', isLoggedIn, rankingList)

module.exports = router