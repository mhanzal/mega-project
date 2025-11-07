const express = require("express")
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapasync.js");
// const ExpressError = require("../utils/expresserror.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listening.js");
const { isLoggedIn, isOwner } = require("../middle.js")
const multer  = require('multer')
const {cloudinary, storage} = require("../cloudconfig.js")
const upload = multer({storage})





const validateListing = (req, res, next) => {
   const {error} = listingSchema.validate(req.body);
   console.log(error);
   if (error) {
       throw new ExpressError(error, 400);
   }else {
   next();
   }
}










// Home route
// router.get("/", (req, res) => {
//     res.send("working");
// })



//all listings
router.get("/",
    validateListing,
    wrapAsync(async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
}));

// new route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
})

// show route
router.get("/:id",
    // isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: 'reviews',      
     populate: { path: 'author' }  
  })

    .populate("owner");
   if (!listing) {
  req.flash("error", "This listing does not exist!");
  return res.redirect("/listings");
  }

    res.render("listings/show.ejs", { listing });
}))

// create route
router.post("/",
    isLoggedIn,
  validateListing,
  upload.single('listing[image]'),
  wrapAsync(async (req, res) => {
    let url = req.file.path
    let filename = req.file.filename
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename}
  await newListing.save();
  req.flash("success", "New Listing Created")
  res.redirect("/listings");
}));

// edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
     if (!listing) {
     req.flash("error", "This listing does not exist!");
     return res.redirect("/listings");
     }

    res.render("listings/edit.ejs", { listing });
}))
// Update route
router.put("/:id",
    isLoggedIn,
    isOwner,
     upload.single('listing[image]'),
    validateListing,
    wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing)

    if(typeof req.file != "undefine") {
    let url = req.file.path
    let filename = req.file.filename;
    listing.image = {url, filename}
    await listing.save()
    }

    req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`);
}))


// delete route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success", "Listing Deleted")
    res.redirect(`/listings`);
}));


module.exports = router;
