import axios from 'axios';
import { useState, useRef } from "react";
import Header from "../MainComponents/Header";
import SuggestedCities from "./SuggestedCities";
import Footer from "../MainComponents/Footer";
import './BrowsePage.css';
import '../weather.css';
import CityBox from '../CityBox';

export default function BrowsePage() {
    const [searchedCityData, setSearchedCityData] = useState({ weather: null, image: null });
    const [searching, setSearching] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchRef = useRef();

    async function searchCity() {
        setSearching(true);

        const inputValue = searchRef.current.value;
        const searchedCity = inputValue.trim().charAt(0).toUpperCase() + inputValue.slice(1);

        const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${searchedCity}&days=7`);
        const imageResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${searchedCity}&orientation=landscape&per_page=1`,
            {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                }
            }
        );
        console.log(weatherResponse.data);
        setSearchedCityData({
            weather: weatherResponse.data,
            image: imageResponse.data.results[0].urls.full
        });
    }

    return (
        <>
            <title>Jaber's Weather Forecast - Browse</title>

            <Header />

            <div className="search-bar">
                <span className="search-icon" onClick={searchCity}><i className="fa-solid fa-magnifying-glass fa-lg" style={{ color: "white" }}></i></span>
                <input ref={searchRef} type="text" placeholder="Search a city" className="search-input" />
            </div>
            {searching && searchedCityData.weather && <CityBox city={searchedCityData.weather} image={searchedCityData.image} />}
            {!searching && <SuggestedCities />}

            <Footer />
        </>
    );
}