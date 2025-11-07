const Joi = require('joi');
const review = require('./models/review');
// const Listing = require('./models/listening');

const listingSchema = Joi.object({
    listing: Joi.object({ 
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().allow("", null)
     }).required()
});


const reviewSchema = Joi.object({
    reviews: Joi.object({ 
        rating: Joi.number().required().min(1).max(5),
        comments: Joi.string().required().min(5)
    }).required()
});

module.exports = { listingSchema, reviewSchema };