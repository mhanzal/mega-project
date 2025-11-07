const mongoose = require('mongoose');
const initData = require('../init/data.js'); 
const Listing = require("../models/listening.js");
const sampleListing = require('../init/data.js'); // can stay, no problem

const MONGO_URL = 'mongodb://127.0.0.1:27017/mega'

main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

let initDB = async () => {
    await Listing.deleteMany({});
    initData.data = sampleListing.map((obj) => ({...obj, owner: "6901e6b1ee2077482dfda281"}))
    await Listing.insertMany(initData.data);
    console.log("Data Imported");
}

initDB()
