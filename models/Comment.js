const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemid: {
        type: String,
        required: true
    }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
