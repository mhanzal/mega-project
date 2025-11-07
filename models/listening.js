const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review.js');
const { string } = require('joi');
// const User = require("../models/user.js");/

const listeningSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
      url: String,
      filename: String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", 
  }

})


listeningSchema.post("findOneAndDelete", async(Listing) => {
    if (Listing) {
            await Review.deleteMany({ _id: { $in: Listing.reviews } });
    }
});



const Listing = mongoose.model('Listing', listeningSchema);
module.exports = Listing;