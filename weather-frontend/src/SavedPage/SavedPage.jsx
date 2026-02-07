import axios from 'axios';
import { useEffect } from "react";
import Header from "../MainComponents/Header";
import { useState } from "react";

export default function SavedPage(){
    const [savedCities, setSavedCities] = useState([]);

    useEffect(()=>{
        const loadSavedCities = async () => {
            const response = await axios.get('http://localhost:5000/api/places');
            console.log(response.data);
            setSavedCities(response.data);
        }
        
        loadSavedCities();
    }, []);

    return(
        <>
            <title>Jaber's Weather Forecast - Saved</title>

            <Header/>
            <p>Saved</p>
        </>
    );
}