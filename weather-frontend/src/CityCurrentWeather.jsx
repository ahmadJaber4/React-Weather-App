
export default function SuggestedCurrentWeather({city}) {
    return (
        <div className='name-and-current'>
            <div className='city-country'>{city.location.name}, {city.location.country}</div>
            <div className='current-weather'>
                <div className="info">
                    <img className="state-icon" src={city.current.condition.icon} alt="" />
                    {city.current.condition.text}
                </div>
                <div className="info" title="Temperature">
                    <i className="fa-solid fa-temperature-half fa-xl" style={{ color: "rgb(255, 193, 188)" }}></i>
                    {city.current.temp_c} &deg;C
                </div>
                <div className="info" title="Wind speed">
                    <i className="fa-solid fa-wind fa-xl"></i>
                    {city.current.wind_kph} km/h
                </div>
                <div className="info" title="Humidity">
                    <i className="fa-solid fa-droplet fa-xl" style={{ color: "rgb(77, 204, 255)" }}></i>
                    {city.current.humidity}%
                </div>
            </div>
        </div>
    );
}