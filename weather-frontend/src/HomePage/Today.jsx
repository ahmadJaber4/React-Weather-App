// the today component, displays today's upcoming hourly forecast of the hometown 

import { useContext } from "react";
import { LocalWeatherCtx } from "./HomeTownWeather";
import { getUpcomingHoursData } from "../utils";

export default function Today() {
    const homeTownWeather = useContext(LocalWeatherCtx); // store the context value (homeTownWeather) passed from HomeTownWeather.jsx
    const upcomingHoursData = getUpcomingHoursData(homeTownWeather); // store the upcoming hours' weather data using the function

    return (
        <div className="today-container">
            <p className="today-text">Today</p>

            {/* display upcoming hours conditions (time, icon, temp, wind, humidity) */}
            <div className="upcoming-hours-data">
                {upcomingHoursData.map((hour) => {
                    return (
                        <div key={hour.time} className="hour-data">
                            <span style={{ fontWeight: "600" }}>{(hour.time).slice(-5)}</span>
                            <img src={hour.condition.icon} alt="" />
                            <span title='Temperature'>{hour.temp_c} &deg;C</span>
                            <div className='wind-humidity'>
                                <span><i className="fa-solid fa-wind fa-sm"></i>{hour.wind_mph} km/h</span>
                                <span><i className="fa-solid fa-droplet fa-sm" style={{ color: "rgb(77, 204, 255)" }}></i>{hour.humidity}%</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}