import axios from 'axios';
import { useState, useRef } from "react";
import Header from "../MainComponents/Header";
import SuggestedCities from "./SuggestedCities";
import SearchResultContainer from './SearchResultContainer';
import CityBox from '../CityBox';
import Footer from "../MainComponents/Footer";
import './BrowsePage.css';
import '../weather.css';
import placeHolderImage from '../assets/image-placeholder.webp';

export default function BrowsePage({ savedCities, handleSave }) {
    // states to store the weather data and image of the searched city
    const [searchedCityWeather, setSearchedCityWeather] = useState();
    const [searchedCityImage, setSearchedCityImage] = useState();

    // state to determine if the user is in search mode (searched for a city)
    const [searching, setSearching] = useState(false);

    // error and loading states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ref to store the value entered in the search bar
    const searchRef = useRef();

    // function for performing the search when clicking ENTER on the keyboard
    function handleInputKeyDown(e) {
        if (e.key === "Enter") {
            searchCity();
        }
    }

    // function for coming out of searching mode when the search bar is empty (re-display famous cities)
    function handleInputChange(e) {
        if (e.target.value.trim() === "") {
            // turn searching off and restart data
            setSearching(false);
            setSearchedCityWeather();
            setSearchedCityImage();
            setError(null);
        }
    }

    // function to start searching mode (when clicking enter or the search icon)
    async function searchCity() {
        // turn searching on and restart data before fetching
        setSearching(true);
        setSearchedCityWeather(null);
        setLoading(true);
        setError(null);

        const inputValue = searchRef.current.value.trim(); // store the search input (trimmed)
        const searchedCity = inputValue.charAt(0).toUpperCase() + inputValue.slice(1); // make the 1st letter capital
        let weatherResponse;
        // fetch weather data for the searched city and store it in the state
        try {
            weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${searchedCity}&days=7`);
            setSearchedCityWeather(weatherResponse.data);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }

        // fetch image for the searched city and store it in the state
        try {
            const fetchedLocation = weatherResponse.data.location;
            const imageResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${`${fetchedLocation.name}, ${fetchedLocation.country}`}&orientation=landscape&per_page=1`,
                {
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                    }
                }
            );
            setSearchedCityImage(imageResponse.data.results[0].urls.full);
        }
        // setting the image state to a default placeholder in case of an error
        catch (err) {
            setSearchedCityImage(placeHolderImage);
        }
    }

    return (
        <>
            <title>Weather Forecast - Browse</title>

            <Header savedCities={savedCities} />

            <div className="search-bar">
                <span className="search-icon" onClick={searchCity}><i className="fa-solid fa-magnifying-glass fa-lg" style={{ color: "white" }}></i></span>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search a city"
                    className="search-input"
                    onChange={handleInputChange} // check if it becomes empty
                    onKeyDown={handleInputKeyDown} // start the search when pressing ENTER
                />
            </div>

            {/* display the search result when in searching mode, famous cities otherwise */}
            {searching ?
                <SearchResultContainer message={loading ? "Loading..." : error ? "No Results" : "Search Results"}> {/* set the container title based on the state */}
                    {/* make sure the weather data is available */}
                    {searchedCityWeather &&
                        <CityBox
                            cityWeather={searchedCityWeather} // searched city's weather data
                            image={searchedCityImage} // searched city's image 
                            handleSave={handleSave} // the function to save/unsave (defined in App.jsx)
                            saved={savedCities.includes(searchedCityWeather.location.name)} /> // true/false, is it saved?
                    }
                </SearchResultContainer>
                :
                <SuggestedCities handleSave={handleSave} savedCities={savedCities} />
            }

            <Footer />
        </>
    );
}