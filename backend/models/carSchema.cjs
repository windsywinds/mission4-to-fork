//build a mongoose schema for the car here

//it needs to have these value names, you would also be able to refer to ./data/seed.json because it needs to match that in order for the front end to call it. I've started one below because it's needed for the addEntry function for mongoose.

//imgUrl
//carType
//carColor
//carBrand
//carPrice

const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    carColor: { type: String, required: true },
    carBrand: { type: String, required: true },
});

module.exports = carSchema;
