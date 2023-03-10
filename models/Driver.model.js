const { Schema, model } = require("mongoose")

const driverSchema = new Schema(
    {
        driverId: {
            type: String
        },
        name: {
            type: String,
            trim: true,
        },
        surname: {
            type: String,
            trim: true,
        },
        birthday: {
            type: String,
        },
        nationality: {
            type: String,
        },
        constructors: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true
    }
)

const Driver = model("Driver", driverSchema)

module.exports = Driver