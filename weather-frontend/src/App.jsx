import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import HomePage from './HomePage/HomePage'
import BrowsePage from './BrowsePage/BrowsePage'
import SavedPage from './SavedPage/SavedPage'

function App() {
  const [savedCities, setSavedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadSavedCities() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/places');
      setSavedCities(response.data);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleSave(cityName) {
    if (!savedCities.includes(cityName)) {
      try {
        await axios.post('http://localhost:5000/api/places', {
          name: cityName
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    else{
      try{
        await axios.delete(`http://localhost:5000/api/places/${cityName}`);
      }
      catch (err){
        console.log(err);
      }
    }

    await loadSavedCities();
  }

  useEffect(() => {
    loadSavedCities();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage savedCities={savedCities}/>} />
        <Route path="/browse" element={<BrowsePage savedCities={savedCities} handleSave={handleSave} />} />
        <Route path="/saved" element={<SavedPage savedCities={savedCities} loadSavedCities={loadSavedCities} handleSave={handleSave} loading={loading} error={error} />} />
      </Routes>
    </>
  )
}

export default App
