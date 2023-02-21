const express = require('express')
const router = express.Router()

const {
    getAllDrivers,
    getAllDriversByYear,
    getAllDriversByName,
    getDriverDetails
} = require('../controllers/driver.controller')


router.get('/list', getAllDrivers)

router.get('/list/year', getAllDriversByYear)

router.get('/list/name', getAllDriversByName)

router.get('/:driverName', getDriverDetails)



module.exports = router