// the footer component

import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <div className='name-and-copyright'>
                <h4>Programmed by</h4>
                <h2>Ahmad Marwan Jaber</h2>
                <i className="fa-brands fa-linkedin fa-xl"></i>
                <span className='copyright'>&copy; 2026 - All rights reserved</span>
            </div>

            <div className='sources'>
                <div>Weather data: <a href="https://www.weatherapi.com/" target='_blank'>https://www.weatherapi.com/</a></div>
                <div>Images: <a href="https://unsplash.com/developers" target='_blank'>https://unsplash.com/developers</a></div>
            </div>
        </footer>
    );
}