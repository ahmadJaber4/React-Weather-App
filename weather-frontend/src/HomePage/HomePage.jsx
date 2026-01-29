import axios from 'axios';
import { useEffect, useState } from "react";
import Header from "../MainComponents/Header";
import HomeTownWeather from './HomeTownWeather';
import WebsiteBrief from './WebsiteBrief';
import Footer from '../MainComponents/Footer';
import placeHolderImage from '../assets/image-placeholder.webp';
import './HomePage.css';

export default function HomePage() {
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
                }
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
        <>
            <title>Jaber's Weather Forecast - Home</title>

            <Header />
            {requestingLocation && <div className='message'>Waiting for location access...</div>}
            {loading && !requestingLocation && <div className='message'>Loading data...</div>}
            {error && <div className='message'>Error: {error}</div>}
            {!loading && !error &&
                <HomeTownWeather homeTownWeather={homeTownWeather} cityImage={cityImage} />
            }
            <WebsiteBrief />
            <Footer/>
        </>
    );
}