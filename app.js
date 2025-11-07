if(process.env.NODE_ENV != "production") {
require('dotenv').config()
}

const mongoose = require('mongoose');
const express = require('express');
const app = express();
// const Listing = require("./models/listening.js");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/user.js");
const ExpressError = require("./utils/expressError");



// app.get("/", (req, res) => {
//   res.send("Go to Listing Page")
// })




// mongoDB connection
// const MONGO_URL = 'mongodb://127.0.0.1:27017/mega'

const dbUrl = process.env.MONGO_ATLAS_URL;

main()
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}




const listings = require("./routers/listings.js");
const reviews = require("./routers/reviews.js");
const user = require("./routers/user.js");


// mongo session

const store =  MongoStore.create ({
   mongoUrl: dbUrl,
   crypto: {
    secret: process.env.SECRET
   },
   touchAfter: 24 + 3000,
})

store.on("error", () => {
  console.log("error in mongo session store", err)
})

//session options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
  expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // <-- () lagaye aur multiplication use karo
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true
}
}


// set and use
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// app.get("/checkuser", (req, res) => {
//   console.log("req.user:", req.user);
//   res.send(req.user ? `Logged in as ${req.user.username}` : "Not logged in");
// });



//session
app.use(session(sessionOptions))
app.use(flash())


//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//flash 
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
    res.locals.curUser = req.user
  next();
});

// app.get("/demo", async(req, res) => {
//   let newUser = new User({
//     email: "khan@gmail.com",
//     username: "khanoo ok"
//   })

//   let registered = await User.register(newUser, "hello")
//   res.send(registered)
//   console.log(registered)
// })


//all routs
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);



//Error handling middleware
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.render('error.ejs', { status, message });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})











// app.get("/list", async (req, res) => {
//     let listData = new Listing({
//         title: "Beautiful home in the city",
//         description: "This is a beautiful home located in the heart of the city with stunning views and modern amenities.",
//         Image: "",
//         price: 2500,
//         location: "karachi",
//         country: "pakistan"
//     })
//     await listData.save()
//     res.send("added")
// })