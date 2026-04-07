import { Plus, Search, Filter, MoreVertical, Truck, Calendar, CreditCard, CheckCircle2, Clock } from "lucide-react";

export default function Purchases() {
  // Dummy data for pharmacy procurement
  const purchaseOrders = [
    {
      id: "PO-2026-001",
      supplier: "MedCorp Pharmaceuticals",
      date: "07 Apr 2026",
      items: 12,
      total: "KSh 85,400",
      paymentStatus: "Paid",
      deliveryStatus: "Delivered"
    },
    {
      id: "PO-2026-002",
      supplier: "Global Health Supplies",
      date: "05 Apr 2026",
      items: 5,
      total: "KSh 12,200",
      paymentStatus: "Pending",
      deliveryStatus: "In Transit"
    },
    {
      id: "PO-2026-003",
      supplier: "Surgeons Choice Ltd",
      date: "01 Apr 2026",
      items: 24,
      total: "KSh 150,000",
      paymentStatus: "Partial",
      deliveryStatus: "Delivered"
    },
    {
      id: "PO-2026-004",
      supplier: "Astra Wholesale",
      date: "28 Mar 2026",
      items: 8,
      total: "KSh 4,500",
      paymentStatus: "Paid",
      deliveryStatus: "Delivered"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Purchase Orders</h1>
          <p className="text-sm text-slate-500">Track wholesale orders and incoming stock from suppliers.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20 w-full sm:w-auto justify-center">
            <Plus size={18} /> New Purchase Order
          </button>
        </div>
      </div>

      {/* Procurement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pending Delivery</p>
            <h4 className="text-lg font-black text-slate-800">03</h4>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Unpaid Invoices</p>
            <h4 className="text-lg font-black text-slate-800">KSh 42k</h4>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Completed (Mo)</p>
            <h4 className="text-lg font-black text-slate-800">18</h4>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><CreditCard size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Spent (Mo)</p>
            <h4 className="text-lg font-black text-slate-800">KSh 250k</h4>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search PO number or supplier..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">PO Number & Date</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4 text-center">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {purchaseOrders.map((po, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <p className="font-bold text-slate-800">{po.id}</p>
                    <p className="text-xs text-slate-500">{po.date}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-teal-700">{po.supplier}</td>
                  <td className="px-6 py-4 text-center text-sm">{po.items}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">{po.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded ${
                      po.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {po.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
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