import axios from 'axios';
import { useEffect, useState } from "react";
import { createContext } from 'react';
import CurrentWeather from './CurrentWeather';
import FutureWeather from './FutureWeather';
import placeHolderImage from '../assets/image-placeholder.webp';

export const LocalWeatherCtx = createContext();

export default function HomeTownWeather() {
    const [homeTownWeather, setHomeTownWeather] = useState();
    const [cityImage, setCityImage] = useState();

    const [requestingLocation, setRequestingLocation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getLocation(lat, lon) {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${lat},${lon}&days=7`);
        setHomeTownWeather(response.data);
    }

    async function getImage(city) {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&per_page=1`,
            {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                }
            }
        );
        setCityImage(response.data.results[0].urls.full);
    }

    useEffect(() => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        setRequestingLocation(false);
                        const { latitude, longitude } = position.coords;
                        console.log(latitude, longitude);
                        try {
                            await getLocation(latitude, longitude);
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

    useEffect(() => {
        const loadImage = async () => {
            if (homeTownWeather) {
                try {
                    await getImage(homeTownWeather.location.name);
                }
                catch (err) {
                    setCityImage(placeHolderImage)
                }
            }
        };

        loadImage();
    }, [homeTownWeather]);

    return (
        <div className="home-town-container" style={{ backgroundImage: cityImage ? `url(${cityImage})` : null }}>
            {requestingLocation && <div className='message'>Waiting for location access...</div>}
            {loading && !requestingLocation && <div className='message'>Loading data...</div>}
            {error && <div className='message'>Error: {error}</div>}
            {!loading && !error && homeTownWeather &&
                <LocalWeatherCtx.Provider value={homeTownWeather}>
                    <CurrentWeather />
                    <FutureWeather />
                </LocalWeatherCtx.Provider>
            }
        </div>
    );
}