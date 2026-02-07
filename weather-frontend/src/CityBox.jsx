import CityCurrentWeather from "./CityCurrentWeather";
import CityFutureWeather from "./CityFutureWeather";

export default function CityBox({cityWeather, image, savePlace}) {
    return (
        <div key={cityWeather.location.name} className='city-box' style={{ backgroundImage: `url(${image})` }}>
            <button className="save-button" onClick={()=>savePlace(cityWeather.location.name)}>Save</button>
            <CityCurrentWeather cityWeather={cityWeather} />
            <CityFutureWeather cityWeather={cityWeather} />
        </div>
    );
}