// suggested cities component, a container that displays the data for a bunch of famous cities across the world

import axios from 'axios';
import { useEffect, useState } from "react";
import { famousCities } from "../famousCities";
import CityBox from '../CityBox';
import placeHolderImage from '../assets/image-placeholder.webp';

export default function SuggestedCities({handleSave, savedCities}) {
    // 2 array states to store weather data for each famous city and the images for the cities
    const [suggestedCitiesWeather, setSuggestedCitiesWeather] = useState([]);
    const [suggestedCitiesImages, setSuggestedCitiesImages] = useState([]);

    // error and loading states
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // initial arrays to store weather data and images 
    let initialWeatherArray = [];
    let initialImagesArray = [];

    // function to fetch weather data of a famous city and adding the result to the initial array
    async function getCityWeather(city) {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7`);
        initialWeatherArray.push(response.data);
    }

    // function to fetch image of a famous city and adding the result to the initial array
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

    // on the first render, fetch weather for each famous city (function above) and set the state 
    useEffect(() => {
        // IIFE (Immedietly Invoked Function Expression)
        setLoading(true);

        // function to iterate through the famous cities array
        (async () => {
            for (const city of famousCities) {
                try {
                    await getCityWeather(city); // fetch weather and push to the intitial array 
                }
                catch (error) {
                    setError(error.message);
                }
            }
            
            setLoading(false);
            setSuggestedCitiesWeather(initialWeatherArray); // set the state to the initial weather array (containes weather data for each city)
        })(); // immedietly invoke the function
    }, []);

    // on the first render, fetch images for each famous city (function above) and set the state
    useEffect(() => {
        if (suggestedCitiesWeather.length > 0) {
            // reset images array and populate sequentially, then set state
            initialImagesArray = [];

            // function to iterate through the fetched weather data array 
            (async () => {
                for (const city of suggestedCitiesWeather) {
                    try {
                        await getCityImage(city.location.name); // fetch image and push to the initial array
                    }
                    catch (error) {
                        // fallback to placeholder if image fetch fails
                        initialImagesArray.push(placeHolderImage);
                    }
                }

                setSuggestedCitiesImages(initialImagesArray); // set the state to the initial images array (containes image for each city)
            })(); // immedietly invoke the function
        }
    }, [suggestedCitiesWeather]);

    return (
        <div className="cities-container">
            <h3 className="container-title">{loading?'Loading...':error?'An Error Occurred':'Famous Cities Across The World'}</h3> {/* set the container title based on the state */}

            {/* display each city's weather data via a city box */}
            {suggestedCitiesWeather.map((cityWeather, index) => (
                <CityBox
                    key={cityWeather.location.name}
                    cityWeather={cityWeather} // searched city's weather data
                    image={suggestedCitiesImages[index]} // searched city's image
                    handleSave={handleSave} // the function to save/unsave (defined in App.jsx)
                    saved={savedCities.includes(cityWeather.location.name)} // true/false, is it saved?
                />
            ))}
        </div>
    );
}