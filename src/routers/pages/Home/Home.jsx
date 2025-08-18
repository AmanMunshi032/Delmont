import React from 'react';
import Banner from './Banner/Banner';
import PopularCampsSection from './PoularCampsSection/PopularCampsSection';
import WhyJoinSection from './Relavent/Relavent';
import FeetBackandReting from './Feetback/FeetBackandReting';
import Aboutus from './About-us/Aboutus';
import Featured from './Featured/Featured';
import ContactsSection from './ContactSection/ContactsSection';
import OurServices from './OurServices/OurServices';

const Home = () => {
    return (
        <div >
         <Banner></Banner>
         <PopularCampsSection></PopularCampsSection>
         <Aboutus></Aboutus>
         <Featured></Featured>
         <FeetBackandReting></FeetBackandReting>
         <OurServices></OurServices>
         <WhyJoinSection></WhyJoinSection>
         <ContactsSection></ContactsSection>
         
        </div>
    );
};

export default Home;