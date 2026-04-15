import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator, Plus, Power, X, ChevronDown, ShoppingCart } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import ProductCard from '../../components/ui/ProductCard'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useCustomers } from '../../hooks/useCustomers'
import { ordersApi } from '../../services/api'
import { formatCurrency } from '../../utils/formatCurrency'

const MOCK_POS_PRODUCTS = [
  { id: '1', name: 'Paracetamol Tablets IP', price: 1638.75, stock: 120, image: '/images/products/placeholder.svg' },
  { id: '2', name: 'Curafin 5ml Syrup',      price: 942.76,  stock: 45,  image: '/images/products/placeholder.svg' },
  { id: '3', name: 'Avaspray Nasal 120ml',   price: 831.60,  stock: 12,  image: '/images/products/placeholder.svg' },
  { id: '4', name: 'Dupabaston 10mg',        price: 847.11,  stock: 0,   image: '/images/products/placeholder.svg' },
  { id: '5', name: 'Omeprazole 20mg',        price: 1007.60, stock: 500, image: '/images/products/placeholder.svg' },
  { id: '6', name: 'Coralcal DX Vital',      price: 625.40,  stock: 30,  image: '/images/products/placeholder.svg' },
  { id: '7', name: 'Elvive Hair Care',        price: 345,     stock: 15,  image: '/images/products/placeholder.svg' },
  { id: '8', name: 'Bizoran 10/20 MG',       price: 648.66,  stock: 8,   image: '/images/products/placeholder.svg' },
  { id: '9', name: 'Vitalzin Multi-Syrup',   price: 529.58,  stock: 5,   image: '/images/products/placeholder.svg' },
  { id: '10', name: 'Velkin Nasal Drop',     price: 427.14,  stock: 20,  image: '/images/products/placeholder.svg' },
]

export default function POSView() {
  const navigate  = useNavigate()
  const { logout } = useAuth()
  const toast     = useToast()
  const { customers } = useCustomers()

  const [searchQuery,   setSearchQuery]   = useState('')
  const [cart,          setCart]          = useState([])
  const [customerId,    setCustomerId]    = useState('')
  const [paymentType,   setPaymentType]   = useState('Cash')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [discount,      setDiscount]      = useState(0)
  const [discountType,  setDiscountType]  = useState('fixed')
  const [deliveryCost,  setDeliveryCost]  = useState(0)
  const [saving,        setSaving]        = useState(false)
  const [showCalc,      setShowCalc]      = useState(false)
  const [calcDisplay,   setCalcDisplay]   = useState('0')
  const [calcExpr,      setCalcExpr]      = useState('')

  // ── Calculator ──────────────────────────────────────────────────────────
  const handleCalc = (v) => {
    if (v === 'C') { setCalcDisplay('0'); setCalcExpr('') }
    else if (v === '=') {
      try {
        // eslint-disable-next-line no-eval
        const r = eval(calcExpr + calcDisplay)
        setCalcDisplay(String(r)); setCalcExpr('')
      } catch { setCalcDisplay('Error'); setCalcExpr('') }
    } else if (['+','-','*','/'].includes(v)) {
      setCalcExpr(calcExpr + calcDisplay + v); setCalcDisplay('0')
    } else {
      setCalcDisplay(calcDisplay === '0' ? v : calcDisplay + v)
    }
  }

  // ── Cart ─────────────────────────────────────────────────────────────────
  const addToCart = (p) => {
    if (p.stock <= 0) return
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...p, quantity: 1, batch: 'B' + Math.floor(Math.random() * 900 + 100) }]
    })
  }
  const updateQty    = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
  const removeItem   = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const resetAll     = () => { setCart([]); setReceiveAmount(''); setDiscount(0); setDeliveryCost(0); setCustomerId(''); setPaymentType('Cash') }

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal       = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart])
  const discountAmount = useMemo(() => discountType === 'percent' ? (subtotal * discount) / 100 : discount, [subtotal, discount, discountType])
  const total          = useMemo(() => Math.max(0, subtotal - discountAmount + deliveryCost), [subtotal, discountAmount, deliveryCost])
  const received       = parseFloat(receiveAmount) || 0
  const changeAmt      = useMemo(() => Math.max(0, received - total), [received, total])
  const dueAmt         = useMemo(() => Math.max(0, total - received), [total, received])

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async (print = false) => {
    if (cart.length === 0) { toast.error('Add at least one product'); return }
    setSaving(true)
    try {
      const selectedCustomer = customers.find(c => c.id === customerId)
      for (const item of cart) {
        await ordersApi.create({
          customerName:  selectedCustomer?.name  || 'Walk In Customer',
          customerPhone: selectedCustomer?.phone || '0000000000',
          productId:     item.id,
          quantity:      item.quantity,
          paymentMethod: paymentType.toLowerCase(),
          amountPaid:    received,
          amountDue:     dueAmt,
          customerId:    customerId || undefined,
        })
      }
      toast.success('Sale saved successfully!')
      if (print) window.print()
      resetAll()
      navigate('/sales')
    } catch (err) {
      toast.error(err.message || 'Failed to save sale')
    } finally {
      setSaving(false)
    }
  }

  const calcBtns = ['C','7','8','9','/','4','5','6','*','1','2','3','-','0','.', '+']

  return (
    <PageWrapper title="Sale New">
      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-140px)] min-h-[700px]">

        {/* ── Left: Product Browser ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 min-h-[400px]">
          <div className="flex flex-col gap-4 mb-4">
            {/* Category + Manufacturer filters */}
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

            {/* Search */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Scan / Search Product by Code or Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-forty-primary placeholder:text-gray-400"
              />
              <button className="p-3 bg-forty-dark text-white rounded-lg hover:bg-black transition-colors shrink-0">
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
            {MOCK_POS_PRODUCTS
              .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(p => (
                <ProductCard key={p.id} name={p.name} price={p.price} stock={p.stock} image={p.image} onClick={() => addToCart(p)} disabled={p.stock <= 0} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Transaction Panel ──────────────────────────────────── */}
        <div className="w-full xl:w-[500px] flex flex-col shrink-0">
          <div className="flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

            {/* Quick Actions + Customer */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800">Quick Action</h3>
                <div className="flex gap-1.5 flex-wrap">
                  <button onClick={() => navigate('/stock/current')} className="px-3 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:text-forty-primary hover:border-forty-primary hover:bg-forty-primary/5 transition-all whitespace-nowrap">Stock List</button>
                  <button onClick={() => navigate('/sales')} className="px-3 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:text-forty-primary hover:border-forty-primary hover:bg-forty-primary/5 transition-all whitespace-nowrap">Today Sales</button>
                  <button onClick={() => setShowCalc(!showCalc)} className="p-2 bg-white border border-gray-200 rounded text-gray-600 hover:text-forty-primary hover:border-forty-primary hover:bg-forty-primary/5 transition-all"><Calculator size={16} /></button>
                  <button onClick={() => { if (confirm('Logout?')) logout() }} className="p-2 bg-white border border-gray-200 rounded text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all"><Power size={16} /></button>
                </div>
              </div>

              {/* Dropdown Calculator */}
              {showCalc && (
                <div className="mb-3 bg-white border border-gray-200 shadow-lg rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-gray-700">Calculator</h4>
                    <button onClick={() => setShowCalc(false)} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                  </div>
                  <div className="mb-2 p-2 bg-gray-50 border border-gray-200 rounded text-right">
                    {calcExpr && <p className="text-[10px] text-gray-400 mb-0.5">{calcExpr}</p>}
                    <p className="text-base font-bold text-gray-900 truncate">{calcDisplay}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','.','+'].map(btn => (
                      <button key={btn} onClick={() => handleCalc(btn)} className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-700">{btn}</button>
                    ))}
                    <button onClick={() => handleCalc('=')} className="col-span-4 p-1.5 bg-forty-primary hover:bg-teal-700 text-white rounded text-xs font-bold">=</button>
                  </div>
                </div>
              )}

              {/* Customer selector */}
              <div className="flex gap-1">
                <div className="relative flex-1">
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-500 appearance-none focus:outline-none focus:ring-1 focus:ring-forty-primary"
                  >
                    <option value="">Select Customer</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <button onClick={() => navigate('/customers')} title="Add New Customer" className="p-2.5 bg-forty-dark text-white rounded-lg hover:bg-black transition-colors shadow-sm">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Cart table */}
            <div className="overflow-auto custom-scrollbar shrink-0" style={{ minHeight: '220px', maxHeight: cart.length > 4 ? '340px' : 'auto' }}>
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-100">
                    {['Image','Items','Batch','Price','Qty','Sub Total','Action'].map(h => (
                      <th key={h} className="px-3 py-3 text-xs uppercase font-black text-gray-800">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-16 text-center">
                        <div className="flex flex-col items-center opacity-20">
                          <ShoppingCart size={40} className="mb-2" />
                          <p className="text-xs font-bold">Terminal is Ready</p>
                        </div>
                      </td>
                    </tr>
                  ) : cart.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-3 py-2">
                        <div className="w-10 h-10 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                      </td>
                      <td className="px-3 py-2 text-[10px] font-bold text-gray-700 min-w-[80px] max-w-[80px] truncate">{item.name}</td>
                      <td className="px-3 py-2 text-[10px] font-bold text-gray-500">{item.batch}</td>
                      <td className="px-3 py-2 text-[10px] font-bold text-gray-700">{formatCurrency(item.price)}</td>
                      <td className="px-3 py-2">
                        <input type="number" min="1" value={item.quantity}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value) - item.quantity)}
                          className="w-12 px-1 py-1 border border-gray-200 rounded text-[10px] font-bold text-center outline-none focus:border-forty-primary" />
                      </td>
                      <td className="px-3 py-2 text-[10px] font-black text-forty-primary">{formatCurrency(item.price * item.quantity)}</td>
                      <td className="px-3 py-2 text-center">
                        <button onClick={() => removeItem(item.id)} className="p-1 px-2.5 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                          <X size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Billing Section ── */}
            <div className="p-4 border-t border-gray-100 shrink-0">
              <div className="grid grid-cols-2 gap-x-5">

                {/* Left column: payment fields */}
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Receive Amount</label>
                    <input
                      type="number" min="0" placeholder="0"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:border-forty-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Change Amount</label>
                    <input readOnly value={changeAmt.toFixed(2)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Due Amount</label>
                    <input readOnly value={dueAmt.toFixed(2)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm font-bold outline-none ${dueAmt > 0 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-500'}`} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Payment Type</label>
                    <div className="relative">
                      <select
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:border-forty-primary outline-none appearance-none"
                      >
                        <option>Cash</option>
                        <option>M-Pesa</option>
                        <option>Card</option>
                        <option>Invoice</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-forty-primary hover:underline">
                    + Add Payment
                  </button>
                </div>

                {/* Right column: total + adjustments */}
                <div className="space-y-2.5">
                  {/* Total header */}
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="text-sm font-black text-gray-800">Total</span>
                    <span className="text-sm font-black text-gray-900">{formatCurrency(total)}</span>
                  </div>

                  {/* BIN */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">BIN</label>
                    <div className="flex gap-1">
                      <div className="relative flex-1">
                        <select className="w-full pl-2 pr-6 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold outline-none appearance-none text-gray-500">
                          <option>Select</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                      <input readOnly value="0.00"
                        className="w-14 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-center text-gray-500 outline-none" />
                    </div>
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Discount</label>
                    <div className="flex gap-1">
                      <div className="relative flex-1">
                        <select
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value)}
                          className="w-full pl-2 pr-6 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold outline-none appearance-none text-gray-600"
                        >
                          <option value="fixed">Select</option>
                          <option value="fixed">Fixed</option>
                          <option value="percent">Percent %</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                      <input
                        type="number" min="0" value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        className="w-14 px-2 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:border-forty-primary outline-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Cost */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Delivery Cost</label>
                    <input
                      type="number" min="0" value={deliveryCost}
                      onChange={(e) => setDeliveryCost(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:border-forty-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 border-t border-gray-100 shrink-0">
              <button onClick={resetAll} className="py-3 bg-white border border-[#FF6565] text-[#FF6565] rounded-lg text-xs font-black uppercase hover:bg-red-50 transition-colors">
                Reset
              </button>
              <button onClick={() => handleSave(false)} disabled={saving} className="py-3 bg-white border border-forty-primary text-forty-primary rounded-lg text-xs font-black uppercase hover:bg-teal-50 transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => handleSave(true)} disabled={saving} className="py-3 bg-forty-primary border border-forty-primary text-white rounded-lg text-xs font-black uppercase hover:bg-forty-primary/90 transition-all shadow-md disabled:opacity-50">
                Save & Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
