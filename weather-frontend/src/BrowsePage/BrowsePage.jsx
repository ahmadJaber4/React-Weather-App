import Header from "../MainComponents/Header";
import { famousCities } from "../suggestedPlaces";
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

            <div className="suggested-container">
                <h3 className="suggested-text">Suggested Places</h3>
            </div>
        </>
    );
}