const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Schema
const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvote_downvote: {
        type: Number,
        required: true,
        max: 1
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // comment: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Comment',
    //     required: true
    // }
})

module.exports = mongoose.model('issue', issueSchema)