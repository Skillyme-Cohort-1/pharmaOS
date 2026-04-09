import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User, ChevronDown, Settings, LogOut, Menu as MenuIcon } from "lucide-react";

export default function Navbar({ setToggled }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-40">
      
      {/* Left side - Search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Search - Hidden on very small screens, visible on tablets and up */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search products, customers..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 rounded-full py-2.5 pl-11 pr-6 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
              <Search size={18} />
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Profile, Notifications & Mobile Menu */}
      <div className="flex items-center gap-4 md:gap-8 ml-4">
        
        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <div className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-slate-50 rounded-full transition-colors">
            <Bell size={20} />
          </div>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shadow-sm border-2 border-white">
            3
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 p-[2px] shadow-sm cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="w-full h-full bg-white rounded-full overflow-hidden border-2 border-white flex items-center justify-center text-slate-500">
              <User size={18} />
            </div>
          </div>

          <div className="hidden md:block cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <p className="text-sm font-bold text-slate-700 leading-tight">Admin</p>
            <p className="text-[11px] font-medium text-slate-500">Pharmacy Owner</p>
          </div>

          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hidden md:block text-slate-400 hover:text-teal-600 hover:bg-slate-50 rounded-lg p-1 transition-colors"
          >
            <ChevronDown size={18} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-14 right-0 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-3 border-b border-slate-100 mb-1">
                <p className="text-sm font-bold text-slate-700">Signed in as</p>
                <p className="text-xs text-slate-500 truncate">admin@fortypharma.com</p>
              </div>
              <Link to="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                <User size={18} /> My Profile
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                <Settings size={18} /> Account Settings
              </Link>
              <hr className="my-1 border-slate-100" />
              <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu (Moved to the right side, only visible on mobile) */}
        <button 
          onClick={() => setToggled(true)} 
          className="md:hidden text-slate-500 hover:text-teal-600 hover:bg-slate-100 p-2 rounded-xl transition-all duration-500 ease-out hover:scale-110 ml-2"
        >
          <MenuIcon size={24} />
        </button>

      </div>
    </div>
  );
}