const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver.model')
const ApiService = require("../services/drivers.service")
const driverService = new ApiService()
const Event = require("../models/Event.model")
const capitalize = require('../utils/capitalize')
const { checkIfAdmin } = require('../utils/checkIfAdmin');
const { isLoggedIn, checkRole, ADMINorOwn } = require('../middlewares/route-guard');
const { getAllCircuits, getOneCircuit } = require('../controllers/circuit.controller');

router.get('/create', isLoggedIn, checkIfAdmin, (req, res, next) => {
    res.render('races/event')
})

router.post('/create', isLoggedIn, checkIfAdmin, (req, res, next) => {
    const { circuit, date } = req.body
    driverService
        .getAllDriversByYear(2022)
        .then(drivers => {
            const promises = drivers.map(driver => {
                Driver.find({ driverId: driver.data.MRData.DriverTable.Drivers.driverId })
            })
            Promise
                .all(promises)
                .then(drivers => { console.log(drivers) })
        })
        .catch(err => next(err))

    // Event
    //     .create({ circuit, date })
    //     .then(() => res.redirect())
    //     .catch(err => next(err))
})







module.exports = router