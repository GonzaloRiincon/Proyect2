const express = require('express')
const { getIndexPage } = require('../controllers/index.controller')
const router = express.Router()

router.get("/", getIndexPage)

module.exports = router
