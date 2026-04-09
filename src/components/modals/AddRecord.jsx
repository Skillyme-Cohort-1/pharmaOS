import React, { useState } from "react";
import { X, DollarSign } from "lucide-react";

export default function AddRecord({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    type: "Income",
    amount: "",
    category: "Sales",
    date: new Date().toISOString().split("T")[0], // Defaults to today
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data back to the Finance component
    if (onSave) {
      onSave(formData);
    }
    // Close the modal
    onClose();
  };

  // Categories change based on whether it's Income or Expense
  const categories = formData.type === "Income" 
    ? ["Sales", "Consultation", "Refunds", "Other Income"]
    : ["Supplier Payment", "Utilities", "Salaries", "Rent", "Maintenance", "Other Expense"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Add Financial Record</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-4">
            
            {/* Type (Income vs Expense) */}
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer relative">
                <input 
                  type="radio" 
                  name="type" 
                  value="Income" 
                  checked={formData.type === "Income"} 
                  onChange={handleChange}
                  className="peer sr-only" 
                />
                <div className="w-full text-center py-2 px-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 peer-checked:bg-teal-50 peer-checked:text-teal-600 peer-checked:border-teal-200 transition-all">
                  Income
                </div>
              </label>
              <label className="flex-1 cursor-pointer relative">
                <input 
                  type="radio" 
                  name="type" 
                  value="Expense" 
                  checked={formData.type === "Expense"} 
                  onChange={handleChange}
                  className="peer sr-only" 
                />
                <div className="w-full text-center py-2 px-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 peer-checked:bg-red-50 peer-checked:text-red-600 peer-checked:border-red-200 transition-all">
                  Expense
                </div>
              </label>
            </div>

            {/* Amount & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <DollarSign size={16} />
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief details about this transaction..."
                rows="3"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
              ></textarea>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-colors"
            >
              Save Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}