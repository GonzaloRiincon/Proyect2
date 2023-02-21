const express = require('express')
const router = express.Router()
const {
    getAllCircuits,
    getAllCircuitsByYear,
    getAllCircuitsByName,
    getCircuitsDetails
} = require('../controllers/circuit.controller')

router.get('/list', getAllCircuits)


router.get('/list/year', getAllCircuitsByYear)


router.get('/list/name', getAllCircuitsByName)


router.get('/:circuitID', getCircuitsDetails)



module.exports = router