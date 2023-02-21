const express = require('express')
const router = express.Router()
const ApiService = require('../services/circuits.service')
const circuitService = new ApiService()

router.get('/list', (req, res, next) => {

    circuitService
        .getAllCircuits()
        .then(circuit => res.render('circuit/list', { circuit }))
        .catch(err => next(err))
})


router.get('/list/year', (req, res, next) => {

    const { year } = req.query

    circuitService
        .getAllCircuitsByYear(year)
        .then(circuit => res.render('circuit/list', { circuit }))
        .catch(err => next(err))
})


router.get('/list/name', (req, res, next) => {

    const { name } = req.query

    circuitService
        .getOneCircuit(name)
        .then(circuit => res.render('circuit/details', { circuit }))
        .catch(err => next(err))
})


router.get('/:circuitID', (req, res, next) => {

    const { circuitID } = req.params

    const promises = [circuitService.getOneCircuit(circuitID)]

    Promise
        .all(promises)
        .then(([circuitResult]) => {
            const circuitData = Array.isArray(circuitResult) ? circuitResult[0] : circuitResult

            res.render('circuit/details', { circuit: circuitData })
        })
        .catch(err => next(err))
})








module.exports = router