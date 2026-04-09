import { useState } from "react";
import { ArrowLeft, Plus, Search, Filter, MoreVertical, TrendingUp, TrendingDown, Wallet, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
// Import the AddRecord modal component
import AddRecord from "../components/modals/AddRecord";

export default function Finance() {
  // Added state for our new dropdown filter
  const [filterType, setFilterType] = useState("All");
  
  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy data for financial transactions (Added a Tax record)
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
    },
    {
      id: "TRX-084",
      date: "31 Mar 2026",
      description: "Quarterly VAT Payment",
      category: "Government Duties",
      type: "Tax",
      amount: "KSh 18,500",
      status: "Completed"
    }
  ];

  // Logic to filter the table based on the dropdown selection
  const filteredTransactions = transactions.filter(trx => {
    if (filterType === "All") return true;
    return trx.type === filterType;
  });

  // Handler for saving a new record
  const handleSaveRecord = (newRecord) => {
    console.log("New record submitted:", newRecord);
    // You would typically add the new record to your state/database here.
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto relative">
      
      {/* Header & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Title & Back Button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2.5 sm:px-4 sm:py-2.5 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600 transition-all font-bold text-sm shrink-0"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          
          <div className="pl-2 sm:pl-4 border-l-2 border-slate-100">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Financial Ledger</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Track your pharmacy&apos;s cash flow, incomes, and expenses.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <button className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
            <Download size={18} /> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm shadow-teal-600/20"
          >
            <Plus size={18} /> Add Record
          </button>
        </div>
      </div>

      {/* Mini Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Income</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">KSh 342,500</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Expenses</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">KSh 128,400</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Balance</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">KSh 214,100</h3>
          </div>
        </div>
      </div>

      {/* Toolbar with New Dropdown */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search transactions by description or ID..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors font-medium"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        
        {/* Functional Filter Dropdown */}
        <div className="relative w-full sm:w-auto">
          <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto pl-10 pr-10 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 focus:outline-none focus:border-teal-500 appearance-none bg-white transition-colors cursor-pointer"
          >
            <option value="All">All Records</option>
            <option value="Income">Income</option>
            <option value="Expense">Expenses</option>
            <option value="Tax">Tax</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
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
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-medium text-sm">
                    No transactions found for "{filterType}".
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    {/* Date & Description */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{trx.description}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{trx.id} • {trx.date}</p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {trx.category}
                    </td>

                    {/* Type Badge - Updated with Tax color scheme */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        trx.type === "Income" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : trx.type === "Tax"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-rose-100 text-rose-700"
                      }`}>
                        {trx.type === "Income" && <TrendingUp size={12} />}
                        {trx.type === "Expense" && <TrendingDown size={12} />}
                        {trx.type === "Tax" && <FileText size={12} />}
                        {trx.type}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className={`px-6 py-4 text-right text-sm font-bold ${
                      trx.type === "Income" ? "text-emerald-600" : trx.type === "Tax" ? "text-purple-600" : "text-rose-600"
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
                      <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors inline-flex justify-center items-center">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-slate-500 font-medium">
          Note: This ledger reflects cash and bank transactions recorded manually or through the POS system.
        </p>
        <button className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline w-full sm:w-auto text-left sm:text-right">
          View Reconciliation Report
        </button>
      </div>

      {/* The Add Record Modal Component */}
      {isModalOpen && (
        <AddRecord 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveRecord} 
        />
      )}
    </div>
  );
}