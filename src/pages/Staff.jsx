import React, { useState } from "react";
import { Plus, Search, Filter, MoreVertical, ShieldCheck, UserCheck, Mail, Phone, BadgeCheck } from "lucide-react";
import AddNewStaff from "../components/modals/AddNewStaff";

export default function Staff() {
  // 1. State for controlling the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Dummy data for Pharmacy Team
  const team = [
    {
      id: "STF-001",
      name: "Dr. Maxwell Otieno",
      role: "Head Pharmacist",
      status: "Active",
      email: "maxwell.o@pharmacy.com",
      phone: "+254 700 111 222",
      shift: "Day Shift",
      access: "Admin"
    },
    {
      id: "STF-002",
      name: "Sarah Wanjiku",
      role: "Pharmacy Technician",
      status: "Active",
      email: "sarah.w@pharmacy.com",
      phone: "+254 700 333 444",
      shift: "Day Shift",
      access: "Standard"
    },
    {
      id: "STF-003",
      name: "Kevin Kiprop",
      role: "Inventory Manager",
      status: "On Leave",
      email: "kevin.k@pharmacy.com",
      phone: "+254 700 555 666",
      shift: "Night Shift",
      access: "Standard"
    },
    {
      id: "STF-004",
      name: "Lydia Mutua",
      role: "Cashier",
      status: "Active",
      email: "lydia.m@pharmacy.com",
      phone: "+254 700 777 888",
      shift: "Day Shift",
      access: "POS Only"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Management</h1>
          <p className="text-sm text-slate-500">Manage pharmacy employees, roles, and system access permissions.</p>
        </div>
        {/* Trigger the Modal on Click */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20"
        >
          <Plus size={18} /> Add New Staff
        </button>
      </div>

      {/* Staff Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">12 Members</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admins</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">02 Members</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BadgeCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">On Shift Now</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">08 Members</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search staff by name or role..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Filter size={16} /> Filter Team
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role & Shift</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Access Level</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((member, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{member.name}</p>
                        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-teal-700">{member.role}</p>
                    <p className="text-xs text-slate-500">{member.shift}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Phone size={12} className="text-slate-400" />
                        {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail size={12} className="text-slate-400" />
                        {member.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                      member.access === "Admin" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                    }`}>
                      {member.access}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      member.status === "Active" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {member.status}
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

      {/* 3. The Modal Component */}
      <AddNewStaff 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}