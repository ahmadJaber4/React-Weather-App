const Place = require('../models/placeModel');

const getPlaces = (req, res) => {
  const places = Place.getAllPlaces();
  res.json(places);
};

const savePlace = (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Place name is required and must be a string.' });
  }
  const places = Place.addPlace(name);
  res.status(201).json(places);
};

const removePlace = (req, res) => {
  const name = req.params.name;
  const places = Place.deletePlace(name);
  res.json(places);
};

module.exports = { getPlaces, savePlace, removePlace };
