import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Eye,
  Syringe,
  Activity,
  Pill,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "General Health Checkup",
    description:
      "Comprehensive health screenings including blood pressure, BMI, and general consultation.",
    icon: <Stethoscope className="w-10 h-10 text-cyan-300" />,
    details:
      "Our health checkup covers basic vitals, BMI, blood sugar, and general advice from professional doctors.",
    image:
      "https://i.ibb.co.com/pvZxyVCr/hush-naidoo-jade-photography-yo01-Z-9-HQAw-unsplash.jpg",
  },
  {
    id: 2,
    title: "Cardiac Care",
    description:
      "Heart checkups with ECG, cholesterol tests, and consultation with specialists.",
    icon: <HeartPulse className="w-10 h-10 text-cyan-300" />,
    details:
      "We provide ECG, cholesterol and lipid profiling, blood pressure monitoring, and preventive heart care tips.",
    image:
      "https://i.ibb.co.com/wZpvz74n/view-anatomic-heart-model-educational-purpose-with-stethoscope.jpg",
  },
  {
    id: 3,
    title: "Eye Examination",
    description: "Free vision screening and awareness on eye health.",
    icon: <Eye className="w-10 h-10 text-cyan-300" />,
    details:
      "Our eye camp includes free visual acuity tests, expert consultation, and affordable spectacles if required.",
    image: "https://i.ibb.co.com/DHTqGJXm/nrd-a-Mm-DIsdn-Uro-unsplash.jpg",
  },
  {
    id: 4,
    title: "Vaccination Services",
    description: "Essential vaccines for children and adults.",
    icon: <Syringe className="w-10 h-10 text-cyan-300" />,
    details:
      "We provide polio, tetanus, flu, hepatitis, and other necessary vaccines with guidance from healthcare staff.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Fitness & Lifestyle Guidance",
    description: "Counseling on diet, exercise, and stress management.",
    icon: <Activity className="w-10 h-10 text-cyan-300" />,
    details:
      "Certified nutritionists and fitness experts provide lifestyle guidance, personalized diet charts, and stress relief tips.",
    image:
      "https://i.ibb.co.com/FkYmVW3H/rinke-dohmen-Cj-OUv-Hwmd-BM-unsplash.jpg",
  },
  {
    id: 6,
    title: "Free Medicines",
    description:
      "Distribution of essential medicines for common health issues.",
    icon: <Pill className="w-10 h-10 text-cyan-300" />,
    details:
      "We distribute free medicines including basic antibiotics, vitamins, and general healthcare products.",
    image:
      "https://images.unsplash.com/photo-1584395630827-860eee694d7b?auto=format&fit=crop&w=800&q=80",
  },
];
const OurServices = () => {
  return (
    <section className="py-20 shadow-md rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="text-4xl font-extrabold ">
            Our Medical camp Services
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Explore the wide range of medical services offered in our camps to
            keep you and your family healthy.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl flex flex-col hover:shadow-2xl transition h-full"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-6 flex flex-col flex-grow text-center">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {service.description}
                </p>
                <p className="text-gray-500 text-xs flex-grow">
                  {service.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
