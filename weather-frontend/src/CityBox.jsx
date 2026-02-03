import CityCurrentWeather from "./CityCurrentWeather";
import CityFutureWeather from "./CityFutureWeather";

export default function CityBox({city, image}) {
    return (
        <div key={city.location.name} className='city-box' style={{ backgroundImage: `url(${image})` }}>
            <button className="save-button">Save</button>
            <CityCurrentWeather city={city} />
            <CityFutureWeather city={city} />
        </div>
    );
}