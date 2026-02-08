import axios from 'axios';
import { useState, useEffect } from "react";
import Header from "../MainComponents/Header";
import SavedContainer from './SavedContainer';

export default function SavedPage({savedCities, handleSave, loading, error}) {
    return (
        <>
            <title>Jaber's Weather Forecast - Saved</title>

            <Header />
            <SavedContainer message={loading ? 'Loading...' : error ? 'An Error Occured' : 'Saved Cities'} savedCities={savedCities} handleSave={handleSave} />
        </>
    );
}