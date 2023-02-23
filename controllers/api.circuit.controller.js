const ApiService = require("../services/circuits.service")
const circuitService = new ApiService()

const getOneCircuitApi = (req, res, next) => {

    const { circuitID } = req.params
    circuitService
        .getOneCircuit(circuitID)
        .then(circuit => {
            console.log(circuit.data.MRData.CircuitTable.Circuits)
            res.send(circuit.data.MRData.CircuitTable.Circuits)
        })
        .catch(err => next(err))
}


module.exports = { getOneCircuitApi }