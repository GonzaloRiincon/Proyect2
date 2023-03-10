module.exports = (app) => {
    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)
    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)
    const userRoutes = require("./user.routes")
    app.use("/user", userRoutes)
    const driversRoutes = require("./drivers.routes")
    app.use("/drivers", driversRoutes)
    const circuitRoutes = require("./circuit.routes")
    app.use("/circuit", circuitRoutes)
    const draftRoutes = require("./draft.routes")
    app.use("/draft", draftRoutes)
    const rankingRoutes = require("./ranking.routes")
    app.use("/ranking", rankingRoutes)
    const apiRoutes = require("./api.routes");
    app.use("/api", apiRoutes);
    const eventRoutes = require("./event.routes")
    app.use("/event", eventRoutes)
}