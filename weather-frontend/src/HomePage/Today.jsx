import { useContext } from "react";
import { LocalWeatherCtx } from "./HomeTownWeather";

export default function Today() {
    const homeTownWeather = useContext(LocalWeatherCtx);
    let upcomingHoursData = homeTownWeather ? homeTownWeather.forecast.forecastday[0].hour : [];
    for (let hour of upcomingHoursData) {
        if (hour.time_epoch * 1000 > Date.now()) {
            const starting_index = upcomingHoursData.indexOf(hour) - 1;
            upcomingHoursData = upcomingHoursData.slice(starting_index);
            break;
        }
    }

    return (
        <div className="today-container">
            <p className="today-text">Today</p>
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