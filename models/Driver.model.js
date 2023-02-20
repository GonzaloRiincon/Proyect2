const { Schema, model } = require("mongoose")

const driverSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        surname: {
            type: String,
            trim: true,
            required: true,
        },
        birthday: {
            type: String,
        },
        nationality: {
            type: String,
            required: true
        },
        constructors: {
            type: [String],
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