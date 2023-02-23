const express = require('express');
const { getOneCircuitApi } = require('../controllers/api.circuit.controller');
const router = express.Router();

router.get("/circuit/:circuitID", getOneCircuitApi)

module.exports = router