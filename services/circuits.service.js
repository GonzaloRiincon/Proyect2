const axios = require('axios')

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://ergast.com/api/f1'
        })
    }

    getAllCircuits() {
        return this.api.get('/circuits.json')
    }

    getAllCircuitsByYear(year) {

        return this.api.get(`/${year}/circuits.json`)
    }

    getAllCircuitsByName(name) {

        return this.api.get(`/circuits/${name}.json`)
    }

    getOneCircuit(id) {
        return this.api.get(`/circuits/${id}.json`)
    }
}

module.exports = ApiService