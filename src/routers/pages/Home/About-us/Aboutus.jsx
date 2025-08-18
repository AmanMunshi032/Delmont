import React from 'react';
import { motion } from "framer-motion";
const Aboutus = () => {
    return (
    <div>
        
         <section className="w-full shadow-md rounded-2xl py-16 px-6 md:px-12 lg:px-20">
          
      <div className="grid md:grid-cols-2 gap-10 items-center">
     
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
           <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            About Our Medical Camp
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our Medical Camp is dedicated to providing accessible and quality healthcare 
            to communities in need. We organize free health checkups, awareness programs, 
            and consultations with experienced medical professionals.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Our Mission</h3>
            <p className="text-gray-600">
              To serve underprivileged communities by ensuring healthcare access, 
              preventive education, and compassionate medical support.
            </p>

            <h3 className="text-xl font-semibold text-gray-700">Our Vision</h3>
            <p className="text-gray-600">
              A healthier society where no one is deprived of basic medical facilities 
              and awareness about well-being.
            </p>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/pvs72Bct/pexels-mk-photoz-2149411980-33127835.jpg"
            alt="Medical Camp"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
    </div>
   
    );
};

export default Aboutus;