import { useState } from "react";
import { DollarSign, Package, TrendingUp, AlertTriangle, ArrowRight, X, Plus } from "lucide-react";
// 1. Import your AddProduct component

import AddProduct from "../components/modals/AddProduct";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { title: "Today's Sales", value: "KSh 45,231", icon: <DollarSign size={20} />, color: "bg-emerald-500", trend: "+12% from yesterday" },
    { title: "Total Revenue (Month)", value: "KSh 1.2M", icon: <TrendingUp size={24} />, color: "bg-teal-500", trend: "+4% from last month" },
    { title: "Products in Stock", value: "3,421", icon: <Package size={24} />, color: "bg-blue-500", trend: "Across 145 categories" },
    { title: "Low Stock Alerts", value: "12", icon: <AlertTriangle size={24} />, color: "bg-rose-500", trend: "Requires immediate attention" },
  ];

  return (
    <div className="relative space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-sm text-slate-500">Welcome back, Admin.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl text-white ${stat.color} shadow-sm`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-4 pt-4 border-t border-slate-100">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Sales</h3>
          <div className="h-48 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Sales visualization goes here</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 transition-colors">
              <span className="font-bold text-sm">Create New Sale (POS)</span>
              <ArrowRight size={18} />
            </button>
            
            {/* Trigger for AddProduct */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 transition-all group"
            >
              <span className="font-bold text-sm">Add New Product</span>
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
              <span className="font-bold text-sm">Record Expense</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. The Modal Wrapper */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            {/* 3. Render the imported AddProduct component */}
            <div className="p-2">
               <AddProduct closeModal={() => setIsModalOpen(false)} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}