// the header component

import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/weather-icon.webp'
import './Header.css';

export default function Header({ savedCities }) { // savedCities prop passed to the header to display the count ()
    const navigate = useNavigate();

    return (
        <header className='header'>
            <div className='header-logo-and-title' onClick={()=>navigate('/')}> {/* navigate to the home page when the title/icon is clicked */}
                <img className="logo" src={logo} alt="logo" />
                <span className="title">Weather Forecast</span>
            </div>

            {/* linking tabs to the corresponding page */}
            <div className='tabs'>
                <NavLink to='/' className='tab'>Home</NavLink>
                <NavLink to='/browse' className='tab'>Browse</NavLink>
                <NavLink to='/saved' className='tab'>Saved {`(${savedCities.length})`}</NavLink> {/* display the number of saved cities beside "saved" tab */}
            </div>
        </header>
    );
}