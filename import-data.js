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

  console.log('Trying to connect to database\n')
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connection established\n')

  // await importJSON()
  // console.log('Import successful\n')
  
  //getLocationbyID('63924e75df0409fce6781587')

  //getLocationsByFilmName("Alice NEVERS")

  //deleteLocationById('63924e75df0409fce6781587')
  //getLocationbyID('63924e75df0409fce6781587')
  
  // let updatedLocation = {
  //   filmName: "Old Old Movie!",
  //   address: "ESILV",
  //   year:1000
  // }
  // updateLocation('63924e77df0409fce6781f1f', updatedLocation)
  // getLocationbyID('63924e77df0409fce6781f1f')

  // let newLocation = new Location({
  //   filmName: "I made my very own movie",
  //   address: "Somewhere in the north pole",
  //   year: 0
  // })
  // addLocation(newLocation)
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

function getLocationbyID(id) {
  Location.findById(id).then(film => console.log(film+"\n"))
}
function getLocationsByFilmName(name) {
  Location.find({filmName : name}).then(films => films.forEach(film => console.log(film+"\n")))
  // console.log("\n")
}
function deleteLocationByID(id) {
  Location.findOneAndDelete({_id:id}).then(console.log('The location was successfully deleted!\n'))
}
function updateLocation(id,update){
  Location.updateOne({_id: id}, {$set:update}).then(console.log('The location was successfully updated'))
}
function addLocation(location) {
  try{
      location.save();
      console.log("The location was successfully added\n")
  } catch (e) {
      console.log("Error : the location couldn't be added\n")
  }
}

main()