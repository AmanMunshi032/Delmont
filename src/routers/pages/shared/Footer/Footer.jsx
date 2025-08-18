
import React from 'react';
import { Link } from "react-router";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Logo from '../Logo/Logo';
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className=" inset-shadow-2xs  text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {/* Logo & Name */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Logo></Logo>
        
          </div>
          <p className="text-sm">Empowering communities through healthcare.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/AvailableCamps" className="hover:text-cyan-300">Available Camps</Link></li>
           
            <li><Link to="/dashboard" className="hover:text-cyan-300">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Contact</h4>
          <p className="text-sm">123 Health Street,<br />Dhaka, Bangladesh</p>
          <p className="text-sm mt-1">Phone: +8801949457409</p>
          <p className="text-sm">Email:amanmunshi032@gmail.com</p>

          {/* Social Media (Optional) */}
          <div className="flex gap-3 mt-3 text-cyan-300">
            <a href="https://www.facebook.com/"><FaFacebook size={18} /></a>
            <a href="https://www.linkedin.com/feed/"><FaLinkedin size={18} /></a>
            <a href="https://www.instagram.com/"><FaInstagram size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 py-3 border-t mt-6">
        © {new Date().getFullYear()} Delmont. All rights reserved.
      </div>
    </footer>
    );
};

export default Footer;