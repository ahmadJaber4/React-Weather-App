import Header from "../MainComponents/Header";
import SavedContainer from './SavedContainer';
import Footer from "../MainComponents/Footer";

export default function SavedPage({savedCities, handleSave, loading, error}) {
    return (
        <>
            <title>Weather Forecast - Saved</title>

            <Header savedCities={savedCities}/>
            <SavedContainer message={loading ? 'Loading...' : error ? 'An Error Occured' : 'Saved Cities'} savedCities={savedCities} handleSave={handleSave} />
            <Footer/>
        </>
    );
}