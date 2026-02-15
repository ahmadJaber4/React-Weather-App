// future weather component, displays the future forecast (today/hourly and upcoming 6 days)

import CityTodayWeather from "./CityTodayWeather";
import CityUpcomingDaysWeather from "./CityUpcomingDaysWeather";

export default function CityFutureWeather({cityWeather}) {
    return (
        <div className='future-data'>
            <CityTodayWeather cityWeather={cityWeather}/> {/* today's hourly forecast */}
            <CityUpcomingDaysWeather cityWeather={cityWeather}/> {/* upcoming 6 days forecast */}
        </div>
    );
}