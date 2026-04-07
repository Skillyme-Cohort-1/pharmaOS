import { Search, Filter, MoreVertical, AlertTriangle, PackageOpen, CalendarClock, ArrowRightLeft, Plus } from "lucide-react";

export default function Inventory() {
  // Dummy data tailored for pharmacy stock management
  const inventoryItems = [
    {
      id: "PRD-001",
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      batch: "BTH-9921",
      expiry: "12 Oct 2027",
      quantity: 340,
      status: "Good"
    },
    {
      id: "PRD-002",
      name: "Paracetamol 500mg",
      category: "Painkillers",
      batch: "BTH-8843",
      expiry: "05 May 2026",
      quantity: 15,
      status: "Low Stock"
    },
    {
      id: "PRD-003",
      name: "Cough Syrup (Pediatric)",
      category: "Cold & Flu",
      batch: "BTH-7712",
      expiry: "20 Apr 2026", // Expiring very soon!
      quantity: 45,
      status: "Expiring Soon"
    },
    {
      id: "PRD-004",
      name: "Vitamin C + Zinc",
      category: "Supplements",
      batch: "BTH-6654",
      expiry: "01 Mar 2026", // Already expired
      quantity: 120,
      status: "Expired"
    },
    {
      id: "PRD-005",
      name: "Omeprazole 20mg",
      category: "Antacids",
      batch: "BTH-5590",
      expiry: "15 Nov 2028",
      quantity: 0,
      status: "Out of Stock"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Stock & Inventory</h1>
          <p className="text-sm text-slate-500">Manage batches, track expiry dates, and perform stocktakes.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors">
            <ArrowRightLeft size={18} /> Adjust Stock
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20 w-full sm:w-auto justify-center">
            <Plus size={18} /> Receive Stock
          </button>
        </div>
      </div>

      {/* Pharmacy-Specific Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <PackageOpen size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Items</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">3,421</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-200 bg-amber-50/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <CalendarClock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Expiring in 30 Days</p>
            <h3 className="text-xl font-black text-amber-900 mt-0.5">14 Batches</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-200 bg-rose-50/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wider">Low / Out of Stock</p>
            <h3 className="text-xl font-black text-rose-900 mt-0.5">28 Items</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search by medicine, SKU, or Batch No..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Filter size={16} /> Filter by Status
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Batch No.</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventoryItems.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name & ID */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.id} • {item.category}</p>
                  </td>

                  {/* Batch */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {item.batch}
                    </span>
                  </td>

                  {/* Expiry Date */}
                  <td className={`px-6 py-4 text-sm font-bold ${
                    item.status === "Expired" ? "text-rose-600" :
                    item.status === "Expiring Soon" ? "text-amber-600" :
                    "text-slate-600"
                  }`}>
                    {item.expiry}
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-slate-800">
                      {item.quantity}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      item.status === "Good" ? "bg-emerald-100 text-emerald-700" :
                      item.status === "Low Stock" ? "bg-amber-100 text-amber-700" :
                      item.status === "Expiring Soon" ? "bg-orange-100 text-orange-700" :
                      item.status === "Expired" ? "bg-rose-100 text-rose-700" :
                      "bg-slate-100 text-slate-600" // Out of stock
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}