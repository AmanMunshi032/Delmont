
import React from "react";
 import { motion } from "framer-motion";
import { FaUserMd, FaHeartbeat, FaRegCalendarCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaUserMd className="text-4xl text-primary" />,
    title: "Expert Doctors",
    description:
      "Get health consultations from licensed medical professionals at every camp.",
  },
  {
    icon: <FaHeartbeat className="text-4xl text-red-500" />,
    title: "Free & Affordable",
    description:
      "Many camps offer free or low-cost checkups, making healthcare accessible to all.",
  },
  {
    icon: <FaRegCalendarCheck className="text-4xl text-green-500" />,
    title: "Easy Registration",
    description:
      "Browse, join, and manage your medical camp registrations with just a few clicks.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const WhyJoinSection = () => {
  return (

    <section className="py-16 px-4 bg-gradient-to-b shadow-md rounded-2xl">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Join Our Medical Camps?
        </motion.h2>
        <motion.p
          className=" mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          We believe in delivering quality healthcare access to everyone.
          Here's why thousands choose our platform to find and join medical camps.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
