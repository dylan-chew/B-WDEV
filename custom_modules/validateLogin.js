//import joi module
const joi = require('@hapi/joi');

// •	email – required, must be unique, must be a valid email address.
// •	password – required, maximum length 255 characters.
const validateLogin = (newUser, req) => {
    //validate new film
    const schema = joi.object({
        email: joi.string().email({minDomainSegments: 2}).required(),
        password: joi.string().max(255).required()
    })

    //console.log(schema.validate(newFilm))
    return schema.validate(newUser)
}

module.exports = validateLogin;