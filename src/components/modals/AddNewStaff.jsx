import { X, Save, User, Shield, Briefcase, Phone, Mail, Clock } from "lucide-react";

export default function AddNewStaff({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Responsive outer padding: p-0 on mobile, p-4 on desktop
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Mobile structural changes: Full height, flat corners, flex-col for scrolling */}
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] max-w-2xl rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        {/* Reduced padding on mobile, shrink-0 keeps it fixed at the top */}
        <div className="px-4 py-4 sm:px-8 sm:py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Register New Staff</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden sm:block">Add a new member to your pharmacy team.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Form */}
        {/* flex-1 and overflow-y-auto allows internal scrolling on small screens */}
        <form className="p-4 sm:p-8 space-y-5 sm:space-y-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Full Name */}
            <div className="space-y-2 sm:space-y-3 md:col-span-2">
              <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Jane Doe" 
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm font-semibold"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" placeholder="jane@pharmacy.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-semibold" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="+254..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-semibold" />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Job Role</label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-semibold appearance-none">
                  <option>Pharmacist</option>
                  <option>Pharmacy Tech</option>
                  <option>Cashier</option>
                  <option>Inventory Manager</option>
                </select>
              </div>
            </div>

            {/* Shift */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Shift Schedule</label>
              <div className="relative">
                <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-semibold appearance-none">
                  <option>Day Shift (8am - 5pm)</option>
                  <option>Night Shift (5pm - 8am)</option>
                  <option>Locum / Part-time</option>
                </select>
              </div>
            </div>

            {/* Access Level */}
            {/* Changed from grid-cols-3 to grid-cols-1 on mobile so buttons don't get squished */}
            <div className="space-y-2 sm:space-y-3 md:col-span-2">
              <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">System Access Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
                {['Admin', 'Standard', 'POS Only'].map((level) => (
                  <label key={level} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all">
                    <input type="radio" name="access" value={level} className="accent-blue-600" />
                    <span className="text-xs font-bold text-slate-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {/* Stacked on mobile (flex-col-reverse) with Primary action at the top */}
          <div className="pt-6 sm:pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-auto">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 sm:py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] px-6 py-3.5 sm:py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Save size={18} /> Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}