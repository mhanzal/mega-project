const express = require("express")
const router = express.Router({mergeParams: true});
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapasync.js");
// const ExpressError = require("../utils/expresserror.js");
const Review = require('../models/review.js')
const Listing = require("../models/listening.js");
const {isReviewAuthor, isLoggedIn} = require("../middle.js")




const validateReview = (req, res, next) => {
   const {error} = reviewSchema.validate(req.body);
   console.log(error);
   if (error) {
       throw new ExpressError(error, 400);
   }else {
   next();
   }
}


// Review routes
router.post("/",
  validateReview, wrapAsync(
  async(req, res) => {
  const listing = await Listing.findById(req.params.id);
  // 2) Create the review with a consistent variable name
  const newReview = new Review(req.body.reviews);
  newReview.author = req.user._id; 
  console.log( newReview);
  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();
    req.flash("success", "New Review Created")
  res.redirect(`/listings/${listing._id}`);
}));


// Review delete route 
router.delete("/:reviewId", 
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(async (req, res) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId }})
  await Review.findByIdAndDelete(reviewId)
    req.flash("success", "Review Deleted")
    res.redirect(`/listings/${id}`);
}))



module.exports = router;