const Event = require("../models/Event.model")
const Driver = require('../models/Driver.model')
const { shuffleArray } = require('../utils/shuffle')
const { checkIfEditor } = require('../utils/checkIfEditor');
const { checkIfAdmin } = require('../utils/checkIfAdmin')
const ApiService = require("../services/drivers.service")
const driverService = new ApiService()

const getFutureRaces = (req, res, next) => {
    Event
        .find({ finished: false })
        .populate('drivers')
        .then(events => {



            const isAdmin = checkIfAdmin(req.session.currentUser.role);
            const isEditor = checkIfEditor(req.session.currentUser.role)
            res.render('races/list', { events, isAdmin, isEditor })
        })

}

const getFinishedRaces = (req, res, next) => {
    Event
        .find({ finished: true })
        .populate('finalClasification')
        .then(events => {




            const isAdmin = checkIfAdmin(req.session.currentUser.role);
            const isEditor = checkIfEditor(req.session.currentUser.role)
            res.render('races/endList', { events, isAdmin, isEditor })
        })

}

const getCreateEvent = (req, res, next) => {
    res.render('races/event')
}

const postCreateEvent = (req, res, next) => {
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
}

const deleteEvent = (req, res, next) => {

    const { eventId } = req.params

    Event
        .findByIdAndDelete(eventId)
        .then(() => res.redirect(`/event/finished`))
        .catch(err => next(err))

}

const finishEvent = (req, res, next) => {

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
                    let SumPoints = 110
                    event.finalClasification.slice(0, 10).forEach(driver => {
                        SumPoints -= 10
                        Driver.findByIdAndUpdate(driver._id, { $inc: { points: SumPoints } }).then()
                    })
                })
                .then(() => res.redirect('/event/finished'))
                .catch(err => next(err))

        })
        .catch(err => next(err))
}


module.exports = { getFutureRaces, getFinishedRaces, getCreateEvent, postCreateEvent, deleteEvent, finishEvent }