const express = require('express');
const router = express.Router();
const { getPlaces, savePlace, removePlace } = require('../controllers/placesController');

router.get('/', getPlaces);           // Load saved places
router.post('/', savePlace);          // Save a new place
router.delete('/:name', removePlace); // Delete a place by name

module.exports = router;
