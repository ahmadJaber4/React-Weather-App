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
            const response = await axios.get('http://localhost:5000/api/places');
            console.log(response.data);
            setSavedCities(response.data);
        }

        try {
            loadSavedCities();
        }
        catch (err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }

    }, []);

    return (
        <>
            <title>Jaber's Weather Forecast - Saved</title>

            <Header />
            <SavedContainer message={loading?'Loading...':error?'An Error Occured':'Saved Cities'} savedCities={savedCities}/>
        </>
    );
}