const { readPlaces, writePlaces } = require('../config/db');

const getAllPlaces = () => readPlaces();

const addPlace = (placeName) => {
  const places = readPlaces();
  if (!places.includes(placeName)) {
    places.push(placeName);
    writePlaces(places);
  }
  return places;
};

const deletePlace = (placeName) => {
  let places = readPlaces();
  places = places.filter(p => p !== placeName);
  writePlaces(places);
  return places;
};

module.exports = { getAllPlaces, addPlace, deletePlace };
