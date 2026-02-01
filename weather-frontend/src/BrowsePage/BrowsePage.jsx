import Header from "../MainComponents/Header";
import SuggestedCities from "./SuggestedCities";
import './BrowsePage.css';


export default function BrowsePage(){
    return(
        <>
            <title>Jaber's Weather Forecast - Browse</title>

            <Header/>

            <div className="search-bar">
                <span className="search-icon"><i className="fa-solid fa-magnifying-glass fa-lg" style={{color: "white"}}></i></span>
                <input type="text" placeholder="Search a city" className="search-input"/>
            </div>

            <SuggestedCities/>
        </>
    );
}