import React, { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Package, AlertTriangle, History, RefreshCw } from "lucide-react";

export default function Stock() {
  // Mock data for stock levels
  const [stockItems, setStockItems] = useState([
    { id: "STK-01", name: "Amoxicillin 500mg", currentStock: 145, minThreshold: 50, unit: "Boxes", lastRestocked: "2026-03-15" },
    { id: "STK-02", name: "Paracetamol 500mg", currentStock: 8, minThreshold: 100, unit: "Blisters", lastRestocked: "2026-01-10" },
    { id: "STK-03", name: "Vitamin C Zinc", currentStock: 0, minThreshold: 30, unit: "Bottles", lastRestocked: "2025-12-20" },
    { id: "STK-04", name: "Cetirizine 10mg", currentStock: 89, minThreshold: 40, unit: "Boxes", lastRestocked: "2026-02-28" },
  ]);

  // Analytics Calculations
  const outOfStockCount = stockItems.filter(i => i.currentStock === 0).length;
  const lowStockCount = stockItems.filter(i => i.currentStock > 0 && i.currentStock < i.minThreshold).length;

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-slate-50 min-h-screen animate-in fade-in duration-700">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Stock Management</h1>
        <p className="text-sm text-slate-500">Track inventory movement and reorder points.</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Items</p>
            <p className="text-2xl font-black text-slate-800">{stockItems.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Alerts</p>
            <p className="text-2xl font-black text-amber-600">{lowStockCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 border-l-4 border-l-rose-500">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
            <ArrowDownLeft size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Out of Stock</p>
            <p className="text-2xl font-black text-rose-600">{outOfStockCount}</p>
          </div>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <History size={18} className="text-slate-400" /> Inventory Health
          </h2>
          <button className="text-teal-600 text-sm font-bold flex items-center gap-1 hover:underline">
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                <th className="px-8 py-4">Item Details</th>
                <th className="px-8 py-4 text-center">Status</th>
                <th className="px-8 py-4">Current Qty</th>
                <th className="px-8 py-4">Min. Threshold</th>
                <th className="px-8 py-4">Last Restock</th>
                <th className="px-8 py-4 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stockItems.map((item) => {
                const isOut = item.currentStock === 0;
                const isLow = item.currentStock > 0 && item.currentStock < item.minThreshold;

                return (
                  <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] font-mono text-slate-400 uppercase">{item.id}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        isOut ? "bg-rose-100 text-rose-600" : 
                        isLow ? "bg-amber-100 text-amber-600" : 
                        "bg-emerald-100 text-emerald-600"
                      }`}>
                        {isOut ? "Critically Empty" : isLow ? "Low Level" : "Sufficient"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isOut ? "text-rose-600" : "text-slate-700"}`}>
                          {item.currentStock}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{item.unit}</span>
                      </div>
                      {/* Visual progress bar */}
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isOut ? "w-0" : isLow ? "bg-amber-500 w-1/4" : "bg-emerald-500 w-3/4"}`}
                        ></div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">
                      {item.minThreshold} {item.unit}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500">
                      {item.lastRestocked}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="bg-slate-800 hover:bg-slate-900 text-white p-2 rounded-xl transition-all shadow-sm active:scale-95">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}