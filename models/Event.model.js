const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        circuit: {
            type: String,
            required: true,
        },

        place: {
            country: {
                type: String,
                required: true,
            },
            locality: {
                type: String,
                required: true,
            },
            location: {
                type: {
                    type: String,
                },
                coords: {
                    type: [Number]
                }
            },
        },

        date: {
            type: Date,
            required: true,
        },

        drivers: {
            type: [{
                ref: 'Driver',
                type: Schema.Types.ObjectId
            }]
        },

        finalClasification: {
            type: [{
                ref: 'Driver',
                type: Schema.Types.ObjectId
            }]
        },
    },
    {
        timestamps: true
    },

)
eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema)

module.exports = Event