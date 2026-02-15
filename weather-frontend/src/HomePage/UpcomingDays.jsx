// upcoming days component, displays the upcoming days' forecast of the hometown

import { useContext } from 'react';
import { LocalWeatherCtx } from "./HomeTownWeather";
import { getUpcomingDaysData } from '../utils';
import sunsetIcon from '../assets/sunset.png';
import sunriseIcon from '../assets/sunrise.png';

export default function UpcomingDays() {
    const homeTownWeather = useContext(LocalWeatherCtx); // store the context value (homeTownWeather) passed from HomeTownWeather.jsx
    const upcomingDaysData = getUpcomingDaysData(homeTownWeather); // store the upcoming days' (6) weather conditions using the function 

    return (
        <div className="upcoming-container">
            <p className="upcoming-days-text">6-Day Forecast</p>

            {/* display the next 6 days' conditions (date, icon, highest and lowest temp, sunrise and sunset) */}
            <div className="upcoming-days-data">
                {upcomingDaysData.map((day) => {
                    return (
                        <div key={day.date} className="day-data">
                            <span style={{ fontWeight: "600" }}>{day.date}</span>
                            <img src={day.day.condition.icon} alt="" className='weather-icon'/>
                            <span style={{ fontSize: "0.8em" }} title='Highest & lowest temp'>H: {day.day.maxtemp_c} &deg;C &nbsp;&nbsp; L: {day.day.mintemp_c} &deg;C </span>
                            <div className='sunrise-sunset'>
                                <span className='sunrise' title='Sunrise'><img src={sunriseIcon} /> {day.astro.sunrise}</span>
                                <span className='sunset' title='Sunset'><img src={sunsetIcon} /> {day.astro.sunset}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}