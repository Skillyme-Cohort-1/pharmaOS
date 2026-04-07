import { X, Save, Package, Hash, Layers, DollarSign, AlertCircle } from "lucide-react";

export default function AddProduct({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-600/20">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Add New Product</h2>
              <p className="text-xs text-slate-500 font-medium">Register a new medicine in the master catalog.</p>
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
            
            {/* Basic Info */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Product Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Amoxicillin 500mg" 
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Category</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 outline-none transition-all text-sm font-semibold appearance-none">
                <option>Tablets</option>
                <option>Syrup / Liquids</option>
                <option>Injections</option>
                <option>Surgicals</option>
                <option>Cold Chain</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">SKU / Barcode</label>
              <div className="relative">
                <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Scan or type..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 outline-none text-sm font-semibold" />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Unit Selling Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">KSh</span>
                <input type="number" placeholder="0.00" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 outline-none text-sm font-semibold" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Reorder Level</label>
              <div className="relative">
                <AlertCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                <input type="number" placeholder="e.g. 50" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 outline-none text-sm font-semibold" />
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
              className="flex-[2] px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
            >
              <Save size={18} /> Save Product to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}