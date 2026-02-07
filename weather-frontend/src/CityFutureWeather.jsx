import CityTodayWeather from "./CityTodayWeather";
import CityUpcomingDaysWeather from "./CityUpcomingDaysWeather";

export default function SuggestedFutureWeather({cityWeather}) {
    return (
        <div className='future-data'>
            <CityTodayWeather cityWeather={cityWeather}/>
            <CityUpcomingDaysWeather cityWeather={cityWeather}/>
        </div>
    );
}