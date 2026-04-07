import { Shield, Key, Bell, Store, Smartphone } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-sm text-slate-500">Manage your security preferences and system settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Settings Navigation Sidebar (Inner) */}
        <div className="w-full md:w-64 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-teal-600 border-l-2 border-teal-500 rounded-r-xl shadow-sm text-sm font-bold transition-all">
            <Shield size={18} /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border-l-2 border-transparent rounded-r-xl text-sm font-medium transition-all">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border-l-2 border-transparent rounded-r-xl text-sm font-medium transition-all">
            <Store size={18} /> Store Preferences
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* Change Password Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Key size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
                <p className="text-xs text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
              </div>
            </div>

            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
              </div>
              <div className="pt-2">
                <button type="button" className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Two-Factor Authentication Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-50 rounded-xl text-teal-600"><Smartphone size={24} /></div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Two-Factor Authentication</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">Add an extra layer of security to your account by requiring a code from your mobile device.</p>
              </div>
            </div>
            <button className="px-5 py-2 border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all whitespace-nowrap">
              Enable 2FA
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}