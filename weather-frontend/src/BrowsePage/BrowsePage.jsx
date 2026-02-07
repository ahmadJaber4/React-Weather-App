import axios from 'axios';
import { useState, useRef } from "react";
import Header from "../MainComponents/Header";
import SuggestedCities from "./SuggestedCities";
import SearchResultContainer from './SearchResultContainer';
import Footer from "../MainComponents/Footer";
import './BrowsePage.css';
import '../weather.css';
import CityBox from '../CityBox';
import placeHolderImage from '../assets/image-placeholder.webp';

export default function BrowsePage() {
    const [searchedCityWeather, setSearchedCityWeather] = useState();
    const [searchedCityImage, setSearchedCityImage] = useState();
    const [searching, setSearching] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchRef = useRef();

    async function searchCity() {
        setSearching(true);
        setSearchedCityWeather(null);
        setLoading(true);
        setError(null);

        const inputValue = searchRef.current.value.trim();
        const searchedCity = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

        try {
            const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${searchedCity}&days=7`);
            setSearchedCityWeather(weatherResponse.data);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }

        try {
            const imageResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${searchedCity} city&orientation=landscape&per_page=1`,
                {
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                    }
                }
            );
            setSearchedCityImage(imageResponse.data.results[0].urls.full);
        }
        catch (err) {
            setSearchedCityImage(placeHolderImage);
        }
    }

    async function savePlace(cityName){
        await axios.post('http://localhost:5000/api/places',{
            name: cityName
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

            {searching ?
                <SearchResultContainer message={loading ? "Loading..." : error ? "No Results" : "Search Results"}>
                    {searchedCityWeather &&
                        <CityBox city={searchedCityWeather} image={searchedCityImage} savePlace={savePlace}/>}
                </SearchResultContainer>
                : <SuggestedCities savePlace={savePlace}/>}

            <Footer />
        </>
    );
}