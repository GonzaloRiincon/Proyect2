const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver.model')
const axios = require('axios')
const ApiService = require('../services/drivers.service')
const driverService = new ApiService()


//ruta que muestre todos los drivers //pantalla con los botones a todos los años, que muestre pilotos por año

router.get('/list', (req, res, next) => {

    driverService

        .getAllDrivers()
        .then(response => {
            console.log(response.data)
            res.render('drivers/list', { driver: response })
        })
        .catch(err => next(err))
})

router.get('/list/year', (req, res, next) => {
    const { year } = req.query
    driverService
        .getAllDriversByYear(year)
        .then(driverSeason => res.render('drivers/list', { driver: driverSeason }))
        .catch(err => next(err))
})


router.get('/:driverName', (req, res, next) => {
    const { driverName } = req.params
    driverService
        .getOneDriver(driverName)
        .then(driver => res.json(driver))
        .catch(err => next(err))
})





module.exports = router