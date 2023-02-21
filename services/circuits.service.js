const axios = require('axios')
class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://ergast.com/api/f1'
        })
    }

    getAllCircuits() {
        const promises = [this.api.get('/circuits.json')]
        return Promise
            .all(promises)
            .then(([circuits]) => {
                return circuits.data.MRData.CircuitTable.Circuits
            })
            .catch(err => console.log(err))
    }

    getAllCircuitsByYear(year) {

        const promises = [this.api.get(`/${year}/circuits.json`)]
        return Promise
            .all(promises)
            .then(([circuit]) => {
                return circuit.data.MRData.CircuitTable.Circuits
            })
            .catch(err => console.log(err))
    }
    getOneCircuit(id) {
        const promises = [this.api.get(`/circuits/${{ id }}.json`)]
        return Promise
            .all(promises)
            .then(([circuit]) => {
                return circuit.data.MRData.CircuitTable.Circuits
            })
            .catch(err => console.log(err))
    }


}


module.exports = ApiService


