import { Plus, Search, FileText, ArrowUpRight } from "lucide-react";

export default function Sales() {
  const salesData = [
    { id: "INV-2024-001", date: "Today, 10:45 AM", customer: "Walk-in Customer", total: "KSh 2,450", method: "M-Pesa" },
    { id: "INV-2024-002", date: "Today, 09:12 AM", customer: "Jane Doe", total: "KSh 8,200", method: "Card" },
    { id: "INV-2024-003", date: "Yesterday", customer: "Walk-in Customer", total: "KSh 450", method: "Cash" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sales History</h1>
          <p className="text-sm text-slate-500">View all transactions and generate receipts.</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
          <Plus size={18} /> New Sale (POS)
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <input type="text" placeholder="Search by Invoice ID or Customer..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500" />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {salesData.map((sale, index) => (
                <tr key={index} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-teal-600">{sale.id}</td>
                  <td className="px-6 py-4 text-slate-600">{sale.date}</td>
                  <td className="px-6 py-4 text-slate-800 font-medium">{sale.customer}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold">{sale.method}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-slate-800">{sale.total}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate-400 hover:text-teal-600 p-2"><FileText size={18}/></button>
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