// components/DashboardLayout.jsx
import { useState } from "react";
import {
  FaBars,
  FaUser,
  FaPlusCircle,
  FaClipboardList,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../../routers/pages/shared/Logo/Logo";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen  max-w-7xl mx-auto flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4  bg-gray-200 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-xl" />
        <span className="text-xl font-bold">Dashboard</span>
      </button>

      {/* Sidebar */}
      <aside
        className={` bg-gray-200 w-64 p-6 space-y-6 fixed md:static z-50 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-64"
        } md:left-0 top-0 h-full md:h-auto`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          {/* <Link to='/'>
           <Logo></Logo>
          </Link> */}
        
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav className="space-y-4 text-lg font-medium">
             <Link  to='/'>
           <Logo></Logo>
          </Link>
          <NavLink
            to="/dashboard/OrganizerProfile"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 block" : "hover:text-cyan-400 block"
            }
          >
            <FaUser className="inline mr-2" />
            Organizer Profile
          </NavLink>

          <NavLink
            to="/dashboard/AddCamp"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 block" : "hover:text-cyan-400 block"
            }
          >
            <FaPlusCircle className="inline mr-2" />
            Add A Camp
          </NavLink>

          <NavLink
            to="/dashboard/ManageCamps"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 block" : " hover:text-cyan-400 block"
            }
          >
            <FaClipboardList className="inline mr-2" />
            Manage Camps
          </NavLink>

          <NavLink
            to="/dashboard/ManageRegisteredCamps"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 block" : "hover:text-cyan-400 block"
            }
          >
            <FaCheckCircle className="inline mr-2" />
            Manage Registered
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
