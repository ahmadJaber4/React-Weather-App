import { createContext } from 'react';
import CurrentWeather from './CurrentWeather';
import FutureWeather from './FutureWeather';

export const LocalWeatherCtx = createContext();

export default function HomeTownWeather({ homeTownWeather, cityImage }) {
    return (
        <div className="home-town-container" style={{ backgroundImage: cityImage ? `url(${cityImage})` : null }}>
            {homeTownWeather &&
                <LocalWeatherCtx.Provider value={homeTownWeather}>
                    <CurrentWeather/>
                    <FutureWeather/>
                </LocalWeatherCtx.Provider>
            }
        </div>
    );
}