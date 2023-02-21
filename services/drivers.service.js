const axios = require('axios')
const capitalize = require('../utils/capitalize')
const Driver = require('../models/Driver.model')
class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://ergast.com/api/f1'
        })
    }
    getAllDrivers() {
        const promises = [this.api.get('/drivers.json')]
        return Promise
            .all(promises)
            .then(([drivers]) => {
                return drivers.data.MRData.DriverTable.Drivers
            })
            .catch(err => console.log(err))

    }
    getAllDriversByYear(year) {

        const promises = [this.api.get(`/${year}/drivers.json`)]
        return Promise
            .all(promises)
            .then(([drivers]) => {
                return drivers.data.MRData.DriverTable.Drivers
            })
            .catch(err => console.log(err))
    }
    getOneDriver(driver) {
        console.log(capitalize('hola'))
        const promises = [this.api.get(`/drivers/${driver}.json`), this.api.get(`/drivers/${driver}/constructors.json`), this.api.get(`/drivers/${driver}/driverStandings.json`), Driver.find({ surname: capitalize(driver) })]
        return Promise
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
                if (existing.length === 1) {
                    return Driver
                        .find({ surname: capitalize(driver) })
                        .then(driverProf => {
                            return driverProf
                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

}
module.exports = ApiService