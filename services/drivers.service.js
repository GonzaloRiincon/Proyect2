const axios = require('axios')
const Driver = require('../models/Driver.model')
class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://ergast.com/api/f1'
        })
    }
    getAllDrivers() {
        console.log("jejejejejeje")
        return this.api.get('/drivers.json')
    }
    getAllDriversByYear(year) {
        return this.api.get(`/${year}/drivers.json`)
    }
    getOneDriver(driver) {
        const driverData = this.api.get(`/drivers/${driver}.json`)
        const driverConstructor = this.api.get(`/drivers/${driver}/constructors.json`)
        const driverPoints = this.api.get(`/drivers/${driver}/driverStandings.json`)
        Driver
            .create({
                name: MRData.DriverTable.Drivers.givenName,
                surname: MRData.DriverTable.Drivers.familyName,
                birthday: MRData.DriverTable.Drivers.dateOfBirth,
                nationality: MRData.DriverTable.Drivers.nationality,
                constructors: MRData.ConstructorTable.constructors[0].name,
                points: MRData.StandingsTable.StandingsLists.map(element => element.DriverStandings.points),
            })
            .then(createdDriver => {
                return Driver.findById(createdDriver._id)
            })
            .catch(err, next(err))
    }

}
module.exports = ApiService