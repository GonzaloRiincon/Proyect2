const express = require('express')
const { getAllCircuits, getAllCircuitsByYear, getAllCircuitsByName, getCircuitsDetails } = require('../controllers/circuit.controller')
const router = express.Router()
const ApiService = require('../services/circuits.service')
const circuitService = new ApiService()

router.get('/list', getAllCircuits)


router.get('/list/year', getAllCircuitsByYear)


router.get('/list/name', getAllCircuitsByName)


router.get('/:circuitID', getCircuitsDetails)



module.exports = router