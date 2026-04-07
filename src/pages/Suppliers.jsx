import React, { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Building2, User, Phone, Globe, ShieldCheck } from "lucide-react";
import AddNewSupplier from "../components/modals/AddNewSupplier";

export default function Suppliers() {
  // 1. Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Dummy data for pharmaceutical wholesalers
  const suppliers = [
    {
      id: "SUP-001",
      company: "MedCorp Pharmaceuticals",
      category: "General Medicines",
      contactPerson: "Alice Mwangi",
      phone: "+254 711 000 111",
      email: "orders@medcorp.co.ke",
      status: "Verified",
      creditLimit: "KSh 500,000"
    },
    {
      id: "SUP-002",
      company: "Astra Surgical Supplies",
      category: "Surgical Equipment",
      contactPerson: "John Doe",
      phone: "+254 722 000 222",
      email: "sales@astrasurgical.com",
      status: "Verified",
      creditLimit: "KSh 1.2M"
    },
    {
      id: "SUP-003",
      company: "ColdChain Biologics",
      category: "Vaccines & Insulin",
      contactPerson: "Dr. Sarah Lee",
      phone: "+254 733 000 333",
      email: "logistics@coldchain.ke",
      status: "On Hold",
      creditLimit: "KSh 200,000"
    },
    {
      id: "SUP-004",
      company: "Global Generics Ltd",
      category: "Generics",
      contactPerson: "Robert Chen",
      phone: "+254 788 000 888",
      email: "info@globalgenerics.com",
      status: "Verified",
      creditLimit: "KSh 750,000"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Suppliers & Vendors</h1>
          <p className="text-sm text-slate-500">Manage procurement sources and wholesaler contact details.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20"
        >
          <Plus size={18} /> Add New Supplier
        </button>
      </div>

      {/* Supplier Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Vendors</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">42</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Sources</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">38</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">International Partners</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">05</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search by company or contact person..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 w-full sm:w-auto justify-center transition-colors">
          <Filter size={16} /> Filter List
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Company & Category</th>
                <th className="px-6 py-4">Contact Person</th>
                <th className="px-6 py-4">Phone & Email</th>
                <th className="px-6 py-4">Credit Limit</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suppliers.map((supplier, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{supplier.company}</p>
                        <p className="text-[11px] text-teal-600 font-bold uppercase tracking-wide">{supplier.category}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <User size={14} className="text-slate-400" />
                      {supplier.contactPerson}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                        <Phone size={12} className="text-slate-400" />
                        {supplier.phone}
                      </div>
                      <p className="text-[11px] text-slate-500 ml-5 font-medium">{supplier.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-slate-700">{supplier.creditLimit}</p>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      supplier.status === "Verified" 
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}>
                      {supplier.status}
                    </span>
                  </td>

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

      {/* Add Supplier Modal */}
      <AddNewSupplier 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}