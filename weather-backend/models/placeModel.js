const { readPlaces, writePlaces } = require('../config/db');

const getAllPlaces = () => readPlaces();

const addPlace = (place) => {
  const places = readPlaces();
  place.id = Date.now(); // simple unique ID
  places.push(place);
  writePlaces(places);
  return place;
};

const deletePlace = (id) => {
  let places = readPlaces();
  places = places.filter(p => p.id !== id);
  writePlaces(places);
  return places;
};

module.exports = { getAllPlaces, addPlace, deletePlace };
