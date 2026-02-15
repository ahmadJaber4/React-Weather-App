// home town weather component

import axios from 'axios';
import { useEffect, useState } from "react";
import { createContext } from 'react';
import CurrentWeather from './CurrentWeather';
import FutureWeather from './FutureWeather';
import placeHolderImage from '../assets/image-placeholder.webp';

export const LocalWeatherCtx = createContext(); // define context to store the hometown weather

export default function HomeTownWeather() {
    // 2 states to store the fetched hometown weather and its image
    const [homeTownWeather, setHomeTownWeather] = useState();
    const [cityImage, setCityImage] = useState();

    // "currently requesting location?" state, error and loading states
    const [requestingLocation, setRequestingLocation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch hometown weather function and store it in the state
    async function getLocationWeather(lat, lon) {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${lat},${lon}&days=7`);
        setHomeTownWeather(response.data);
    }

    // fetch hometown image and store it in the state
    async function getLocationImage(city) {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=Amman&orientation=landscape&per_page=1`,
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
                // geolocation is supported by the browser  
                navigator.geolocation.getCurrentPosition(
                    // promise resolved
                    async (position) => {
                        setRequestingLocation(false);
                        const { latitude, longitude } = position.coords; // set latitude and longitude 
                        try {
                            await getLocationWeather(latitude, longitude); // get weather data
                        }
                        catch (err) {
                            setError(err.message);
                        }
                        finally {
                            setLoading(false);
                        }
                    },
                    // promise failed
                    (error) => {
                        console.error("Error getting location:", error);
                        setRequestingLocation(false);
                        setError(error.message);
                        setLoading(false);
                    },
                );
            }
            // geolocation is not supported by the browser 
            else {
                alert("Geolocation is not supported by your browser.");
            }
    }, []);

    // on the first render or whenever the location's weather data changes, fetch the location's image
    useEffect(() => {
        const loadImage = async () => {
            if (homeTownWeather) {
                // weather data is available 
                try {
                    await getLocationImage(homeTownWeather.location.name);
                }
                // if the image failed to fetch or doesn't exist, set it to a default placeholder image
                catch (err) {
                    setCityImage(placeHolderImage)
                }
            }
        };

        loadImage();
    }, [homeTownWeather]);

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