// upcoming days weather, displays weather data for the upcoming 6 days

import { getUpcomingDaysData } from "./utils";

export default function CityUpcomingDays({cityWeather}) {
    const upcomingDaysData = getUpcomingDaysData(cityWeather); // store upcoming 6 days data using the function

    return (
        <div className='upcoming-container'>
            <p className="upcoming-days-text">6-Day Forecast</p>

            {/* display the 6 days forecast (date, icon, highest and lowest temp) */}
            <div className="upcoming-days-data">
                {upcomingDaysData.map((day) => {
                    return (
                        <div key={day.date} className="day-data">
                            <span style={{ fontWeight: "600" }}>{day.date}</span>
                            <img src={day.day.condition.icon} alt="" className="weather-icon"/>
                            <span style={{ fontSize: "0.8em" }} title='Highest & lowest temp'>H: {day.day.maxtemp_c} &deg;C &nbsp;&nbsp; L: {day.day.mintemp_c} &deg;C </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}