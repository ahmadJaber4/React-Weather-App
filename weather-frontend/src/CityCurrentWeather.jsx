
export default function SuggestedCurrentWeather({cityWeather}) {
    return (
        <div className='name-and-current'>
            <div className='city-country'>{cityWeather.location.name}, {cityWeather.location.country}</div>
            <div className='current-weather'>
                <div className="info">
                    <img className="state-icon" src={cityWeather.current.condition.icon} alt="" />
                    {cityWeather.current.condition.text}
                </div>
                <div className="info" title="Temperature">
                    <i className="fa-solid fa-temperature-half fa-xl" style={{ color: "rgb(255, 193, 188)" }}></i>
                    {cityWeather.current.temp_c} &deg;C
                </div>
                <div className="info" title="Wind speed">
                    <i className="fa-solid fa-wind fa-xl"></i>
                    {cityWeather.current.wind_kph} km/h
                </div>
                <div className="info" title="Humidity">
                    <i className="fa-solid fa-droplet fa-xl" style={{ color: "rgb(77, 204, 255)" }}></i>
                    {cityWeather.current.humidity}%
                </div>
            </div>
        </div>
    );
}