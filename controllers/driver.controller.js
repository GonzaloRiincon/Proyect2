const ApiService = require("../services/drivers.service")
const driverService = new ApiService()
const Driver = require('../models/Driver.model')
const capitalize = require('../utils/capitalize')




const getAllDrivers = (req, res, next) => {

    driverService
        .getAllDrivers()
        .then(driversData => {
            const drivers = driversData.data.MRData.DriverTable.Drivers
            res.render('drivers/list', { drivers })
        })
        .catch(err => next(err))
}

const getAllDriversByYear = (req, res, next) => {

    const { year } = req.query

    driverService
        .getAllDriversByYear(year)
        .then(driversData => {
            const drivers = driversData.data.MRData.DriverTable.Drivers
            res.render('drivers/list', { drivers })
        })
        .catch(err => next(err))
}

const getAllDriversByName = (req, res, next) => {

    const { name } = req.query

    driverService
        .getAllDriversByName(name)
        .then(driversData => {
            const drivers = driversData.data.MRData.DriverTable.Drivers
            res.render('drivers/list', { drivers })
        })
        .catch(err => next(err))
}

const getDriverDetails = (req, res, next) => {

    const { driverId } = req.params

    const promises = [
        driverService.getOneDriverData(driverId),
        driverService.getOneDriverConstructor(driverId),
        driverService.getOneDriverPoints(driverId),
        Driver.find({ driverId: driverId })
    ]

    Promise
        .all(promises)
        .then(([driverData, driverConstructor, driverPoints, existing]) => {

            const { driverId, givenName, familyName, dateOfBirth, nationality, } = driverData.data.MRData.DriverTable.Drivers[0]

            if (existing.length === 0) {
                return Driver
                    .create({
                        driverId,
                        name: givenName,
                        surname: familyName,
                        birthday: dateOfBirth,
                        nationality: nationality,
                        constructors: driverConstructor.data.MRData.ConstructorTable.Constructors[0].name,
                        points: driverPoints.data.MRData.StandingsTable.StandingsLists
                            .map(element => element.DriverStandings.map(elm => Number(elm.points)))
                            .flat(2).reduce((acc, curr) => acc + curr),
                    })
                    .then(createdDriver => {
                        const driver = Array.isArray(createdDriver) ? createdDriver[0] : createdDriver
                        res.render('drivers/details', { driver })
                    })
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))

    Driver
        .find({ driverId: driverId })
        .then((driverData) => {
            const driver = Array.isArray(driverData) ? driverData[0] : driverData
            res.render('drivers/details', { driver })
        })
        .catch(err => next(err))
}

module.exports = { getAllDrivers, getAllDriversByYear, getAllDriversByName, getDriverDetails }