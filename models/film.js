const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the schema
const filmSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    ISO: { type: Number, required: true },
    type: { type: String, required: false },
    formats: { type: [String], required: true },
    process: { type: [String], required: true },
    recipes: [{
        developer: { type: String, required: true },
        at: { type: String, required: true },
        time: { type: String, required: true },
        temp_fahrenheit: { type: Number, required: true },
        temp_celcius: { type: Number, required: false },
        dilution_ratio: { type: String, required: true },
        agitation: { type: String, required: true },
        notes: { type: String, required: false },
        example_img: { type: String, required: false }
    }],
    in_production: { type: Boolean, required: false },
    image_path: { type: String, required: false }
},
    {
        collection: 'film'
    });

//export it as a model, give it a name (with a capital letter) and the schema it will abide by
module.exports = mongoose.model('Film', filmSchema);