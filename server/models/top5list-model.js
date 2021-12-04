const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: {type: String, required: true},
        ownerUsername: {type: String, required: true},
        views: {type: Number, required: true},
        likers: {type: [String], required: true},
        dislikers:{ type: [String], required: true },
        // isPublished:{type: Boolean, required: true},
        comments: [{body: String, owner: String}]


    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
