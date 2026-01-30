import { useContext } from 'react';
import sunsetIcon from '../assets/sunset.png';
import sunriseIcon from '../assets/sunrise.png';
import { LocalWeatherCtx } from "./HomeTownWeather";

export default function UpcomingDays() {
    const homeTownWeather = useContext(LocalWeatherCtx);
    let upcomingDaysData = homeTownWeather ? homeTownWeather.forecast.forecastday.slice(1) : [];

    return (
        <div className="upcoming-container">
            <p className="upcoming-days-text">6-Day Forecast</p>
            <div className="upcoming-days-data">
                {upcomingDaysData.map((day) => {
                    return (
                        <div key={day.date} className="day-data">
                            <span style={{ fontWeight: "600" }}>{day.date}</span>
                            <img src={day.day.condition.icon} alt="" />
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