import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Upload,
  AlertCircle
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/transactions', label: 'Transactions', icon: FileText },
  { to: '/import', label: 'Import', icon: Upload },
]

export default function Sidebar({ alertCount = 0 }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-teal-500">Pharma</span>
          <span className="text-gray-400">OS</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">Pharmacy Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const showBadge = item.to === '/inventory' && alertCount > 0

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <Icon size={20} />
              <span className="flex-1">{item.label}</span>
              {showBadge && alertCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                  {alertCount > 9 ? '9+' : alertCount}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <AlertCircle size={16} />
          <span>Tech Vanguard © 2026</span>
        </div>
      </div>
    </aside>
  )
}
