const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [{item: String, votes: Number}], required: true },
        views: {type: Number, required: true},
        likers: {type: [String], required: true},
        dislikers:{ type: [String], required: true },
        datePublished:{ type: Date },
        comments: [{body: String, owner: String}]


    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)
