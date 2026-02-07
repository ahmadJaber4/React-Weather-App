import axios from 'axios';
import { useEffect, useState } from 'react';
import CityBox from '../CityBox';

export default function SavedContainer({ message, savedCities }) {
    const [cityData, setCityData] = useState([]);

    useEffect(() => {
        async function fetchCities() {
            const results = await Promise.all(
                savedCities.map(async (city) => {
                    const weatherRes = await axios.get(
                        `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7`
                    );

                    const imageRes = await axios.get(
                        `https://api.unsplash.com/search/photos?query=${city} city&orientation=landscape&per_page=1`,
                        {
                            headers: {
                                Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
                            }
                        }
                    );

                    return {
                        city,
                        weather: weatherRes.data,
                        image: imageRes.data.results[0]?.urls.full
                    };
                })
            );

            setCityData(results);
        }

        if (savedCities?.length) {
            fetchCities();
        }
    }, [savedCities]);

    return (
        <div className='browse-container'>
            <h3 className='container-title'>{message}</h3>

            {cityData.map(({ city, weather, image }) => (
                <CityBox
                    key={city}
                    cityWeather={weather}
                    image={image}
                />
            ))}
        </div>
    );
}