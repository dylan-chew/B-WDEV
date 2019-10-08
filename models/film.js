const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the schema
const filmSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    brand: String,
    ISO: Number,
    type: String,
    formats: [String],
    process: [String],
    recipes: [{
        developer: String,
        at: String,
        time: String,
        temp_fahrenheit: Number,
        temp_celcius: Number,
        dilution_ratio: String,
        agitation: String,
        notes: String,
        example_img: String
    }],
    in_production: Boolean,
    image_path: String
},
{
    collection: 'film'
});

//export it as a model, give it a name (with a capital letter) and the schema it will abide by
module.exports = mongoose.model('Film', filmSchema);