const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver.model')
const User = require('../models/User.model')
const axios = require('axios')
const ApiService = require('../services/drivers.service')
const { getAllDrivers, getAllDriversByYear, getAllDriversByName, getDriverDetails } = require('../controllers/driver.controller')
const driverService = new ApiService()

router.get('/list', getAllDrivers)

router.get('/list/year', getAllDriversByYear)

router.get('/list/name', getAllDriversByName)

router.get('/:driverName', getDriverDetails)



module.exports = router