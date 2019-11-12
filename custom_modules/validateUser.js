//import joi module
const joi = require('@hapi/joi');

// •	firstName – required, maximum length 100 characters.
// •	lastName – required, maximum length 100 characters.
// •	email – required, must be unique, must be a valid email address.
// •	password – required, maximum length 255 characters.
const validateUser = (user) => {
    //validate new film
    const schema = joi.object({
        firstName: joi.string().max(100).required(),
        lastName: joi.string().max(100).required(),
        email: joi.string().email({minDomainSegments: 2}).required(),
        password: joi.string().max(255).required()
    })

    //console.log(schema.validate(newFilm))
    return schema.validate(user)
}

module.exports = validateUser;