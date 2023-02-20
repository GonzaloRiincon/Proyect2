const { Schema, model } = require("mongoose")

const draftSchema = new Schema(
    {
        drivers: {
            type: [{
                ref: 'Driver',
                type: Schema.Types.ObjectId
            }],
        },
        totalPoints: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

const Draft = model("Draft", draftSchema)

module.exports = Draft