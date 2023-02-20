const axios = require('axios')

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

    getOneCharacter(characterId) {
        return this.api.get(`/characters/${characterId}`)
    }


    saveCharacter(characterData) {
        return this.api.post(`/characters`, characterData)
    }

    editCharacter(characterId, characterData) {
        return this.api.put(`/characters/${characterId}`, characterData)
    }

    deleteCharacter(characterId) {
    }
}

module.exports = ApiService