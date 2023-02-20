const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver.model')
const axios = require('axios')
const ApiService = require('../services/drivers.service')
const driverService = new ApiService()

router.get('/driver/alonso', (req, res, next) => {
    driverService
        .getOneDriver('alonso')
        .then(alonso => res.json(alonso))
        .catch(err => next(err))
})




module.exports = router