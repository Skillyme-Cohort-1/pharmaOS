import { Bell, Menu, Search, ChevronDown, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

// Format userType enum to a readable label
function formatRole(userType) {
  if (!userType) return ''
  return userType
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}

// Get initials from name or fall back to email
function getInitials(name, email) {
  if (name && name.trim()) {
    return name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  }
  return (email || '?')[0].toUpperCase()
}

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth()

  const displayName = user?.name || user?.email || 'User'
  const role = formatRole(user?.userType)
  const initials = getInitials(user?.name, user?.email)

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-forty-primary text-white flex items-center justify-between px-4 lg:px-8 shadow-md">
      {/* Left side: Hamburger (Mobile) + Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 w-64 lg:w-96">
          <Search size={18} className="text-white/70" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-white/60 w-full"
          />
        </div>
      </div>

      {/* Right side: Notifications, Language, Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Language */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
          <Globe size={18} />
          <span className="text-xs font-medium uppercase">EN</span>
          <ChevronDown size={14} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 border-2 border-forty-primary text-[10px] font-bold flex items-center justify-center rounded-full">
            2
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-white/20 mx-1 hidden sm:block"></div>

        {/* Profile */}
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-white/10 transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold leading-none">{displayName}</p>
            <p className="text-[10px] text-white/70">{role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold uppercase overflow-hidden border border-white/30">
            {initials}
          </div>
          <ChevronDown size={14} className="text-white/70" />
        </button>
      </div>
    </header>
  )
}
