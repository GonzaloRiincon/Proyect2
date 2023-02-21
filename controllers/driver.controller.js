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
        .getOneDriver(name)
        .then(driver => res.render('drivers/details', { driver }))
        .catch(err => next(err))
}

const getDriverDetails = (req, res, next) => {

    const { driverName } = req.params

    const promises = [
        driverService.getOneDriverData(driverName),
        driverService.getOneDriverConstructor(driverName),
        driverService.getOneDriverPoints(driverName),
        Driver.find({ surname: capitalize(driverName) })
    ]

    Promise
        .all(promises)
        .then(([driverData, driverConstructor, driverPoints, existing]) => {

            const { givenName, familyName, dateOfBirth, nationality, } = driverData.data.MRData.DriverTable.Drivers[0]

            if (existing.length === 0) {
                return Driver
                    .create({
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

                        return createdDriver
                    })
                    .catch(err => console.log(err))
            }

        })

    Driver
        .find({ surname: capitalize(driverName) })
        .then((driverData) => {
            const driver = Array.isArray(driverData) ? driverData[0] : driverData
            res.render('drivers/details', { driver })
        })
        .catch(err => next(err))
}

module.exports = { getAllDrivers, getAllDriversByYear, getAllDriversByName, getDriverDetails }