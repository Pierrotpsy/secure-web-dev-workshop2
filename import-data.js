const mongoose = require('mongoose');
require('dotenv').config()

const {Schema} = mongoose;

const filmSchema = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: String,
    geolocation:{
      coordinates:[Number],
      type: {type :String},
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});

const Location = mongoose.model("Locations",filmSchema)

const filmingLocations = require('./lieux-de-tournage-a-paris.json')

async function main() {

  console.log('Trying to connect to database')
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connection established')
}



main()