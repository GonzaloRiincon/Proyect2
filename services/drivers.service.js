const axios = require('axios')
const capitalize = require('../utils/capitalize')

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

    getAllDriversByName(name) {
        return this.api.get(`/drivers/${capitalize(name)}.json`)
    }

    getOneDriverData(driver) {
        return this.api.get(`/drivers/${driver}.json`)
    }

    getOneDriverConstructor(driver) {
        return this.api.get(`/drivers/${driver}/constructors.json`)
    }

    getOneDriverPoints(driver) {
        return this.api.get(`/drivers/${driver}/driverStandings.json`)
    }
}
module.exports = ApiService