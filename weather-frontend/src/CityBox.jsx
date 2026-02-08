import CityCurrentWeather from "./CityCurrentWeather";
import CityFutureWeather from "./CityFutureWeather";

export default function CityBox({cityWeather, image, handleSave, saved}) {
    return (
        <div key={cityWeather.location.name} className='city-box' style={{ backgroundImage: `url(${image})` }}>
            <button className={`save-button ${saved?'unsave':null}`} onClick={()=>handleSave(cityWeather.location.name)}>{!saved?'Save':'Unsave'}</button>
            <CityCurrentWeather cityWeather={cityWeather} />
            <CityFutureWeather cityWeather={cityWeather} />
        </div>
    );
}