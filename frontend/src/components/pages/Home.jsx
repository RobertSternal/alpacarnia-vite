import React from 'react';
import '../../App.css'
import HeroSection from '../HeroSection'
import Cards from '../Cards';
import UserReviews from '../UserReviews';
import Footer from '../Footer';
import AlpacaInfo from '../AlpacaInfo';

function Home () {
    return (
        <>
        <HeroSection/>
        <Cards />
        <AlpacaInfo />
        <UserReviews />
        <Footer />
        </>
    );
}

export default Home;