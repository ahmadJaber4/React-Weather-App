import { getUpcomingHoursData } from "./utils";

export default function SuggestedToday({cityWeather}) {
    const upcomingHoursData = getUpcomingHoursData(cityWeather);
    return (
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
    );
}