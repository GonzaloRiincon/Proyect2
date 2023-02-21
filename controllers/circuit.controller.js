const ApiService = require("../services/circuits.service")
const circuitService = new ApiService()
const Driver = require('../models/Driver.model')
const capitalize = require('../utils/capitalize')

const getAllCircuits = (req, res, next) => {

    circuitService
        .getAllCircuits()
        .then(circuitsData => {
            const circuits = circuitsData.data.MRData.CircuitTable.Circuits
            res.render('circuit/list', { circuits })
        })
        .catch(err => next(err))
}

const getAllCircuitsByYear = (req, res, next) => {

    const { year } = req.query

    circuitService
        .getAllCircuitsByYear(year)
        .then(circuitsData => {
            const circuits = circuitsData.data.MRData.CircuitTable.Circuits
            res.render('circuit/list', { circuits })
        })
        .catch(err => next(err))
}

const getAllCircuitsByName = (req, res, next) => {

    const { name } = req.query

    circuitService
        .getAllCircuitsByName(name)
        .then(circuitsData => {
            const circuits = circuitsData.data.MRData.CircuitTable.Circuits
            res.render('circuit/list', { circuits })
        })
        .catch(err => next(err))
}

const getCircuitsDetails = (req, res, next) => {

    const { circuitID } = req.params

    circuitService
        .getOneCircuit(circuitID)
        .then(circuitData => circuitData.data.MRData.CircuitTable.Circuits)
        .then(([circuitResult]) => {
            const circuitData = Array.isArray(circuitResult) ? circuitResult[0] : circuitResult

            res.render('circuit/details', { circuit: circuitData })
        })
        .catch(err => next(err))
}


module.exports = { getAllCircuits, getAllCircuitsByYear, getAllCircuitsByName, getCircuitsDetails }