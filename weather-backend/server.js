const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

app.get("/", (req, res) => {
  res.send("Weather API is running 🚀");
});

});
