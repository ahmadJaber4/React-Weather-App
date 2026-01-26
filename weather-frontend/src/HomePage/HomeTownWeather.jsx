
export default function HomeTownWeather({ homeTownWeather, cityImage }) {

    return (
        <div className="home-town-container" style={{backgroundImage: cityImage?`url(${cityImage})`:null}}>
            {homeTownWeather &&
                <>
                    <div className="name-and-general">
                        <div className="city-country">
                            <i className="fa-solid fa-location-dot fa-xl"></i>
                            <div>
                                {homeTownWeather.location.name}, {homeTownWeather.location.country}
                            </div>
                        </div>

                        <div className="general-weather">
                            <div className="info">
                                <img className="state-icon" src={homeTownWeather.forecast.forecastday[0].day.condition.icon} alt="" />
                                {homeTownWeather.forecast.forecastday[0].day.condition.text}
                            </div>
                            <div className="info">
                                <i className="fa-solid fa-temperature-half fa-xl"></i>
                                {homeTownWeather.current.temp_c} &deg;C
                            </div>
                            <div className="info">
                                <i className="fa-solid fa-wind fa-xl"></i>
                                {homeTownWeather.current.wind_kph} km/h
                            </div>
                            <div className="info">
                                <i className="fa-solid fa-droplet fa-xl"></i>
                                {homeTownWeather.current.humidity}%
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}