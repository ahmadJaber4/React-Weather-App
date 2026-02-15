// current weather component, containing the hometown's current weather conditions

import { useContext } from "react";
import { LocalWeatherCtx } from "./HomeTownWeather";

export default function CurrentWeather() {
    const homeTownWeather = useContext(LocalWeatherCtx); // store the context value (homeTownWeather) passed from HomeTownWeather.jsx 

    return (
        <div className="name-and-current-data">
            {/* city and country name */}
            <div className="city-country">
                <i className="fa-solid fa-location-dot fa-xl"></i>
                <div>
                    {homeTownWeather.location.name}, {homeTownWeather.location.country}
                </div>
            </div>

            {/* current weather conditions (text, temp, wind, humidity) */}
            <div className="current-weather">
                <div className="info">
                    <img className="state-icon" src={homeTownWeather.current.condition.icon} alt="" />
                    {homeTownWeather.current.condition.text}
                </div>
                <div className="info" title="Temperature">
                    <i className="fa-solid fa-temperature-half fa-xl" style={{ color: "rgb(255, 193, 188)" }}></i>
                    {homeTownWeather.current.temp_c} &deg;C
                </div>
                <div className="info" title="Wind speed">
                    <i className="fa-solid fa-wind fa-xl"></i>
                    {homeTownWeather.current.wind_kph} km/h
                </div>
                <div className="info" title="Humidity">
                    <i className="fa-solid fa-droplet fa-xl" style={{ color: "rgb(77, 204, 255)" }}></i>
                    {homeTownWeather.current.humidity}%
                </div>
            </div>
        </div>
    );
}