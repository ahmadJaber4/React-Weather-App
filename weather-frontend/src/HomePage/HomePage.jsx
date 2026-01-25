import axios from 'axios';
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import './HomePage.css';
import HomeTownWeather from './HomeTownWeather';

export default function HomePage() {
    const [homeTownWeather, setHomeTownWeather] = useState();
    const [cityImage, setCityImage] = useState();

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
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getLocation(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }, []);

    useEffect(() => {
        if (homeTownWeather) {
            getImage(homeTownWeather.location.name);
        }
    }, [homeTownWeather]);

    return (
        <>
            <title>Jaber's Weather Forecast - Home</title>

            <Header />
            <HomeTownWeather homeTownWeather={homeTownWeather} cityImage={cityImage} />
        </>
    );
}