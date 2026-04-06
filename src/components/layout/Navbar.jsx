import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm px-8 py-5 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left side - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products, customers, sales..."
            className="w-full bg-slate-100 border border-transparent focus:border-teal-300 rounded-3xl py-3 pl-12 pr-6 text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-8">

        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <div className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-slate-100 rounded-2xl transition-colors">
            🔔
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shadow-md">
            3
          </span>
        </div>

        {/* User Profile + */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 p-0.5 shadow-inner">
            <div className="w-full h-full bg-white rounded-[14px] overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl">
                👤
              </div>
            </div>
          </div>

          {/* User Info */}
          <div>
            <p className="text-xs text-slate-500 -mt-0.5">Pharmacy Owner</p>
          </div>

          {/* Dropdown */}
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="!bg-transparent !border-none !shadow-none !text-slate-500 hover:!bg-slate-100 rounded-xl px-2"
              id="user-dropdown"
            >
              
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
    </div>
  );
}