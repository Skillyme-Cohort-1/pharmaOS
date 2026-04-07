import { Plus, Search, Filter, MoreVertical, TrendingUp, TrendingDown, Wallet, Download } from "lucide-react";

export default function Finance() {
  // Dummy data for financial transactions
  const transactions = [
    {
      id: "TRX-089",
      date: "07 Apr 2026",
      description: "Daily POS Sales",
      category: "Sales Revenue",
      type: "Income",
      amount: "KSh 45,231",
      status: "Completed"
    },
    {
      id: "TRX-088",
      date: "06 Apr 2026",
      description: "MedCorp Pharmaceuticals",
      category: "Inventory Purchase",
      type: "Expense",
      amount: "KSh 12,500",
      status: "Completed"
    },
    {
      id: "TRX-087",
      date: "05 Apr 2026",
      description: "Monthly Rent",
      category: "Operating Expense",
      type: "Expense",
      amount: "KSh 35,000",
      status: "Completed"
    },
    {
      id: "TRX-086",
      date: "05 Apr 2026",
      description: "Consultation Fees",
      category: "Service Revenue",
      type: "Income",
      amount: "KSh 8,400",
      status: "Completed"
    },
    {
      id: "TRX-085",
      date: "01 Apr 2026",
      description: "Electricity Bill",
      category: "Utilities",
      type: "Expense",
      amount: "KSh 4,200",
      status: "Pending"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financial Ledger</h1>
          {/* Using &apos; to prevent JSX syntax errors with the word "pharmacy's" */}
          <p className="text-sm text-slate-500">Track your pharmacy&apos;s cash flow, incomes, and expenses.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors">
            <Download size={18} /> Export
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20 w-full sm:w-auto justify-center">
            <Plus size={18} /> Add Record
          </button>
        </div>
      </div>

      {/* Mini Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Income</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">KSh 342,500</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Expenses</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">KSh 128,400</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Balance</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">KSh 214,100</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search transactions by description or ID..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Filter size={16} /> Filter Records
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((trx, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  {/* Date & Description */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{trx.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{trx.id} • {trx.date}</p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {trx.category}
                  </td>

                  {/* Type Badge */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      trx.type === "Income" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-rose-100 text-rose-700"
                    }`}>
                      {trx.type === "Income" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {trx.type}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className={`px-6 py-4 text-right text-sm font-bold ${
                    trx.type === "Income" ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {trx.type === "Income" ? "+" : "-"}{trx.amount}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-md ${
                      trx.status === "Completed" 
                        ? "bg-slate-100 text-slate-600" 
                        : "bg-amber-100 text-amber-700 animate-pulse"
                    }`}>
                      {trx.status}
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
      
      {/* Footer Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">
          Note: This ledger reflects cash and bank transactions recorded manually or through the POS system.
        </p>
        <button className="text-xs font-bold text-teal-600 hover:underline">
          View Reconciliation Report
        </button>
      </div>
    </div>
  );
}