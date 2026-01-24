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
                <div className='tab'>Home</div>
                <div className='tab'>Browse</div>
                <div className='tab'>Saved</div>
            </div>
        </header>
    );
}