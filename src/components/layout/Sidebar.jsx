import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { 
  Pill, LayoutDashboard, ShoppingCart, Package, Users, Truck, 
  DollarSign, User, Settings, TrendingUp, TrendingDown, Landmark, Wallet 
} from "lucide-react";

export default function PharmacySidebar({ toggled, setToggled }) {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md" // This makes the sidebar responsive at the 'md' tailwind breakpoint
      backgroundColor="#0f3d3e"
      rootStyles={{
        color: "#cbd5e1", // slate-300
        height: "100%",
        borderRight: "none",
      }}
      className="shadow-2xl md:shadow-none z-50"
    >
      {/* Logo Area */}
      <div className="p-6 border-b border-[#164e4f] mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex justify-center items-center text-white shadow-lg shadow-teal-500/20">
            <Pill size={24} />
          </div>
          <div>
            <h2 className="m-0 text-xl font-extrabold text-white tracking-wide">FortyPharma</h2>
            <p className="m-0 text-teal-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Pharmacy OS</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            padding: "10px 20px",
            borderRadius: "12px",
            margin: "4px 16px",
            fontWeight: active ? "600" : "500",
            color: active ? "#ffffff" : "#94a3b8",
            backgroundColor: active ? "#1b5e5f" : "transparent",
            "&:hover": {
              backgroundColor: "#164e4f",
              color: "#ffffff",
            },
            transition: "all 0.2s ease-in-out",
          }),
        }}
      >
        <MenuItem active={isActive('/dashboard')} icon={<LayoutDashboard size={16} />} component={<Link to="/dashboard" onClick={() => setToggled(false)} />}> Dashboard </MenuItem>
        <MenuItem active={isActive('/sales')} icon={<DollarSign size={16} />} component={<Link to="/sales" onClick={() => setToggled(false)} />}> Sales </MenuItem>
        <MenuItem active={isActive('/purchases')} icon={<ShoppingCart size={16} />} component={<Link to="/purchases" onClick={() => setToggled(false)} />}> Purchases </MenuItem>
        <MenuItem active={isActive('/products')} icon={<Package size={16} />} component={<Link to="/products" onClick={() => setToggled(false)} />}> Products </MenuItem>
        <MenuItem active={isActive('/stock')} icon={<Package size={16} />} component={<Link to="/stock" onClick={() => setToggled(false)} />}> Stock </MenuItem>
        <MenuItem active={isActive('/customers')} icon={<Users size={16} />} component={<Link to="/customers" onClick={() => setToggled(false)} />}> Customers </MenuItem>
        <MenuItem active={isActive('/suppliers')} icon={<Truck size={16} />} component={<Link to="/suppliers" onClick={() => setToggled(false)} />}> Suppliers </MenuItem>
        <MenuItem active={isActive('/staff')} icon={<User size={16} />} component={<Link to="/staff" onClick={() => setToggled(false)} />}> Staff </MenuItem>
        <MenuItem active={isActive('/reports')} icon={<LayoutDashboard size={16} />} component={<Link to="/reports" onClick={() => setToggled(false)} />}> Reports </MenuItem>

        {/* Finance Link (Removed the stray 'x' here) */}
        <MenuItem 
          active={isActive('/finance')} 
          icon={<Wallet size={16} />} 
          component={<Link to="/finance" onClick={() => setToggled(false)} />}
        > 
          Finance 
        </MenuItem>
      </Menu> {/* <-- Added the missing closing Menu tag here */}
        
      {/* Bottom Profile Section (Hidden on mobile as it's in Navbar) */}
      <div className="mt-auto p-5 border-t border-[#164e4f] bg-black/10 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex justify-center items-center text-teal-400">
            <User size={20} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="m-0 text-white text-sm font-bold truncate">Admin User</p>
            <p className="m-0 text-teal-400/80 text-xs font-medium truncate">View Profile</p>
          </div>
          <Link to="/settings" className="text-teal-400/60 hover:text-teal-400 transition-colors p-2 rounded-lg hover:bg-white/5">
            <Settings size={16} />
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}