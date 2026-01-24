import { NavLink } from 'react-router-dom';
import logo from '../assets/weather-icon.webp'
import './Header.css';

export default function Header(){
    return (
        <header className="header">
            <div className='logo-and-title'>
                <img className="logo" src={logo} alt="logo" />
                <span className="title">Jaber's Weather Forecast</span>
            </div>

            <div className='tabs'>
                <NavLink to='/' className='tab'>Home</NavLink>
                <NavLink to='/browse' className='tab'>Browse</NavLink>
                <NavLink to='/saved' className='tab'>Saved</NavLink>
            </div>
        </header>
    );
}