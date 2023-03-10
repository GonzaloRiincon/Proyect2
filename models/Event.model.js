const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        circuit: {
            type: String,
            required: true,
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
        finished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    },

)
eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema)

module.exports = Event