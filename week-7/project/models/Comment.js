const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Schema
const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date_time: {
        type : Date, 
        default: Date.now
    },
    upvote_downvote: {
        type: Number,
        required: true,
        default: 0,
        max: 1
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('comment', commentSchema)