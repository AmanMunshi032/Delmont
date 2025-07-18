import React from 'react';
import Banner from './Banner/Banner';
import PopularCampsSection from './PoularCampsSection/PopularCampsSection';
import WhyJoinSection from './Relavent/Relavent';
import FeetBackandReting from './Feetback/FeetBackandReting';

const Home = () => {
    return (
        <div >
         <Banner></Banner>
         <PopularCampsSection></PopularCampsSection>
         <WhyJoinSection></WhyJoinSection>
         <FeetBackandReting></FeetBackandReting>
        </div>
    );
};

export default Home;