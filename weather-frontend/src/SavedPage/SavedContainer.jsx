// saved container component, the container that contains the saved cities (in the saved tab)

import axios from 'axios';
import { useEffect, useState } from 'react';
import CityBox from '../CityBox';

export default function SavedContainer({ message, savedCities, handleSave }) {
    // state to hold the data for all saved cities
    const [cityData, setCityData] = useState([]);

    // on the first render and whenever saved cities change, fetch the data for the saved cities and store it in the state
    useEffect(() => {
        // function to fetch weather and image for all saved cities and store them in saved cities state
        async function fetchCities() {
            const results = await Promise.all(
                savedCities.map(async (city) => {
                    // fetch weather
                    const weatherRes = await axios.get(
                        `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7`
                    );

                    // fetch image
                    const imageRes = await axios.get(
                        `https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&per_page=1`,
                        {
                            headers: {
                                Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                            }
                        }
                    );

                    // return object of name, weather, image
                    return {
                        city,
                        weather: weatherRes.data,
                        image: imageRes.data.results[0]?.urls.full
                    };
                })
            );

            // set the state
            setCityData(results);
        }

        // run the function
        fetchCities();
    }, [savedCities]);

    return (
        <div className='cities-container'>
            <h3 className='container-title'>{message}</h3>

            {/* sequentially rendering the saved cities data */}
            {cityData.map(({ city, weather, image }) => (
                <CityBox
                    key={city}
                    cityWeather={weather} // city weather
                    image={image} // city image
                    handleSave={handleSave} // save/unsave function
                    saved={true} // saved? always true (in the saved tab) 
                />
            ))}
        </div>
    );
}