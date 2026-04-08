import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  ShoppingCart, 
  Calculator, 
  Power,
  X,
  Plus,
  ChevronDown
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import ProductCard from '../components/ui/ProductCard'
import { formatCurrency } from '../utils/formatCurrency'

// --- Mock Products ---
const MOCK_PRODUCTS = [
  { id: '1', name: 'Paracetamol Tablets IP', price: 1638.75, stock: 120, image: '/images/products/placeholder.svg' },
  { id: '2', name: 'Curafin 5ml Syrup', price: 942.76, stock: 45, image: '/images/products/placeholder.svg' },
  { id: '3', name: 'Avaspray Nasal 120ml', price: 831.60, stock: 12, image: '/images/products/placeholder.svg' },
]

export default function PurchaseNew() {
  const navigate = useNavigate()

  // 1. Modals state
  const [showStockList, setShowStockList] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [calcInput, setCalcInput] = useState('')

  const handleCalcBtn = (val) => {
    if (val === 'C') { setCalcInput(''); return; }
    if (val === '=') {
      try {
        setCalcInput(String(new Function('return ' + calcInput)()));
      } catch (e) {
        setCalcInput('Error');
      }
      return;
    }
    setCalcInput((prev) => (prev === 'Error' ? val : prev + val));
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [supplier, setSupplier] = useState('Select Supplier')
  
  // Extra fields requested
  const [invoiceNo, setInvoiceNo] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [notes, setNotes] = useState('')

  const [payAmount, setPayAmount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(0)
  const [taxPercent, setTaxPercent] = useState(0)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { 
         ...product, 
         quantity: 1, 
         batch: 'B' + Math.floor(Math.random() * 900 + 100),
         expiryDate: '',
         sellingPrice: 0 
      }]
    })
  }

  const updateCartItem = (id, field, value) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        if (field === 'quantity') value = Math.max(1, value)
        return { ...item, [field]: value }
      }
      return item
    }))
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id))

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart])
  const taxAmount = useMemo(() => (subtotal * taxPercent) / 100, [subtotal, taxPercent])
  const total = useMemo(() => subtotal + taxAmount - discount + deliveryCost, [subtotal, taxAmount, discount, deliveryCost])
  const changeAmount = useMemo(() => Math.max(0, payAmount - total), [payAmount, total])
  const dueAmount = useMemo(() => Math.max(0, total - payAmount), [total, payAmount])

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <PageWrapper title="Purchase New">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[700px]">
        
        {/* Left Section: Product Browser */}
        <div className="flex-1 flex flex-col min-w-0 min-h-[400px]">
          <div className="flex flex-col gap-4 mb-4">
            {/* Filters Row */}
            <div className="relative">
              <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:ring-1 focus:ring-forty-primary outline-none text-gray-800">
                <option>Select a category</option>
                <option>Tablets</option>
                <option>Syrups</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-forty-primary placeholder:text-gray-400"
                />
              </div>
              <button className="p-3 bg-forty-primary text-white rounded-lg hover:bg-forty-primary/90 transition-colors shrink-0">
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
            {filteredProducts.length === 0 ? (
               <div className="p-4 bg-red-50 text-red-500 border border-red-100 rounded-lg text-sm w-32 h-24 flex items-center justify-center font-medium shadow-sm">
                  No product found
               </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      stock={product.stock}
                      image={product.image}
                      onClick={() => addToCart(product)}
                    />
                  ))}
                </div>
            )}
          </div>
        </div>

        {/* Right Section: Transaction Panel */}
        <div className="w-full lg:w-[450px] xl:w-[600px] flex flex-col shrink-0">
          <div className="flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {/* Quick Actions & Header */}
            <div className="p-4 border-b border-gray-100 relative">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-800">Quick Action</h3>
                  <div className="flex gap-1.5">
                    <button onClick={() => setShowStockList(true)} className="px-3 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:text-forty-primary hover:border-forty-primary hover:bg-forty-primary/5 transition-all">Stock List</button>
                    <button onClick={() => navigate('/purchases')} className="px-3 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:text-forty-primary hover:border-forty-primary hover:bg-forty-primary/5 transition-all">Today Purchases</button>
                    <button onClick={() => setShowCalculator(!showCalculator)} className="p-2 bg-white border border-gray-200 rounded text-gray-600 hover:text-forty-primary hover:border-forty-primary hover:bg-forty-primary/5 transition-all relative"><Calculator size={16} /></button>
                    <button onClick={() => navigate('/')} className="p-2 bg-white border border-gray-200 rounded text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all"><Power size={16} /></button>
                  </div>
               </div>

               {/* Dropdown Calculator Modal */}
               {showCalculator && (
                 <div className="absolute right-4 top-16 z-50 bg-white border border-gray-200 shadow-xl rounded-xl p-4 w-64">
                   <div className="flex justify-between items-center mb-3">
                     <h4 className="text-sm font-bold">Calculator</h4>
                     <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-red-500"><X size={16}/></button>
                   </div>
                   <input type="text" readOnly value={calcInput || '0'} className="w-full bg-gray-50 border border-gray-200 text-right px-3 py-2 rounded mb-3 font-mono text-lg" />
                   <div className="grid grid-cols-4 gap-2">
                     {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','.','+'].map(btn => (
                       <button key={btn} onClick={() => handleCalcBtn(btn)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded font-bold text-gray-700">{btn}</button>
                     ))}
                     <button onClick={() => handleCalcBtn('=')} className="col-span-4 p-2 bg-forty-primary hover:bg-teal-700 text-white rounded font-bold">=</button>
                   </div>
                 </div>
               )}

               {/* Supplier & Purchase Info */}
               <div className="space-y-3">
                  <div className="flex gap-1">
                     <div className="relative flex-1">
                       <select
                         value={supplier}
                         onChange={(e) => setSupplier(e.target.value)}
                         className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-500 appearance-none focus:outline-none focus:ring-1 focus:ring-forty-primary"
                       >
                         <option>Select Supplier</option>
                         <option>GSK Pharmaceuticals</option>
                         <option>Abbott Laboratories</option>
                       </select>
                       <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                     </div>
                     <button className="p-2.5 bg-forty-dark text-white rounded-lg hover:bg-black transition-colors shadow-sm">
                       <Plus size={20} />
                     </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <input 
                       type="text" placeholder="Invoice No." value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)}
                       className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-forty-primary"
                     />
                     <input 
                       type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)}
                       className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-forty-primary"
                     />
                  </div>
               </div>
            </div>

            {/* Transaction Table */}
            <div className="flex-1 overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-100">
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 ">Item</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 ">Batch</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 ">Exp Date</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 text-center">Cost</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 text-center">Sell Price</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 text-center">Qty</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 text-right">Sub Total</th>
                    <th className="px-2 py-3 text-[11px] font-black text-gray-800 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.length === 0 ? (
                    <tr>
                       <td colSpan="8" className="py-20 text-center text-gray-400">
                          <div className="flex flex-col items-center opacity-40">
                             <ShoppingCart size={32} className="mb-2" />
                             <span className="text-sm font-medium">No Items Found</span>
                          </div>
                       </td>
                    </tr>
                  ) : (
                    cart.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-2 py-2 text-[10px] font-bold text-gray-700 min-w-[80px] break-words">{item.name}</td>
                        <td className="px-2 py-2">
                           <input type="text" value={item.batch} onChange={e => updateCartItem(item.id, 'batch', e.target.value)} className="w-16 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold outline-none" />
                        </td>
                        <td className="px-2 py-2">
                           <input type="date" value={item.expiryDate} onChange={e => updateCartItem(item.id, 'expiryDate', e.target.value)} className="w-20 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold outline-none" />
                        </td>
                        <td className="px-2 py-2 text-center">
                           <input type="number" value={item.price} onChange={e => updateCartItem(item.id, 'price', e.target.value)} className="w-14 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold text-center outline-none" />
                        </td>
                        <td className="px-2 py-2 text-center">
                           <input type="number" placeholder="Optional" value={item.sellingPrice || ''} onChange={e => updateCartItem(item.id, 'sellingPrice', e.target.value)} className="w-16 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold text-center outline-none text-gray-500" />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <input 
                            type="number" min="1" 
                            value={item.quantity} 
                            onChange={(e) => updateCartItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-12 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold text-center outline-none focus:border-forty-primary"
                          />
                        </td>
                        <td className="px-2 py-2 text-[10px] font-black text-forty-primary text-right">{formatCurrency(item.price * item.quantity)}</td>
                        <td className="px-2 py-2 text-center">
                          <button onClick={() => removeFromCart(item.id)} className="p-1 px-1.5 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
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
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column - Payment Inputs */}
                <div className="space-y-3">
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label className="text-[11px] font-bold text-gray-500 leading-tight">Payment Method</label>
                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold outline-none text-gray-600">
                       <option>Cash</option><option>Bank Transfer</option><option>Mobile Money</option><option>Credit</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label className="text-[11px] font-bold text-gray-500 leading-tight">Receive Amount</label>
                    <input
                      type="number" value={payAmount} onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold focus:border-forty-primary outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label className="text-[11px] font-bold text-gray-500 leading-tight">Change Amount</label>
                    <input type="number" readOnly value={changeAmount} className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label className="text-[11px] font-bold text-gray-500 leading-tight">Due Amount</label>
                    <input type="number" readOnly value={dueAmount} className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-500 outline-none" />
                  </div>
                </div>

                {/* Right Column - VAT, Discount, Delivery */}
                <div className="space-y-3 flex flex-col justify-between h-full py-1">
                   {/* Total Summary */}
                   <div className="flex justify-between items-center px-1 mb-1">
                      <p className="text-sm font-black text-gray-800">Total</p>
                      <p className="text-lg font-black text-gray-900">{formatCurrency(total)}</p>
                   </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-500 w-12 text-left shrink-0">Tax (%)</span>
                    <input type="number" value={taxPercent} onChange={e => setTaxPercent(parseFloat(e.target.value)||0)} className="flex-1 px-2 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold outline-none" />
                    <input type="text" readOnly className="w-16 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-center text-gray-400" value={formatCurrency(taxAmount)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-500 w-12 text-left shrink-0">Discount</span>
                    <select className="flex-1 px-2 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold outline-none text-gray-400">
                      <option>Fixed</option>
                    </select>
                    <input
                      type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-center focus:border-forty-primary outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-500 w-12 text-left shrink-0 leading-tight">Delivery Cost</span>
                    <input
                      type="number" value={deliveryCost} onChange={(e) => setDeliveryCost(parseFloat(e.target.value) || 0)}
                      className="w-full flex-1 px-2 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold focus:border-forty-primary outline-none text-right"
                    />
                  </div>
                </div>
              </div>
              
              {/* Optional Notes */}
              <div className="mt-3">
                 <textarea 
                    rows={1} placeholder="Optional notes / damaged items..." value={notes} onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-forty-primary resize-none"
                 />
              </div>
            </div>

            {/* Final Footer Buttons */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 border-t border-gray-100 mt-auto shrink-0">
               <button 
                onClick={() => { setCart([]); setPayAmount(0); setDiscount(0); setDeliveryCost(0); }}
                className="py-3 bg-white border border-[#FF6565] text-[#FF6565] rounded-xl text-xs font-black uppercase hover:bg-red-50 transition-colors shadow-sm"
               >
                 Reset
               </button>
               <button className="py-3 bg-white border border-forty-primary text-forty-primary rounded-xl text-xs font-black uppercase hover:bg-teal-50 transition-colors shadow-sm">
                 Save
               </button>
               <button className="py-3 bg-forty-primary border border-forty-primary text-white rounded-xl text-xs font-black uppercase hover:bg-forty-primary/90 transition-all shadow-md">
                 Save & Print
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stock List Modal Overlay */}
      {showStockList && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[85vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-black text-gray-800">Stock List</h2>
              <button onClick={() => setShowStockList(false)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-auto bg-gray-50/50">
               <div className="relative mb-6">
                 <input type="text" placeholder="Search" className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-forty-primary" />
                 <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               </div>

               <div className="bg-white border text-center border-gray-200 rounded-lg overflow-hidden">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-gray-100 bg-gray-50">
                       <th className="px-6 py-4 text-xs font-black text-gray-700">SL.</th>
                       <th className="px-6 py-4 text-xs font-black text-gray-700">Product</th>
                       <th className="px-6 py-4 text-xs font-black text-gray-700">Cost</th>
                       <th className="px-6 py-4 text-xs font-black text-gray-700">Qty</th>
                       <th className="px-6 py-4 text-xs font-black text-gray-700">Sale</th>
                       <th className="px-6 py-4 text-xs font-black text-gray-700">Stock Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                        <td colSpan="6" className="py-12 text-center text-gray-500 font-medium">No stock products found</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
