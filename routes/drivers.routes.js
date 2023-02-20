const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver.model')
const axios = require('axios')
const ApiService = require('../services/drivers.service')
const driverService = new ApiService()

router.get('/:driverName', (req, res, next) => {
    const { driverName } = req.params
    driverService
        .getOneDriver(driverName)
        .then(driver => res.json(driver))
        .catch(err => next(err))
})

router.get()





module.exports = router