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