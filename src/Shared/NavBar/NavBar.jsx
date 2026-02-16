import logo from "../../assets/logo/logo.png"

import dropdownIcon from "../../assets/DropdownIcon/icons8-dropdown-96.png"
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Authentication/AuthContext/AuthContext";
import { toast } from "react-toastify";
import {
  Home,
  LayoutDashboard,
  Briefcase,
  Factory,
  Boxes,
  Users,
  Calculator,
  CheckCircle,
  Truck,
  FileText,
   Settings 
} from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate()
  const { logOut, user } = useContext(AuthContext)
 
  const handleLogOut = () => {
    try {
      logOut()
      toast.success("লগ আউট সফল হয়েছে  ")
      navigate("/login")
    } catch (err) {
      toast.error("লগ আউট ব্যার্থ হয়েছে  ")
    }
  }
  

 const links = (
  <>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-blue-600 bg-blue-800 text-blue-100 font-semibold"
            : "border-transparent hover:border-blue-500 hover:bg-blue-800"
        }`
      }
    >
      <Home size={16} className="text-yellow-500" />
      Home
    </NavLink>

    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-teal-600 bg-teal-800 text-teal-100 font-semibold"
            : "border-transparent hover:border-teal-500 hover:bg-teal-800"
        }`
      }
    >
      <LayoutDashboard size={16} className="text-blue-500" />
      Dashboard
    </NavLink>

    <NavLink
      to="/merchandise"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-purple-600 bg-purple-800 text-purple-100 font-semibold"
            : "border-transparent hover:border-purple-500 hover:bg-purple-800"
        }`
      }
    >
      <Briefcase size={16} className="text-indigo-500" />
      Merchandising
    </NavLink>

    <NavLink
      to="/production"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-orange-600 bg-orange-800 text-orange-100 font-semibold"
            : "border-transparent hover:border-orange-500 hover:bg-orange-800"
        }`
      }
    >
      <Factory size={16} className="text-teal-500" />
      Production
    </NavLink>

    <NavLink
      to="/inventory"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-emerald-600 bg-emerald-800 text-emerald-100 font-semibold"
            : "border-transparent hover:border-emerald-500 hover:bg-green-800"
        }`
      }
    >
      <Boxes size={16} className="text-emerald-500" />
      Inventory
    </NavLink>

    <NavLink
      to="/hr"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-pink-600 bg-pink-800 text-pink-100 font-semibold"
            : "border-transparent hover:border-pink-500 hover:bg-pink-800"
        }`
      }
    >
      <Users size={16} className="text-pink-500" />
      HR
    </NavLink>

    <NavLink
      to="/accounts"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-cyan-600 bg-cyan-800 text-cyan-100 font-semibold"
            : "border-transparent hover:border-cyan-500 hover:bg-cyan-800"
        }`
      }
    >
      <Calculator size={16} className="text-cyan-500" />
      Accounts
    </NavLink>

    <NavLink
      to="/qc"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-green-600 bg-green-800 text-green-100 font-semibold"
            : "border-transparent hover:border-green-500 hover:bg-green-800"
        }`
      }
    >
      <CheckCircle size={16} className="text-green-500" />
      Quality Control
    </NavLink>

    <NavLink
      to="/delivery"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-yellow-600 bg-yellow-800 text-yellow-100 font-semibold"
            : "border-transparent hover:border-yellow-500 hover:bg-yellow-800"
        }`
      }
    >
      <Truck size={16} className="text-yellow-500" />
      Delivery
    </NavLink>

    <NavLink
      to="/reports"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-red-600 bg-red-800 text-red-100 font-semibold"
            : "border-transparent hover:border-red-500 hover:bg-red-800"
        }`
      }
    >
      <FileText size={16} className="text-blue-500" />
      Reports
    </NavLink>
    <NavLink
      to="/settings"
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-all
        border-l-4
        ${
          isActive
            ? "border-red-600 bg-red-800 text-red-100 font-semibold"
            : "border-transparent hover:border-red-500 hover:bg-indigo-700"
        }`
      }
    >
      <Settings size={16} className="text-red-500" />
      Settings
    </NavLink>
  </>
);




  const links2 = <>
    <NavLink to={"/login"}><li className="hover:bg-blue-500 text-sm rounded py-1 pl-2" >Log In </li></NavLink>
    <li onClick={handleLogOut}><button className="hover:bg-blue-500 text-sm rounded py-1 pl-2">
     Log Out
    </button> </li>
  </>
  return (
    <div >
      <div className="navbar pb-3 fixed z-20 bg-gray-800  backdrop-blur-2xl shadow-[0_6px_16px_rgba(0,123,255,03)]   ">

        <div className="navbar-start ">
          <div className="drawer">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-1" className="  drawer-button  ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                </div>
              </label>
            </div>

            <div className="drawer-side">
              <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay  "></label>
              <ul className="menu bg-gray-900 min-h-full w-50 p-4">

                {/* search---------------- */}
                <li>

                  <label className="input bg-transparent border border-gray-500">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </g>
                    </svg>
                    <input type="search" required placeholder="Search" />
                  </label>

                </li>
                {/* Sidebar content here */}
                <li> {links}</li>
              </ul>
            </div>
          </div>

        </div>

        <div className="navbar-center ">
          {/* project logo for desktop--------- */}
          <div className=" sm:flex justify-center items-center hidden">

            <img src={logo} alt="logo" className="w-14 h-14 object-cover  " />
            <h2 className="text-3xl font-mono  "><span className="text-6xl text-[#efb520] ">𝔰</span>𝚝𝚎𝚛𝚕𝚒𝚗𝚐 <span className="text-6xl text-[#06b1f3]">𝔰</span>𝚝𝚢𝚕𝚎s
            </h2>

          </div>
          {/* project logo for mobile--------- */}
          <div className=" sm:hidden justify-center items-center flex flex-col">

            <img src={user?.photoURL} alt="logo" className="w-14 h-14 object-cover  " />
            <h2 className="text-xl font-extrabold font-mono bg-linear-to-r from-[#06b1f3] to-[#efb520] bg-clip-text text-transparent drop-shadow-md">
              Sterling Styles
            </h2>

          </div>

        </div>
        <div className="navbar-end gap-4">
          {/* user name------------------ */}

          <p>{user?.displayName}</p>

          {/* profile picture---------- */}
          <div className="dropdown dropdown-hover dropdown-end">

            <div className="avatar">

              <div className="ring-primary ring-offset-base-100 sm:w-14 rounded-full ring-2 ring-offset-2 w-12">
                <img src={user?.photoURL} />
              </div>

            </div>
            {/* dropdown icon----------- */}
            <div className="w-7 h-3 sm:ml-4 ml-3">
              <img src={dropdownIcon} alt="icon" className="w-full h-full object-cover  " />
            </div>
            <ul tabIndex="0" className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm bg-[#06b1f3] ">
              {/* authentication menu---------- */}
              {links2}
            </ul>

          </div>


        </div>
      </div>
    </div>
  );
};

export default NavBar;