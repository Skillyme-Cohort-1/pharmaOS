import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  Package, 
  CheckCircle 
} from "lucide-react";
import AddProduct from "../components/modals/AddProduct";

export default function Products() {
  // 1. Initial State
  const [products, setProducts] = useState([
    { id: "PRD-001", name: "Amoxicillin 500mg", category: "Antibiotics", price: "KSh 850", stock: 145, expiryDate: "2026-10-12" },
    { id: "PRD-002", name: "Paracetamol 500mg", category: "Painkillers", price: "KSh 150", stock: 9, expiryDate: "2026-08-20" },
    { id: "PRD-003", name: "Vitamin C Zinc", category: "Supplements", price: "KSh 1,200", stock: 0, expiryDate: "2026-12-01" },
    { id: "PRD-004", name: "Cetirizine 10mg", category: "Antihistamine", price: "KSh 300", stock: 89, expiryDate: "2024-01-01" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Logic to determine the Flag/Status based on business rules
  const getProductStatus = (stock, expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffInDays = Math.ceil((expiry - today) / (1000 * 3600 * 24));

    if (expiry < today) {
      return { label: "Expired", color: "bg-rose-100 text-rose-700", icon: <XCircle size={12} />, key: "expired" };
    }
    if (diffInDays <= 30) {
      return { label: "Expiring Soon", color: "bg-orange-100 text-orange-700", icon: <Calendar size={12} />, key: "expiring_soon" };
    }
    if (stock === 0) {
      return { label: "Out of Stock", color: "bg-slate-200 text-slate-700", icon: <Package size={12} />, key: "out_of_stock" };
    }
    if (stock < 10) {
      return { label: "Limited Stock", color: "bg-amber-100 text-amber-700", icon: <AlertTriangle size={12} />, key: "limited_stock" };
    }
    
    return { label: "In Stock", color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle size={12} />, key: "all" };
  };

  // 3. Filtered List Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const statusObj = getProductStatus(p.stock, p.expiryDate);
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      if (activeFilter === "all") return true;
      return statusObj.key === activeFilter;
    });
  }, [products, searchTerm, activeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Products Catalog</h1>
          <p className="text-sm text-slate-500">Monitor expiry dates and stock levels across your pharmacy.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        
        {/* Toolbar: Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <input 
              type="text" 
              placeholder="Search products by name or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 px-3 rounded-xl border border-slate-200">
            <Filter size={16} className="text-slate-400" />
            <select 
              className="bg-transparent text-slate-600 rounded-xl text-sm font-medium py-2.5 outline-none w-full cursor-pointer"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Inventory</option>
              <option value="expired">Expired 🔴</option>
              <option value="expiring_soon">Expiring Soon 🟠</option>
              <option value="limited_stock">Limited Stock 🟡</option>
              <option value="out_of_stock">Out of Stock ⚫</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="px-6 py-4">Medicine Info</th>
                  <th className="px-6 py-4">Inventory Details</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Alert Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const status = getProductStatus(product.stock, product.expiryDate);
                    return (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{product.name}</p>
                          <p className="text-[10px] font-mono text-slate-400">{product.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-700 font-semibold">{product.stock} Units</p>
                          <p className="text-[11px] text-slate-500 italic">Expires: {product.expiryDate}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{product.price}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-sm">
                      No products found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProduct 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}