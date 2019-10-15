//Validation function using joi middleware
const joi = require('@hapi/joi');

//define the schema for the recipes object
const recipesSchema = joi.object().keys({
    developer: joi.string().max(100).required(),
    at: joi.string().max(10).required(),
    time: joi.string().max(10)
    .pattern(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/).required()
    .label('Time must be in format: (HH):MM:SS'),
    temp_fahrenheit: joi.number().required(),
    temp_celcius: joi.number(),
    dilution_ratio: joi.string().max(10).required(),
    agitation: joi.string().max(100).required(),
    notes: joi.string().max(500).required(),
    example_img: joi.string().allow(null)
})

const validateFilm = (newFilm, req) => {
    //validate new film
    const schema = joi.object({
        name: joi.string().max(30).required(),
        brand: joi.string().max(30).required(),
        ISO: joi.number().required(),
        type: joi.string().max(100),
        process: joi.array().items(joi.string()).required(),
        formats: joi.array().items(joi.string().valid('35mm', '120', '8x10 in', '620', '4x5 in', 'bulk')).required(),
        recipes: joi.array().items(recipesSchema),
        in_production: joi.bool().allow(null),
        image_path: joi.string().allow(null)
    })

    //console.log(schema.validate(newFilm))
    return schema.validate(newFilm)
}

module.exports = validateFilm;