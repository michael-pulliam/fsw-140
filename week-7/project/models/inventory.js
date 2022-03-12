const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Schema
const candleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    scent: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
})

module.exports = mongoose.model('inventory', candleSchema)
