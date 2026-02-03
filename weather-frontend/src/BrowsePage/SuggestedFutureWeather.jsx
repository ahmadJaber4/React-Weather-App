import { getUpcomingDaysData, getUpcomingHoursData } from "../utils";
import SuggestedToday from "./SuggestedToday";
import SuggestedUpcomingDays from "./SuggestedUpcomingDays";

export default function SuggestedFutureWeather({city}) {
    return (
        <div className='future-data'>
            <SuggestedToday city={city}/>
            <SuggestedUpcomingDays city={city}/>
        </div>
    );
}