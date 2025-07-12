import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "./Navber.css";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../../hooks/UseAuth";
  import { ToastContainer} from 'react-toastify';
// Dummy user (replace with actual user/auth logic)

const links = (
  <>
    <ul>
      <li className="font-bold md:text-xl text-md">
        <NavLink to="/">Home</NavLink>
      </li>
    </ul>
    <ul>
      <li className="font-bold md:text-xl text-md">
        <NavLink to="/AvailableCamps">Available-camps</NavLink>
      </li>
    </ul>
   
  </>
);

const Navbar = () => {
  const { user,Logout } = useAuth();
  console.log(user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    alert("Logged out!");
   Logout()
    
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Logo></Logo>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {links}

          {user? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1"
              >
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
                <FaChevronDown className="text-gray-500 text-sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg z-50">
                  <div className="px-4 py-2 text-gray-800 font-semibold border-b">
                    {user?.displayName}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) :(
            <Link
              to="/Login"
              className="block px-3 py-2 rounded-md font-bold bg-cyan-300 w-fit"
            >
              Join Us
            </Link>
          ) }
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
           
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2">
          {links}

          {user?  (
            <div className="border-t pt-2">
              <div className="px-2 font-semibold">{user?.displayName}</div>
              <Link
                to="/dashboard"
                className="block px-2 py-1 text-sm hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-gray-100"
              >
                <ToastContainer />
                Logout
              </button>
            </div>
          ):(
            <Link
              to="/Login"
              className="block  px-2 py-1 rounded-md font-semibold bg-cyan-300 w-fit"
            >
              Join Us
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
