import { Plus, Search, Filter, MoreVertical, Mail, Phone } from "lucide-react";

export default function Customers() {
  // Dummy data for design purposes
  const customers = [
    { 
      id: "CST-001", 
      name: "Sarah Johnson", 
      email: "sarah.j@example.com", 
      phone: "+254 711 222 333", 
      visits: 14, 
      totalSpent: "KSh 45,200", 
      status: "Active" 
    },
    { 
      id: "CST-002", 
      name: "Michael Ochieng", 
      email: "mochieng@email.com", 
      phone: "+254 722 333 444", 
      visits: 3, 
      totalSpent: "KSh 8,500", 
      status: "Active" 
    },
    { 
      id: "CST-003", 
      name: "Grace Wanjiku", 
      email: "grace.w@example.com", 
      phone: "+254 733 444 555", 
      visits: 8, 
      totalSpent: "KSh 21,000", 
      status: "Active" 
    },
    { 
      id: "CST-004", 
      name: "David Kimani", 
      email: "No email provided", 
      phone: "+254 799 888 777", 
      visits: 1, 
      totalSpent: "KSh 1,200", 
      status: "Inactive" 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers Directory</h1>
          <p className="text-sm text-slate-500">Manage your patients, contact information, and purchase history.</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search by customer name, phone, or email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 text-center">Store Visits</th>
                <th className="px-6 py-4 text-right">Total Spent</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name & ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{customer.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{customer.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail size={14} className="text-slate-400" />
                        {customer.email}
                      </div>
                    </div>
                  </td>

                  {/* Visits */}
                  <td className="px-6 py-4 text-center text-sm font-medium text-slate-600">
                    {customer.visits}
                  </td>

                  {/* Total Spent */}
                  <td className="px-6 py-4 text-right text-sm font-bold text-slate-700">
                    {customer.totalSpent}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      customer.status === "Active" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {customer.status}
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