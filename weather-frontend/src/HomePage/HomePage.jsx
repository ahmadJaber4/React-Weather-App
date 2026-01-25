import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from 'axios';

export default function HomePage() {
    const [homeTownWeather, setHomeTownWeather] = useState();

    async function getLocation(lat, lon){
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${lat},${lon}&days=7`)
        setHomeTownWeather(response.data);
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

    return (
        <>
            <title>Jaber's Weather Forecast - Home</title>

            <Header />
            <p>Home</p>
        </>
    );
}