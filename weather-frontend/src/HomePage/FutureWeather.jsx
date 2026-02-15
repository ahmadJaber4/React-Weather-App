// the future weather component, a container that holds today's hourly forecast and a 6-day forecast of the hometown city 

import Today from "./Today";
import UpcomingDays from "./UpcomingDays";

export default function FutureWeather() {
    return (
        <div className="future-data">
            <Today/>
            <UpcomingDays/>
        </div>
    );
}