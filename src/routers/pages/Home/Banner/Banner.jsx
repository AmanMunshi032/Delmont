import React from 'react';
 import "react-responsive-carousel/lib/styles/carousel.min.css";
import Bannerimg1 from '../../../../assets/Banner1.jpg'
import Bannerimg2 from '../../../../assets/Banner2.jpg'
import Bannerimg3 from '../../../../assets/Banner3.jpg'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
            <div>
                <img  className =' lg:h-[600px] rounded-2xl' src={Bannerimg1} />
              
            </div>
            <div>
                <img className =' lg:h-[600px] rounded-2xl' src={Bannerimg2} />
             
            </div>
            <div>
                <img  className =' lg:h-[600px] rounded-2xl' src={Bannerimg3} />
              
            </div>
        </Carousel>
    );
};

export default Banner;