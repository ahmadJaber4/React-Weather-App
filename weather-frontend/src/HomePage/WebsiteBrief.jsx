import { Link } from "react-router-dom";
import { weatherFacts } from '../facts.js'
import BriefBox from "./BriefBox";


export default function WebsiteBrief() {
    console.log(weatherFacts);
    return (
        <div className="website-brief-container">
            <BriefBox
                image="📍"
                title="Current Location Forecast"
                description="Get instant weather updates for where you are right now. See current conditions, an hourly breakdown for the day, and a 6-day forecast based on your location." />
            <BriefBox
                image="🌍"
                title="Global Weather Data"
                description={<>Use the <Link to="browse">Browse</Link> page to find weather for any city around the world. See current conditions and forecasts, so you always have reliable weather information for any location you choose.</>} />
            <BriefBox
                image="🗂️"
                title="Save Any Location You Want"
                description={<>Keep track of places that matter to you by saving them. Easily check weather conditions and forecasts for your saved locations anytime in the <Link to="saved">Saved</Link> tab.</>} />
            <BriefBox
                image="🤖"
                title="AI Features"
                description="" />
            <BriefBox
                image="💡"
                title="Random Fact"
                description={weatherFacts[Math.floor(Math.random() * weatherFacts.length)]} />
        </div>
    );
}