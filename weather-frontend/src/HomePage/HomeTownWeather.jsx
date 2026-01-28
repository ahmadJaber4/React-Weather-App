import sunsetIcon from '../assets/sunset.png';
import sunriseIcon from '../assets/sunrise.png';

export default function HomeTownWeather({ homeTownWeather, cityImage }) {

    let upcomingDaysData = homeTownWeather ? homeTownWeather.forecast.forecastday.slice(1) : [];
    let upcomingHoursData = homeTownWeather ? homeTownWeather.forecast.forecastday[0].hour : [];
    for (let hour of upcomingHoursData) {
        if (hour.time_epoch * 1000 > Date.now()) {
            const starting_index = upcomingHoursData.indexOf(hour) - 1;
            console.log(starting_index);
            upcomingHoursData = upcomingHoursData.slice(starting_index);
            break;
        }
    }
    console.log(upcomingHoursData);
    console.log(upcomingDaysData);

    return (
        <div className="home-town-container" style={{ backgroundImage: cityImage ? `url(${cityImage})` : null }}>
            {homeTownWeather &&
                <>
                    <div className="name-and-current-data">
                        <div className="city-country">
                            <i className="fa-solid fa-location-dot fa-xl"></i>
                            <div>
                                {homeTownWeather.location.name}, {homeTownWeather.location.country}
                            </div>
                        </div>

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

                    <div className="future-data">
                        <div className="today-container">
                            <p className="today-text">Today</p>
                            <div className="upcoming-hours-data">
                                {upcomingHoursData.map((hour) => {
                                    return (
                                        <div key={hour.time} className="hour-data">
                                            <span style={{fontWeight: "600"}}>{(hour.time).slice(-5)}</span>
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

                        <div className="upcoming-container">
                            <p className="upcoming-days-text">6-Day Forecast</p>
                            <div className="upcoming-days-data">
                                {upcomingDaysData.map((day) => {
                                    return (
                                        <div key={day.date} className="day-data">
                                            <span style={{fontWeight: "600"}}>{day.date}</span>
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
                    </div>
                </>
            }
        </div>
    );
}