const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/route-guard');
const { getAllDrivers, getAllDriversByYear, getAllDriversByName, getDriverDetails } = require('../controllers/driver.controller')

router.get('/list', isLoggedIn, getAllDrivers)
router.get('/list/year', isLoggedIn, getAllDriversByYear)
router.get('/list/name', isLoggedIn, getAllDriversByName)
router.get('/:driverId', isLoggedIn, getDriverDetails)

module.exports = router