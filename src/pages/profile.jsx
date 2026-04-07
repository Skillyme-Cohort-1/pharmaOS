import { User, Mail, Phone, MapPin, Building, Camera, ShieldCheck } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-sm text-slate-500">Manage your personal information and pharmacy details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: User ID Card */}
        <div className="col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-teal-500 to-teal-700"></div>
          <div className="px-6 pb-6 relative">
            <div className="w-20 h-20 bg-white rounded-full p-1 shadow-md absolute -top-10 left-6">
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400 relative group cursor-pointer">
                <User size={32} />
                <div className="absolute inset-0 bg-black/40 rounded-full hidden group-hover:flex items-center justify-center transition-all">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-800">Admin User</h2>
              <p className="text-sm text-teal-600 font-medium">Pharmacy Owner</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                admin@fortypharma.com
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                +254 700 000 000
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck size={16} className="text-green-500" />
                Account Verified
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Details Form */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Business Information</h3>
          
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">First Name</label>
                <input type="text" defaultValue="Admin" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" defaultValue="User" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pharmacy Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Building size={16} /></span>
                <input type="text" defaultValue="FortyPharma Central" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Location Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={16} /></span>
                <input type="text" defaultValue="123 Health Ave, Medical District" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-teal-600/20">
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}