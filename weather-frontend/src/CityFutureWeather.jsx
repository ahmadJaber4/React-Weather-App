import CityTodayWeather from "./CityTodayWeather";
import CityUpcomingDaysWeather from "./CityUpcomingDaysWeather";

export default function SuggestedFutureWeather({city}) {
    return (
        <div className='future-data'>
            <CityTodayWeather city={city}/>
            <CityUpcomingDaysWeather city={city}/>
        </div>
    );
}