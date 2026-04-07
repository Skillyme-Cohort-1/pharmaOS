import { X, Save, Truck, Building2, Phone, Mail, MapPin, Hash } from "lucide-react";

export default function AddNewSupplier({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20">
              <Truck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Register Supplier</h2>
              <p className="text-xs text-slate-500 font-medium">Add a new vendor or pharmaceutical distributor.</p>
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
        <form className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Company Name */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Company Name</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. MedCorp Kenya Ltd" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all text-sm font-semibold"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Supplier Category</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition-all text-sm font-semibold appearance-none">
                <option>Wholesale Distributor</option>
                <option>Direct Manufacturer</option>
                <option>Local Importer</option>
                <option>Surgical Equipment</option>
              </select>
            </div>

            {/* Tax ID / KRA PIN */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">KRA PIN / Tax ID</label>
              <div className="relative">
                <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="P05..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-600 outline-none text-sm font-semibold" />
              </div>
            </div>

            {/* Contact Email */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Sales Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" placeholder="orders@medcorp.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-600 outline-none text-sm font-semibold" />
              </div>
            </div>

            {/* Contact Phone */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Contact Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="+254..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-600 outline-none text-sm font-semibold" />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Physical Address</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-3.5 text-slate-400" />
                <textarea 
                  rows="2"
                  placeholder="Street, City, Building Floor..." 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-600 outline-none text-sm font-semibold"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Save size={18} /> Register Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}