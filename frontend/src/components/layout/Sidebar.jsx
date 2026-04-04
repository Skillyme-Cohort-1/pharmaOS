import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Upload,
  LogOut,
  UserCircle,
  Menu,
  X
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/transactions', label: 'Transactions', icon: FileText },
  { to: '/import', label: 'Import', icon: Upload },
  { to: '/reports', label: 'Reports', icon: FileText, adminOnly: true },
]

export default function Sidebar({ alertCount = 0 }) {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-teal-500 flex items-center justify-center pl-0.5">
              <Package size={14} className="text-white transform -rotate-12" />
            </div>
            <div>
              <span className="text-teal-500">Pharma</span>
              <span className="text-gray-400">OS</span>
            </div>
          </h1>
          <p className="text-xs text-gray-500 mt-1 ml-8">Pharmacy Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems
            .filter((item) => !item.adminOnly || user?.role === 'admin')
            .map((item) => {
              const Icon = item.icon
              const showBadge = item.to === '/inventory' && alertCount > 0

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
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
                    <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full flex-shrink-0">
                      {alertCount > 9 ? '9+' : alertCount}
                    </span>
                  )}
                </NavLink>
              )
            })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-gray-800">
          {user ? (
            <div className="bg-gray-800 rounded-xl p-3 flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 overflow-hidden min-w-0">
                <div className="w-8 h-8 rounded-full bg-teal-900 text-teal-400 flex items-center justify-center flex-shrink-0">
                  <UserCircle size={20} />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          ) : null}

          <button
            onClick={() => {
              logout()
              closeSidebar()
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

