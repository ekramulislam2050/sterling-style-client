import logo from "../../assets/logo/logo.png"

const NavBar = () => {
  const links = <>
    <li>ড্যাশবোর্ড </li>
    <li>মার্চেন্ডাইজিং </li>
    <li>প্রোডাকশন </li>
    <li>ইনভেন্টরি </li>
    <li>এইচআর </li>
    <li>অ্যাকাউন্টস </li>
    <li>কিউসি </li>
    <li>ডেলিভারি </li>
    <li>রিপোর্টস </li>
     



  </>
  return (
    <div >
      <div className="shadow-xl  shadow-zinc-600 navbar pb-3">

        <div className="navbar-start ">
          {/* dropdown-------- */}
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>

            <ul
              tabIndex="-1"
              className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-[#0491c9] rounded-box z-1 w-52">
              {/* search field------- */}
              <li>

                <label className="input bg-transparent border border-gray-600">
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
              {/* nav menu-------------- */}
              <li>
                    {links}
              </li>
            </ul>
          </div>

        </div>
        <div className="navbar-center ">
          {/* project logo--------- */}
          <div className=" flex justify-center items-center">

            <img src={logo} alt="logo" className="w-14 h-14 object-cover  " />
            <h2 className="text-3xl font-mono "><span className="text-6xl text-[#efb520] ">𝔰</span>𝚝𝚎𝚛𝚕𝚒𝚗𝚐 <span className="text-6xl text-[#06b1f3]">𝔰</span>𝚝𝚢𝚕𝚎s</h2>
          </div>

        </div>
        <div className="navbar-end gap-4">
          {/* notification icon--------- */}
          <div>
            <button className="btn btn-ghost btn-circle ">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                <span className="badge badge-xs badge-secondary indicator-item text-sm font-bold ">+1</span>

              </div>
            </button>
          </div>
          {/* profile picture---------- */}
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2 ">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NavBar;