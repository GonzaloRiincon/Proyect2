const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/route-guard');
const { getAllCircuits, getAllCircuitsByYear, getAllCircuitsByName, getCircuitsDetails } = require('../controllers/circuit.controller')

router.get('/list', isLoggedIn, getAllCircuits)
router.get('/list/year', isLoggedIn, getAllCircuitsByYear)
router.get('/list/name', isLoggedIn, getAllCircuitsByName)
router.get('/:circuitID', isLoggedIn, getCircuitsDetails)

module.exports = router