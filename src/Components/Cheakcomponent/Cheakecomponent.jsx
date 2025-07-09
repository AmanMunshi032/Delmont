import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../../routers/pages/shared/Logo/Logo";

// Dummy user (replace with actual user/auth logic)

    const links = <>
    <li className='font-bold text-2xl'><NavLink to= '/'>Home</NavLink></li>
    <li className='font-bold text-2xl'><NavLink  to= '/available-camps'>Available-camps</NavLink></li>
     <li className='font-bold text-2xl'> <NavLink to= '/Bloge'>Bloge</NavLink></li> 
     </>
const user = {
  isLoggedIn: true,
  name: "Aman Munshi",
   photoURL: "https://i.pravatar.cc/40?img=12",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    alert("Logged out!");
    // TODO: real logout logic
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Logo></Logo>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
        {links}
        {links}  
          {!user?.isLoggedIn ? (
            <Link to="/join" className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">Join Us</Link>
          ) : (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-1">
                <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border" />
                <FaChevronDown className="text-gray-500 text-sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg z-50">
                  <div className="px-4 py-2 text-gray-800 font-semibold border-b">{user.name}</div>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-sm">Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2">
          <Link to="/" className="block px-2 py-1 text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/available-camps" className="block px-2 py-1 text-gray-700 hover:text-blue-600">Available Camps</Link>

          {!user?.isLoggedIn ? (
            <Link to="/join" className="block px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit">
              Join Us
            </Link>
          ) : (
            <div className="border-t pt-2">
              <div className="px-2 font-semibold">{user.name}</div>
              <Link to="/dashboard" className="block px-2 py-1 text-sm hover:bg-gray-100">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
