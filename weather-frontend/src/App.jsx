import axios from 'axios';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import HomePage from './HomePage/HomePage'
import BrowsePage from './BrowsePage/BrowsePage'
import SavedPage from './SavedPage/SavedPage'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {

  // state for the saved cities array incl. loading and error states for fetching
  const [savedCities, setSavedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load saved cities function
  async function loadSavedCities() {
    setLoading(true);
    setError(null);

    // get saved cities from /api/places and store it in the saved cities state
    try {
      const response = await axios.get(`${API_URL}/api/places`);
      setSavedCities(response.data);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  // handle save/unsave function
  async function handleSave(cityName) {
    // save/unsave is clicked, check if the city isn't already saved (save it with POST), or if it's saved (unsave it with DELETE) 
    if (!savedCities.includes(cityName)) {
      try {
        await axios.post(`${API_URL}/api/places`, {
          name: cityName
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    else{
      try{
        await axios.delete(`${API_URL}/api/places/${cityName}`);
      }
      catch (err){
        console.log(err);
      }
    }

    await loadSavedCities(); // re-fetch to get the saved cities after saving/unsaving to update the page(s)
  }

  // fetch saved cities on the first render []
  useEffect(() => {
    loadSavedCities();
  }, []);

  return (
    <>
      {/* create routes for the 3 pages (Home, Browse, Saved) */}
      <Routes>
        <Route index element={<HomePage savedCities={savedCities}/>} />
        <Route path="/browse" element={<BrowsePage savedCities={savedCities} handleSave={handleSave} />} />
        <Route path="/saved" element={<SavedPage savedCities={savedCities} loadSavedCities={loadSavedCities} handleSave={handleSave} loading={loading} error={error} />} />
      </Routes>
    </>
  )
}

export default App
