import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
const ContactsSection = () => {
  return (
    <section className="py-16 shadow-md rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold ">
            📞Contact Our Medical Camp Team
          </h2>
          <p className="text-gray-600">
            Have questions or want to join our upcoming camp? Reach out to us
            anytime, we’ll be happy to assist you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-cyan-300" />
              <span>amanmunshi032@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-green-600" />
              <span>+8801949457409</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Dhaka Medical College, Dhaka, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          <h3 className="text-2xl font-semibold ">
            Send Us a Message
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-300 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-300 outline-none"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-300 outline-none"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-cyan-300 py-3 rounded-xl font-bold hover:bg-cyan-600 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactsSection;
