const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// •	firstName – required, maximum length 100 characters.
// •	lastName – required, maximum length 100 characters.
// •	email – required, must be unique, must be a valid email address.
// •	password – required, maximum length 255 characters.
//define the schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: Number, required: true },
    password: { type: String, required: false },

    },
    {
        collection: 'film'
    });

//export it as a model, give it a name (with a capital letter) and the schema it will abide by
module.exports = mongoose.model('User', userSchema);