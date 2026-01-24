const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/places.json');

// Initialize file if it doesn't exist
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, JSON.stringify([]));
}

const readPlaces = () => {
  const data = fs.readFileSync(DATA_PATH);
  return JSON.parse(data);
};

const writePlaces = (places) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(places, null, 2));
};

module.exports = { readPlaces, writePlaces };
