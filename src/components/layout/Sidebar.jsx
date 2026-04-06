import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Profile");

  const menu = [
    { name: "Dashboard" },
    { name: "Sales" },
    { name: "Purchases" },
    { name: "Products" },
    { name: "Stock" },
    { name: "Customers" },
    { name: "Suppliers" },
    { name: "Incomes" },
    { name: "Expenses" },
    { name: "Tax" },
    { name: "Profile" },
  ];

  return (
    <div className="w-72 bg-teal-950 text-white h-screen flex flex-col shadow-2xl border-r border-teal-900 rounded-r-3xl overflow-hidden">
      {/* Logo Header */}
      <div className="px-6 pt-8 pb-6 border-bborder-teal-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
        
          </div>
          <h1 className="text-2xl font-bold ">FortyPharma</h1>
        </div>
        <p className="text-teal-400 text-sm mt-1 pl-12">Pharmacy OS</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left rounded-3xl transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white text-teal-950 shadow-xl"
                    : "hover:bg-teal-900 hover:text-teal-100"
                }
              `}
            >
              <span
                className={`text-2xl transition-transform group-hover:scale-110 ${
                  isActive ? "text-teal-600" : "text-teal-300"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium text-lg">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto p-6 border-t border-teal-800 bg-teal-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-400 rounded-2xl flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1">
            
            <p className="text-teal-400 text-xs">Admin</p>
          </div>
          <button className="text-teal-400 hover:text-white transition-colors">
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
}