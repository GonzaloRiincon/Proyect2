const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver.model')
const User = require('../models/User.model')
const axios = require('axios')
const ApiService = require('../services/drivers.service')
const driverService = new ApiService()


//ruta que muestre todos los drivers //pantalla con los botones a todos los años, que muestre pilotos por año

router.get('/list', (req, res, next) => {

    driverService

        .getAllDrivers()
        .then(response => {
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

router.get('/list/name', (req, res, next) => {
    const { name } = req.query
    driverService
        .getOneDriver(name)
        .then(driver => {
            res.render('drivers/details', { driver })
        })
        .catch(err => next(err))
})




router.get('/:driverName', (req, res, next) => {
    const { driverName } = req.params

    const promises = [driverService.getOneDriver(driverName)]

    Promise
        .all(promises)
        .then(([driverResult]) => {

            const driverData = Array.isArray(driverResult) ? driverResult[0] : driverResult

            res.render('drivers/details', { driver: driverData })
        })
        .catch(err => next(err))
})



module.exports = router