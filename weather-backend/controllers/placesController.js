const Place = require('../models/placeModel');

const getPlaces = (req, res) => {
  const places = Place.getAllPlaces();
  res.json(places);
};

const savePlace = (req, res) => {
  const newPlace = Place.addPlace(req.body);
  res.status(201).json(newPlace);
};

const removePlace = (req, res) => {
  const id = parseInt(req.params.id);
  const places = Place.deletePlace(id);
  res.json(places);
};

module.exports = { getPlaces, savePlace, removePlace };
