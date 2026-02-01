import axios from 'axios';
import { useEffect, useState } from "react";
import { famousCities } from "../famousCities";
import placeHolderImage from '../assets/image-placeholder.webp';

export default function SuggestedCities() {
    const [suggestedCitiesWeather, setSuggestedCitiesWeather] = useState([]);
    const [suggestedCitiesImages, setSuggestedCitiesImages] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    let initialWeatherArray = [];
    let initialImagesArray = []

    async function getCityWeather(lat, lon) {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${lat},${lon}&days=7`);
        initialWeatherArray.push(response.data);
    }

    async function getCityImage(city) {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&per_page=1`,
            {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                }
            }
        );
        initialImagesArray.push(response.data.results[0].urls.full);
    }

    useEffect(() => {
        // IIFE (Immedietly Invoked Function Expression)
        (async () => {
            for (const city of famousCities) {
                try {
                    await getCityWeather(city.lat, city.lon);
                }
                catch (error) {
                    setError(error.message);
                }
                finally {
                    setLoading(false);
                }
            }

            console.log(initialWeatherArray);
            setSuggestedCitiesWeather(initialWeatherArray);
        })();
    }, []);

    useEffect(() => {
        if(suggestedCitiesWeather.length > 0) {
            // reset images array and populate sequentially, then set state
            initialImagesArray = [];

            (async () => {
                for (const city of suggestedCitiesWeather) {
                    try {
                        await getCityImage(city.location.name);
                    }
                    catch (error) {
                        // fallback to placeholder if image fetch fails
                        initialImagesArray.push(placeHolderImage);
                    }
                }

                console.log(initialImagesArray);
                setSuggestedCitiesImages(initialImagesArray);
            })();
        }
    }, [suggestedCitiesWeather]);

    return (
        <div className="suggested-container">
            <h3 className="suggested-text">Suggested Places</h3>

            {suggestedCitiesWeather.map((city,index) => {
                return (
                    <div key={city.location.name} className='suggested-city-box' style={{backgroundImage: `url(${suggestedCitiesImages[index]})`}}>
                        <div className='suggested-city-country'>{city.location.name}, {city.location.country}</div>
                    </div>
                );
            })}
        </div>
    );
}