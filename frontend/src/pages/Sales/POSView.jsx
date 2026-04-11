import { useState, useMemo } from 'react'
import { 
  Search, 
  ShoppingCart, 
  UserPlus, 
  Calculator, 
  Trash2, 
  Plus, 
  Minus, 
  Printer, 
  RotateCcw, 
  Save, 
  List, 
  History, 
  Power,
  X,
  ScanLine,
  ChevronDown
} from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import ProductCard from '../../components/ui/ProductCard'
import useLocalStorage from '../../hooks/useLocalStorage'
import { formatCurrency } from '../../utils/formatCurrency'

// --- Mock Products from Image ---
const MOCK_POS_PRODUCTS = [
  { id: '1', name: 'Paracetamol Tablets IP', price: 1638.75, stock: 120, image: '/images/products/placeholder.svg' },
  { id: '2', name: 'Curafin 5ml Syrup', price: 942.76, stock: 45, image: '/images/products/placeholder.svg' },
  { id: '3', name: 'Avaspray Nasal 120ml', price: 831.60, stock: 12, image: '/images/products/placeholder.svg' },
  { id: '4', name: 'Dupabaston 10mg', price: 847.11, stock: 0, image: '/images/products/placeholder.svg' },
  { id: '5', name: 'Omeprazole 20mg', price: 1007.60, stock: 500, image: '/images/products/placeholder.svg' },
  { id: '6', name: 'Coralcal DX Vital', price: 625.40, stock: 30, image: '/images/products/placeholder.svg' },
  { id: '7', name: 'Elvive Hair Care', price: 345, stock: 15, image: '/images/products/placeholder.svg' },
  { id: '8', name: 'Bizoran 10/20 MG', price: 648.66, stock: 8, image: '/images/products/placeholder.svg' },
  { id: '9', name: 'Vitalzin Multi-Syrup', price: 529.58, stock: 5, image: '/images/products/placeholder.svg' },
  { id: '10', name: 'Velkin Nasal Drop', price: 427.14, stock: 20, image: '/images/products/placeholder.svg' },
]

export default function POSView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [customer, setCustomer] = useState('Select Customer')
  const [receiveAmount, setReceiveAmount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(0)

  const addToCart = (product) => {
    if (product.stock <= 0) return
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1, batch: 'B' + Math.floor(Math.random() * 900 + 100) }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id))

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart])
  const total = useMemo(() => subtotal - discount + deliveryCost, [subtotal, discount, deliveryCost])
  const changeAmount = useMemo(() => Math.max(0, receiveAmount - total), [receiveAmount, total])
  const dueAmount = useMemo(() => Math.max(0, total - receiveAmount), [total, receiveAmount])

  return (
    <PageWrapper title="Sale New">
      <div className="flex flex-col xl:flex-row gap-6 min-h-[700px]">
        
        {/* Left Section: Product Browser */}
        <div className="flex-1 flex flex-col min-w-0 min-h-[400px]">
          <div className="flex flex-col gap-4 mb-4">
            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:ring-1 focus:ring-forty-primary outline-none text-gray-400">
                  <option>Select a category</option>
                  <option>Tablets</option>
                  <option>Syrups</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:ring-1 focus:ring-forty-primary outline-none text-gray-400">
                  <option>Select a Manufacturer</option>
                  <option>Abbott</option>
                  <option>GSK</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Scan / Search Product by Code or Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-forty-primary placeholder:text-gray-400"
                />
              </div>
              <button className="p-3 bg-forty-dark text-white rounded-lg hover:bg-black transition-colors shrink-0">
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 pr-2 custom-scrollbar pb-20">
            {MOCK_POS_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                image={product.image}
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Transaction Panel */}
        <div className="w-full xl:w-[500px] flex flex-col shrink-0">
          <div className="flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {/* Quick Actions & Header */}
            <div className="p-4 border-b border-gray-100">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-800">Quick Action</h3>
                  <div className="flex gap-1.5">
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">Stock List</button>
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">Today Sales</button>
                    <button className="p-2 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 transition-colors"><Calculator size={16} /></button>
                    <button className="p-2 bg-white border border-gray-200 rounded text-red-500 hover:bg-red-50 transition-colors"><Power size={16} /></button>
                  </div>
               </div>

               {/* Customer Selection */}
               <div className="flex gap-1">
                  <div className="relative flex-1">
                    <select
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-400 appearance-none focus:outline-none focus:ring-1 focus:ring-forty-primary"
                    >
                      <option>Select Customer</option>
                      <option>Nairobi Pharmacy</option>
                      <option>City Hospital</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <button className="p-2.5 bg-forty-dark text-white rounded-lg hover:bg-black transition-colors shadow-sm">
                    <Plus size={20} />
                  </button>
               </div>
            </div>

            {/* Transaction Table */}
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-100">
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 ">Image</th>
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 ">Items</th>
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 ">Batch</th>
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 ">Price</th>
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 ">Qty</th>
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 ">Sub Total</th>
                    <th className="px-3 py-3 text-xs uppercase font-black text-gray-800 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-20 text-center">
                        <div className="flex flex-col items-center opacity-20">
                          <ShoppingCart size={48} className="mb-2" />
                          <p className="text-xs font-bold">Terminal is Ready</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    cart.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-3 py-2">
                          <div className="w-10 h-10 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                            <img src={item.image} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-3 py-2 text-[10px] font-bold text-gray-700 min-w-[80px] truncate">{item.name}</td>
                        <td className="px-3 py-2 text-[10px] font-bold text-gray-500">{item.batch}</td>
                        <td className="px-3 py-2 text-[10px] font-bold text-gray-700">{formatCurrency(item.price)}</td>
                        <td className="px-3 py-2">
                          <input 
                            type="number" 
                            min="1" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) - item.quantity)}
                            className="w-12 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold text-center outline-none focus:border-forty-primary"
                          />
                        </td>
                        <td className="px-3 py-2 text-[10px] font-black text-forty-primary">{formatCurrency(item.price * item.quantity)}</td>
                        <td className="px-3 py-2 text-center">
                          <button onClick={() => removeFromCart(item.id)} className="p-1 px-2.5 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Billing Section */}
            <div className="p-4 border-t border-gray-100">
              {/* Total Summary - Full Width */}
              <div className="mb-4 p-3 bg-gray-50 border border-gray-100 rounded-xl text-center">
                <p className="text-sm font-black text-gray-800">Total</p>
                <p className="text-xl font-black text-gray-900">{formatCurrency(total)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Column - Payment Inputs */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-600 w-24 shrink-0">Receive</label>
                    <input
                      type="number"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:border-forty-primary outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-600 w-24 shrink-0">Change</label>
                    <input
                      type="number" readOnly value={changeAmount}
                      className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-600 w-24 shrink-0">Due</label>
                    <input
                      type="number" readOnly value={dueAmount}
                      className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-600 w-24 shrink-0">Payment</label>
                    <select className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:border-forty-primary outline-none text-gray-500">
                      <option>Cash</option>
                      <option>M-Pesa</option>
                      <option>Card</option>
                    </select>
                  </div>
                </div>

                {/* Right Column - VAT, Discount, Delivery */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-16 text-right shrink-0">VAT</span>
                    <select className="flex-1 px-2 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold outline-none text-gray-500">
                      <option>Select</option>
                    </select>
                    <input type="text" readOnly className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center" value="0.00" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-16 text-right shrink-0">Discount</span>
                    <select className="flex-1 px-2 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold outline-none text-gray-500">
                      <option>Select</option>
                    </select>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:border-forty-primary outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-16 text-right shrink-0">Delivery</span>
                    <input
                      type="number"
                      value={deliveryCost}
                      onChange={(e) => setDeliveryCost(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-2 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:border-forty-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Final Footer Buttons */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 border-t border-gray-100">
               <button 
                onClick={() => { setCart([]); setReceiveAmount(0); setDiscount(0); setDeliveryCost(0); }}
                className="py-3 bg-white border border-[#FF6565] text-[#FF6565] rounded-lg text-xs font-black uppercase hover:bg-red-50 transition-colors"
               >
                 Reset
               </button>
               <button className="py-3 bg-white border border-forty-primary text-forty-primary rounded-lg text-xs font-black uppercase hover:bg-teal-50 transition-colors">
                 Save
               </button>
               <button className="py-3 bg-forty-primary border border-forty-primary text-white rounded-lg text-xs font-black uppercase hover:bg-forty-primary/90 transition-all shadow-md">
                 Save & Print
               </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
