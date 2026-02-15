// today weather component, displays the hourly forecast for today 

import { getUpcomingHoursData } from "./utils";

export default function CityToday({cityWeather}) {
    const upcomingHoursData = getUpcomingHoursData(cityWeather); // save hourly forecast using the function

    return (
        <div className='today-container'>
            <p className="today-text">Today</p>
            <div className="upcoming-hours-data">
                {/* display data for every hour (time, icon, temp) */}
                {upcomingHoursData.map((hour) => {
                    return (
                        <div key={hour.time} className="hour-data">
                            <span style={{ fontWeight: "600" }}>{(hour.time).slice(-5)}</span>
                            <img src={hour.condition.icon} alt="" className="weather-icon"/>
                            <span title='Temperature'>{hour.temp_c} &deg;C</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}