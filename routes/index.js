module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const userRoutes = require("./user.routes")
    app.use("/user", userRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const driversRoutes = require("./drivers.routes")
    app.use("/drivers", driversRoutes)

    const circuitRoutes = require("./circuit.routes")
    app.use("/circuit", circuitRoutes)
}