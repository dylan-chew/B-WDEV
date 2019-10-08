const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the schema
const songSchema = new Schema({
    title: String,
    artist: String,
    releaseYear: Number,
    rating: Number,
    genres: [String],
    tags: [String]
});

//export it as a model, give it a name (with a capital letter) and the schema it will abide by
module.exports = mongoose.model('Song', songSchema);