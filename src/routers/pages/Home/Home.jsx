import React from 'react';
import Banner from './Banner/Banner';
import PopularCampsSection from './PoularCampsSection/PopularCampsSection';
import WhyJoinSection from './Relavent/Relavent';

const Home = () => {
    return (
        <div >
         <Banner></Banner>
         <PopularCampsSection></PopularCampsSection>
         <WhyJoinSection></WhyJoinSection>
        </div>
    );
};

export default Home;