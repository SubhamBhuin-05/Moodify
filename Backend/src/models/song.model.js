const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        // required: true
    },
    album: {
        type: String,
    },
    year: {
        type: String,
    },
    publisher: {
        type: String,
    },
    mood: {
        type: String,
        enum: {
            values: ['happy', 'sad', 'surprised'],
            message: 'Not a valid mood'
        },
    }
});

const songModel = mongoose.model('songs', songSchema);

module.exports = songModel;