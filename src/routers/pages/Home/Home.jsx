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
         <FeetBackandReting></FeetBackandReting>
         <WhyJoinSection></WhyJoinSection>
         
        </div>
    );
};

export default Home;