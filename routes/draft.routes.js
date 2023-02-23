const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/route-guard');
const { addDriverById, deleteDriverById } = require('../controllers/draft.controller');


router.post('/add/:driverId', isLoggedIn, addDriverById)

router.post('/delete/:driverId', isLoggedIn, deleteDriverById)


module.exports = router
