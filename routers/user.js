const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middle.js")



//signup
router.get("/signup", (req, res) => {
  res.render("users/signup");
});


router.post("/signup", wrapasync(async(req, res) => {
   try {
     const {username, email, password} = req.body;
    const newUser = new User({username, email});
    const registered = await User.register(newUser, password);
    req.login(registered, (err) => {
      if(err) {
        return next(err)
      }
      req.flash("success", "Welcome You Are Registered")
      res.redirect("/listings")
    })
    console.log(registered)
   }catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup")
   }
}))


//login route 
router.get("/login", (req, res) => {
    res.render("users/login")
})

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
  async (req, res) => {
    // console.log("✅ Logged in user:", req.user); 
    req.flash("success", "Welcome Back! You’re Logged In Successfully");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);





//logout 
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next()
    }
    req.flash("success", "You Are Logout ")
    res.redirect("/listings")
  })
})


module.exports = router;
