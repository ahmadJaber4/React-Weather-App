// city box component, a box to display the city image and its weather data 

import CityCurrentWeather from "./CityCurrentWeather";
import CityFutureWeather from "./CityFutureWeather";

export default function CityBox({cityWeather, image, handleSave, saved}) {
    return (
        <div key={cityWeather.location.name} className='city-box' style={{ backgroundImage: `url(${image})` }}>
            {/* conditionally render the style of the save/unsave button, call handleSave function when clicked */}
            <button className={`save-button ${saved?'unsave':null}`} onClick={()=>handleSave(cityWeather.location.name)}>{!saved?'Save':'Unsave'}</button>
            
            <CityCurrentWeather cityWeather={cityWeather} /> {/* the city's current weather forecast */}
            <CityFutureWeather cityWeather={cityWeather} /> {/* the city's future weather forecast (today and upcoming 6 days) */}
        </div>
    );
}