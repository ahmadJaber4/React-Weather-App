import CityCurrentWeather from "./CityCurrentWeather";
import CityFutureWeather from "./CityFutureWeather";

export default function CityBox({city, image}) {
    return (
        <div key={city.location.name} className='suggested-city-box' style={{ backgroundImage: `url(${image})` }}>
            <CityCurrentWeather city={city} />
            <CityFutureWeather city={city} />
        </div>
    );
}