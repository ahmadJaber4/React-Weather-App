import axios from 'axios';
import { useEffect, useState } from "react";
import { famousCities } from "../famousCities";
import placeHolderImage from '../assets/image-placeholder.webp';
import CityBox from '../CityBox';

export default function SuggestedCities({handleSave, savedCities}) {
    const [suggestedCitiesWeather, setSuggestedCitiesWeather] = useState([]);
    const [suggestedCitiesImages, setSuggestedCitiesImages] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    let initialWeatherArray = [];
    let initialImagesArray = [];

    async function getCityWeather(city) {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7`);
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

        // pick a crisp but optimized variant. start with `raw` so we can request a width close to our layout size.
        const srcObj = response.data.results[0].urls;
        // prefer raw/regular sized image and append params to control width and quality
        const base = srcObj.raw || srcObj.regular || srcObj.full || srcObj.small;
        const optimizedUrl = `${base}&w=1600&q=80&auto=format&fit=crop`;

        // kick off async decode (non-blocking) so the browser can prepare the image early
        const img = new Image();
        img.src = optimizedUrl;
        if (img.decode) img.decode().catch(() => {});

        initialImagesArray.push(optimizedUrl);
    }

    useEffect(() => {
        // IIFE (Immedietly Invoked Function Expression)
        setLoading(true);
        (async () => {
            for (const city of famousCities) {
                try {
                    await getCityWeather(city);
                }
                catch (error) {
                    setError(error.message);
                }
            }
            
            setLoading(false);
            setSuggestedCitiesWeather(initialWeatherArray);
        })();
    }, []);

    useEffect(() => {
        if (suggestedCitiesWeather.length > 0) {
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

                setSuggestedCitiesImages(initialImagesArray);
            })();
        }
    }, [suggestedCitiesWeather]);

    return (
        <div className="cities-container">
            <h3 className="container-title">{loading?'Loading...':error?'An Error Occurred':'Famous Cities Across The World'}</h3>
            {suggestedCitiesWeather.map((cityWeather, index) => (
                <CityBox
                    key={cityWeather.location.name}
                    cityWeather={cityWeather}
                    image={suggestedCitiesImages[index]}
                    handleSave={handleSave}
                    saved={savedCities.includes(cityWeather.location.name)}
                />
            ))}
        </div>
    );
}