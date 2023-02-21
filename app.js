require("dotenv").config()

require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

const capitalize = require("./utils/capitalize")
const projectName = "Proyect-2"

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

app.use('/', require('./routes')(app))

require("./error-handling")(app)

module.exports = app
