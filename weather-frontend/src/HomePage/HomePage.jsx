
import Header from "../MainComponents/Header";
import HomeTownWeather from './HomeTownWeather';
import WebsiteBrief from './WebsiteBrief';
import Footer from '../MainComponents/Footer';
import './HomePage.css';
import '../weather.css';

export default function HomePage() {
    return (
        <>
            <title>Jaber's Weather Forecast - Home</title>

            <Header />
            <HomeTownWeather/>
            <WebsiteBrief />
            <Footer/>
        </>
    );
}