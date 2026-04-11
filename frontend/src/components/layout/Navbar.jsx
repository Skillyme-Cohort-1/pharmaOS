import { useState, useRef, useEffect } from 'react'
import { Bell, Menu, Search, ChevronDown, Globe, Settings, LogOut, User, CheckCheck, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAlerts } from '../../hooks/useAlerts'
import { alertsApi } from '../../services/api'

function formatRole(userType) {
  if (!userType) return ''
  return userType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function getInitials(name, email) {
  if (name && name.trim()) {
    return name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  }
  return (email || '?')[0].toUpperCase()
}

function alertTypeColor(type) {
  if (type === 'expired') return 'bg-red-100 text-red-600'
  if (type === 'near_expiry') return 'bg-amber-100 text-amber-600'
  return 'bg-blue-100 text-blue-600'
}

/** Closes a dropdown when clicking outside its ref */
function useClickOutside(ref, onClose) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, onClose])
}

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { alerts, unreadCount, refetch } = useAlerts()

  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [markingAll, setMarkingAll] = useState(false)

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useClickOutside(notifRef, () => setShowNotifications(false))
  useClickOutside(profileRef, () => setShowProfile(false))

  const displayName = user?.name || user?.email || 'User'
  const role = formatRole(user?.userType)
  const initials = getInitials(user?.name, user?.email)

  const handleMarkAllRead = async () => {
    setMarkingAll(true)
    try {
      await alertsApi.markAllRead()
      refetch()
    } finally {
      setMarkingAll(false)
    }
  }

  const handleMarkOne = async (id) => {
    await alertsApi.markRead(id)
    refetch()
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    setSearchQuery('')
  }

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-forty-primary text-white flex items-center justify-between px-4 lg:px-8 shadow-md">

      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-white/10 transition-colors" aria-label="Toggle sidebar">
          <Menu size={24} />
        </button>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 w-64 lg:w-96">
          <Search size={18} className="text-white/70 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-white/60 w-full outline-none"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="text-white/60 hover:text-white transition-colors">
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2 md:gap-3">

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications(v => !v); setShowProfile(false) }}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 border-2 border-forty-primary text-[10px] font-bold flex items-center justify-center rounded-full px-0.5">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-900">Notifications</p>
                  {unreadCount > 0 && <p className="text-xs text-gray-400">{unreadCount} unread</p>}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    disabled={markingAll}
                    className="flex items-center gap-1 text-xs font-semibold text-forty-primary hover:text-forty-primary/80 transition-colors disabled:opacity-50"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Alert list */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {alerts.length === 0 ? (
                  <div className="py-10 text-center">
                    <Bell size={28} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-sm text-gray-400 font-medium">All caught up!</p>
                    <p className="text-xs text-gray-300 mt-0.5">No unread notifications</p>
                  </div>
                ) : (
                  alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                      <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${alertTypeColor(alert.type)}`}>
                        {alert.type === 'expired' ? '!' : alert.type === 'near_expiry' ? '~' : 'i'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-snug">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5 capitalize">{alert.type.replace(/_/g, ' ')}</p>
                      </div>
                      <button
                        onClick={() => handleMarkOne(alert.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-gray-500 transition-all shrink-0"
                        aria-label="Dismiss"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => { navigate('/inventory?status=expired'); setShowNotifications(false) }}
                  className="text-xs font-semibold text-forty-primary hover:underline w-full text-center"
                >
                  View all alerts in Inventory →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-white/20 hidden sm:block" />

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(v => !v); setShowNotifications(false) }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Profile menu"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">{displayName}</p>
              <p className="text-[10px] text-white/70">{role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold uppercase overflow-hidden border border-white/30 shrink-0">
              {initials}
            </div>
            <ChevronDown size={14} className={`text-white/70 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 bg-forty-primary/10 text-forty-primary text-[10px] font-bold rounded-full uppercase tracking-wide">
                  {role}
                </span>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={() => { navigate('/settings'); setShowProfile(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={16} className="text-gray-400" />
                  Settings
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => { logout(); setShowProfile(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
