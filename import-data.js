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

  await importJSON()
  console.log('Import successful')
  
  console.log('Done!')
}

async function importJSON() {
  for (let filmingLocation of filmingLocations) {
    let location = new Location({
        filmType: filmingLocation.fields.type_tournage,
        filmProducerName: filmingLocation.fields.nom_producteur,
        endDate: Date(filmingLocation.fields.date_fin),
        filmName: filmingLocation.fields.nom_tournage,
        district: filmingLocation.fields.ardt_lieu,
        geolocation: filmingLocation.fields.geo_shape,
        sourceLocationId: filmingLocation.fields.id_lieu,
        filmDirectorName: filmingLocation.fields. nom_realisateur,
        address: filmingLocation.fields.adresse_lieu,
        startDate: Date(filmingLocation.fields.date_debut),
        year: filmingLocation.fields.annee_tournage
    });
    location.save();
  }
}

main()