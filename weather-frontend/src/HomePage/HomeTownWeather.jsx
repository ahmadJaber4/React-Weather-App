// home town weather component

import axios from 'axios';
import { useEffect, useState } from "react";
import { createContext } from 'react';
import CurrentWeather from './CurrentWeather';
import FutureWeather from './FutureWeather';
import placeHolderImage from '../assets/image-placeholder.webp';

export const LocalWeatherCtx = createContext(); // define context to store the hometown weather

export default function HomeTownWeather() {
    // 3 states: weather, image, and city name
    const [homeTownWeather, setHomeTownWeather] = useState();
    const [cityImage, setCityImage] = useState();
    const [cityName, setCityName] = useState();

    // "currently requesting location?" state, error and loading states
    const [requestingLocation, setRequestingLocation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch hometown weather function and store it in the state
    async function getLocationWeather(city) {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7`);
        setHomeTownWeather(response.data);
    }
    // fetch city name from coordinates using reverse geocoding
    async function getCityName(lat, lon) {
        // Example using Nominatim OpenStreetMap API (no key required)
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const address = response.data.address;
        // Try to get city, town, or village
        return address.city || address.town || address.village || address.state || address.county || address.country;
    }

    // fetch hometown image and store it in the state
    async function getLocationImage(city) {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&per_page=1`,
            {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                }
            }
        );
        setCityImage(response.data.results[0].urls.full);
    }

    // on the first render, request location access and get weather data
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setRequestingLocation(false);
                    const { latitude, longitude } = position.coords;
                    try {
                        // Get city name from coordinates
                        const city = await getCityName(latitude, longitude);
                        setCityName(city);
                        await getLocationWeather(city); // get weather data for city
                    }
                    catch (err) {
                        setError(err.message);
                    }
                    finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setRequestingLocation(false);
                    setError(error.message);
                    setLoading(false);
                },
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }, []);

    // whenever cityName changes, fetch the location's image
    useEffect(() => {
        const loadImage = async () => {
            if (cityName) {
                try {
                    await getLocationImage(cityName);
                } catch (err) {
                    setCityImage(placeHolderImage);
                }
            }
        };
        loadImage();
    }, [cityName]);

    return (
        <div className="home-town-container" style={{ backgroundImage: cityImage ? `url(${cityImage})` : null }}> {/* set the background of the container to the fetched image */}
            {requestingLocation && <div className='message'>Waiting for location access...</div>} {/* requesting location access... */}
            {loading && !requestingLocation && <div className='message'>Loading data...</div>} {/* fetching weather data... */}
            {error && <div className='message'>Error: {error}</div>} {/* an error occurred */}
            {!loading && !error && homeTownWeather &&
                <LocalWeatherCtx.Provider value={homeTownWeather}> {/* passed the location's weather data as a context value to the child components */}
                    <CurrentWeather />
                    <FutureWeather />
                </LocalWeatherCtx.Provider>
            } {/* finished loading data, no errors, weather data is available */}
              {/* the use of context here is for practice purposes (not too much prop drilling) */}
        </div>
    );
}