import axios from 'axios';
import { useState, useEffect } from "react";
import Header from "../MainComponents/Header";
import SavedContainer from './SavedContainer';

export default function SavedPage() {
    const [savedCities, setSavedCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSavedCities = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:5000/api/places');
                console.log(response.data);
                setSavedCities(response.data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        loadSavedCities();
    }, []);

    return (
        <>
            <title>Jaber's Weather Forecast - Saved</title>

            <Header />
            <SavedContainer message={loading ? 'Loading...' : error ? 'An Error Occured' : 'Saved Cities'} savedCities={savedCities} />
        </>
    );
}