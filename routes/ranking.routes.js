const express = require('express');
const { createRankingByPoints } = require('../controllers/ranking.controller');
const router = express.Router();


router.get('/', createRankingByPoints)

module.exports = router