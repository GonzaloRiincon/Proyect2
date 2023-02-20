const axios = require('axios')
const { CURSOR_FLAGS } = require('mongodb')
const { cursorTo } = require('readline')
const Driver = require('../models/Driver.model')
class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://ergast.com/api/f1'
        })
    }
    getAllDrivers() {
        return this.api.get('/drivers.json')
    }
    getAllDriversByYear(year) {
        return this.api.get(`/${year}/drivers.json`)
    }
    getOneDriver(driver) {
        const promises = [this.api.get(`/drivers/${driver}.json`), this.api.get(`/drivers/${driver}/constructors.json`), this.api.get(`/drivers/${driver}/driverStandings.json`)]
        return Promise
            .all(promises)
            .then(([driverData, driverConstructor, driverPoints]) => {
                const { givenName, familyName, dateOfBirth, nationality, } = driverData.data.MRData.DriverTable.Drivers[0]

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
            })
    }

}
module.exports = ApiService