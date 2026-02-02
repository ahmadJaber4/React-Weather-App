import axios from 'axios';
import { useEffect, useState } from "react";
import { famousCities } from "../famousCities";
import { getUpcomingDaysData, getUpcomingHoursData } from '../utils';
import placeHolderImage from '../assets/image-placeholder.webp';

export default function SuggestedCities() {
    const [suggestedCitiesWeather, setSuggestedCitiesWeather] = useState([]);
    const [suggestedCitiesImages, setSuggestedCitiesImages] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    let initialWeatherArray = [];
    let initialImagesArray = [];

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

                console.log(initialImagesArray);
                setSuggestedCitiesImages(initialImagesArray);
            })();
        }
    }, [suggestedCitiesWeather]);

    return (
        <div className="suggested-container">
            <h3 className="suggested-text">Famous Cities Across The World</h3>

            {suggestedCitiesWeather.map((city, index) => {
                const upcomingHoursData = getUpcomingHoursData(city);
                const upcomingDaysData = getUpcomingDaysData(city);

                return (
                    <div key={city.location.name} className='suggested-city-box' style={{ backgroundImage: `url(${suggestedCitiesImages[index]})` }}>
                        <div className='suggested-name-and-current'>
                            <div className='suggested-city-country'>{city.location.name}, {city.location.country}</div>
                            <div className='suggested-current-weather'>
                                <div className="info">
                                    <img className="state-icon" src={city.current.condition.icon} alt="" />
                                    {city.current.condition.text}
                                </div>
                                <div className="info" title="Temperature">
                                    <i className="fa-solid fa-temperature-half fa-xl" style={{ color: "rgb(255, 193, 188)" }}></i>
                                    {city.current.temp_c} &deg;C
                                </div>
                                <div className="info" title="Wind speed">
                                    <i className="fa-solid fa-wind fa-xl"></i>
                                    {city.current.wind_kph} km/h
                                </div>
                                <div className="info" title="Humidity">
                                    <i className="fa-solid fa-droplet fa-xl" style={{ color: "rgb(77, 204, 255)" }}></i>
                                    {city.current.humidity}%
                                </div>
                            </div>
                        </div>

                        <div className='future-data'>
                            <div className='today-container'>
                                <p className="today-text">Today</p>
                                <div className="upcoming-hours-data">
                                    {upcomingHoursData.map((hour) => {
                                        return (
                                            <div key={hour.time} className="hour-data">
                                                <span style={{ fontWeight: "600" }}>{(hour.time).slice(-5)}</span>
                                                <img src={hour.condition.icon} alt="" />
                                                <span title='Temperature'>{hour.temp_c} &deg;C</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='upcoming-container'>
                                <p className="upcoming-days-text">6-Day Forecast</p>
                                <div className="upcoming-days-data">
                                    {upcomingDaysData.map((day) => {
                                        return (
                                            <div key={day.date} className="day-data">
                                                <span style={{ fontWeight: "600" }}>{day.date}</span>
                                                <img src={day.day.condition.icon} alt="" />
                                                <span style={{ fontSize: "0.8em" }} title='Highest & lowest temp'>H: {day.day.maxtemp_c} &deg;C &nbsp;&nbsp; L: {day.day.mintemp_c} &deg;C </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}