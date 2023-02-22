const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver.model')
const ApiService = require("../services/drivers.service")
const driverService = new ApiService()
const Event = require("../models/Event.model")
const { shuffleArray } = require('../utils/shuffle')
const { checkIfEditor } = require('../utils/checkIfEditor');
const { checkIfAdmin } = require('../utils/checkIfAdmin');
const { isLoggedIn, checkRole, ADMINorOwn } = require('../middlewares/route-guard');


router.get('/list', isLoggedIn, (req, res, next) => {
    Event
        .find({ finished: false })
        .populate('drivers')
        .then(events => {
            const isAdmin = checkIfAdmin(req.session.currentUser.role);
            const isEditor = checkIfEditor(req.session.currentUser.role)
            res.render('races/list', { events, isAdmin, isEditor })
        })

})
router.get('/finished', isLoggedIn, (req, res, next) => {
    Event
        .find({ finished: true })
        .populate('finalClasification')
        .then(events => res.render('races/endList', { events }))

})


router.get('/create', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {
    res.render('races/event')
})

router.post('/create', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {
    const { circuit, date } = req.body

    driverService
        .getAllDriversByYear(2022)
        .then(drivers => {

            const promises = drivers.data.MRData.DriverTable.Drivers.map(driver => {
                return Driver.find({ driverId: driver.driverId })
                    .then(drivers => drivers.map(driver => driver._id))
                    .catch(err => next(err))
            })

            Promise
                .all(promises)
                .then(drivers => {
                    const newArr = drivers.flat(2)
                    return Event.create({ circuit, date, drivers: newArr })
                        .then(event => res.redirect('/event/list'))
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
})

router.post('/delete/:eventId', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {

    const { eventId } = req.params

    Event
        .findByIdAndDelete(eventId)
        .then(() => res.redirect(`/event/list`))
        .catch(err => next(err))

})

router.post('/finish/:eventId', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {

    const { eventId } = req.params

    Event
        .findById(eventId)
        .then(event => {
            let final
            return final = shuffleArray(event.drivers)
        })
        .then(final => {
            Event
                .findByIdAndUpdate(eventId, { finalClasification: final, finished: true }, { new: true })
                .populate('finalClasification')
                .then(event => {

                    Driver.findByIdAndUpdate(event.finalClasification[0]._id, { $inc: { points: 100 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[1]._id, { $inc: { points: 90 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[2]._id, { $inc: { points: 80 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[3]._id, { $inc: { points: 70 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[4]._id, { $inc: { points: 60 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[5]._id, { $inc: { points: 50 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[6]._id, { $inc: { points: 40 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[7]._id, { $inc: { points: 30 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[8]._id, { $inc: { points: 20 } }).then()
                    Driver.findByIdAndUpdate(event.finalClasification[9]._id, { $inc: { points: 10 } }).then()
                })
                .then(() => res.redirect('/event/finished'))
                .catch(err => next(err))

        })
        .catch(err => next(err))
})

module.exports = router