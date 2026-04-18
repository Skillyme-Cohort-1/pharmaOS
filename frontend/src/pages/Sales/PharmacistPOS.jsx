import { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plus, User, ShoppingCart, FileText, BookOpen,
  Calendar, X, ChevronDown, Trash2, Minus, Barcode,
  Receipt, PauseCircle
} from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { useCustomers } from '../../hooks/useCustomers'
import { productsApi, ordersApi } from '../../services/api'
import { formatCurrency } from '../../utils/formatCurrency'
import Sidebar from '../../components/layout/Sidebar'
import Navbar from '../../components/layout/Navbar'

// Customer selector component
function CustomerSelector({ customers, selectedCustomer, onSelect, onAddNew }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const walkInCustomer = { id: 'walk-in', name: 'Walking Customer', phone: '017000000000', email: '' }

  const displayCustomers = [walkInCustomer, ...customers]

  const selected = selectedCustomer || walkInCustomer

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300 rounded-xl px-4 py-2.5 w-full hover:shadow-md transition-all cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-[#00A86B] flex items-center justify-center text-white font-bold">
          <User size={20} />
        </div>
        <div className="flex-1 text-left">
          <p className="font-bold text-gray-800 text-sm">{selected.name}</p>
          <p className="text-xs text-gray-500">{selected.phone || selected.email || ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onAddNew() }}
            className="p-1.5 bg-[#00A86B] text-white rounded-lg hover:bg-[#008f5b] transition-colors"
          >
            <Plus size={16} />
          </button>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${selectedCustomer?.id === 'due' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
            <span className="text-xs font-bold">{selectedCustomer?.id === 'due' ? 'DUE' : '0.00'}</span>
          </div>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase">Select Customer</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {displayCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => { onSelect(customer); setIsOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${
                  selectedCustomer?.id === customer.id ? 'bg-[#00A86B]/5 border-l-4 border-l-[#00A86B]' : ''
                }`}
              >
                <User size={16} className="text-[#00A86B]" />
                <div className="text-left flex-1">
                  <p className="font-medium text-sm text-gray-800">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.phone || customer.email || ''}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Product search with barcode support
function ProductSearch({ onSelect, onViewAll }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current && query.trim()) {
        handleSearch()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [query])

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await productsApi.getAll({ search: query.trim(), limit: 10 })
      setResults(res.data || [])
      setShowDropdown(true)
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (product) => {
    onSelect(product)
    setQuery('')
    setResults([])
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setShowDropdown(true)}
            placeholder="Search/Barcode Scan"
            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-[#00A86B]/20 transition-all"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-[#00A86B] rounded-full animate-spin" />
            </div>
          )}
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-[#00A86B] hover:text-[#00A86B] transition-all"
        >
          View All
          <ChevronDown size={16} />
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden max-h-80 overflow-y-auto">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Barcode size={18} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">Stock: {product.quantity || 0} | {formatCurrency(product.unitPrice || 0)}</p>
              </div>
              <Plus size={20} className="text-[#00A86B]" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Product card component for modal
function ProductCard({ product, onSelect, disabled }) {
  const [imageError, setImageError] = useState(false)

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className="flex flex-col p-4 border-2 border-gray-200 rounded-xl hover:border-[#00A86B] hover:shadow-lg transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <ShoppingCart size={32} className="text-gray-400" />
        )}
      </div>
      <p className="font-bold text-sm text-gray-800 line-clamp-2">{product.name}</p>
      <p className="text-xs text-gray-500 mt-1">Stock: {product.quantity || product.stock || 0}</p>
      <p className="text-lg font-black text-[#00A86B] mt-2">{formatCurrency(product.unitPrice || 0)}</p>
    </button>
  )
}

// Cart item component
function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <ShoppingCart size={20} className="text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
        <p className="text-xs text-gray-500">{formatCurrency(item.unitPrice || item.price)} × {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQty(item.id, -1)}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
        <button
          onClick={() => onUpdateQty(item.id, 1)}
          className="w-8 h-8 rounded-lg bg-[#00A86B] hover:bg-[#008f5b] text-white flex items-center justify-center transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

// Main PharmacistPOS component
export default function PharmacistPOS() {
  const navigate = useNavigate()
  const toast = useToast()
  const { customers } = useCustomers()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const [cart, setCart] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [paymentType, setPaymentType] = useState('Cash')
  const [discount, setDiscount] = useState(0)
  const [taxAmount, setTaxAmount] = useState(0)
  const [shippingCharge, setShippingCharge] = useState(0)
  const [otherCharge, setOtherCharge] = useState(0)
  const [receiveAmount, setReceiveAmount] = useState('')
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0])
  const [saving, setSaving] = useState(false)
  const [showProductList, setShowProductList] = useState(false)
  const [products, setProducts] = useState([])

  // Calculate totals
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.unitPrice || item.price || 0) * item.quantity, 0)
  }, [cart])

  const totalPayable = useMemo(() => {
    return Math.max(0, subtotal - discount + taxAmount + shippingCharge + otherCharge)
  }, [subtotal, discount, taxAmount, shippingCharge, otherCharge])

  const received = parseFloat(receiveAmount) || 0
  const change = useMemo(() => Math.max(0, received - totalPayable), [received, totalPayable])
  const due = useMemo(() => Math.max(0, totalPayable - received), [totalPayable, received])

  // Load products for the "View All" modal
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productsApi.getAll({ limit: 50 })
        setProducts(res.data || [])
      } catch (err) {
        console.error('Failed to load products:', err)
      }
    }
    loadProducts()
  }, [])

  const addToCart = (product) => {
    if ((product.quantity || product.stock || 0) <= 0) {
      toast.error('Product is out of stock')
      return
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, product.quantity || product.stock || 999) }
            : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    toast.success(`${product.name} added to cart`)
  }

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta)
          const maxStock = i.stock || 999
          return { ...i, quantity: Math.min(newQty, maxStock) }
        }
        return i
      })
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => {
    setCart([])
    setReceiveAmount('')
    setDiscount(0)
    setTaxAmount(0)
    setShippingCharge(0)
    setOtherCharge(0)
  }

  const handleSave = async (hold = false) => {
    if (cart.length === 0) {
      toast.error('Please add products to the cart')
      return
    }

    setSaving(true)
    try {
      const customer = selectedCustomer || { name: 'Walking Customer', phone: '017000000000' }

      for (const item of cart) {
        await ordersApi.create({
          customerName: customer.name,
          customerPhone: customer.phone || '017000000000',
          productId: item.id,
          quantity: item.quantity,
          paymentMethod: paymentType.toLowerCase(),
          amountPaid: hold ? 0 : received,
          amountDue: hold ? totalPayable : due,
          status: hold ? 'hold' : due > 0 ? 'partial' : 'paid',
          discount: discount,
          tax: taxAmount,
          shipping: shippingCharge,
          otherCharges: otherCharge,
          customerId: customer.id || undefined,
        })
      }

      toast.success(hold ? 'Sale held successfully' : 'Sale completed successfully')
      clearCart()
    } catch (err) {
      toast.error(err.message || 'Failed to save sale')
    } finally {
      setSaving(false)
    }
  }

  const handleAddCustomer = () => {
    navigate('/customers')
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar - Standard Dashboard Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Cart & Search */}
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
            {/* Search Bar */}
            <ProductSearch
              onSelect={addToCart}
              onViewAll={() => setShowProductList(true)}
            />

            {/* Customer Selector */}
            <CustomerSelector
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelect={setSelectedCustomer}
              onAddNew={handleAddCustomer}
            />

            {/* Cart Items or Empty State */}
            <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-gray-200 p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowProductList(true)}
                      className="flex items-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      <Plus size={24} />
                      Add Product
                    </button>
                    <button
                      onClick={() => navigate('/purchases/new')}
                      className="flex items-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      <Plus size={24} />
                      Add Purchase
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQty={updateQty}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              {/* Summary Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">TOTAL ITEM</span>
                  <span className="font-bold text-gray-800">{cart.length} ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">TOTAL</span>
                  <span className="font-bold text-gray-800">{formatCurrency(subtotal)}</span>
                </div>

                {/* Discount */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-24">DISCOUNT</span>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-right font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>

                {/* Tax Amount */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-24">TAX AMOUNT (%)</span>
                  <input
                    type="number"
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-right font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>

                {/* Shipping Charge */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-24">SHIPPING CHARGE</span>
                  <input
                    type="number"
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-right font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>

                {/* Other Charge */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-24">OTHER CHARGE</span>
                  <input
                    type="number"
                    value={otherCharge}
                    onChange={(e) => setOtherCharge(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-right font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>

                {/* Total Payable */}
                <div className="flex items-center justify-between py-3 border-t-2 border-gray-200">
                  <span className="text-sm font-bold text-gray-700">TOTAL PAYABLE</span>
                  <span className="font-black text-xl text-[#00A86B]">{formatCurrency(totalPayable)}</span>
                </div>

                {/* Payment Type */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-24">PAYMENT TYPE</span>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00A86B] appearance-none cursor-pointer"
                  >
                    <option value="Cash">Cash</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Card">Card</option>
                    <option value="Invoice">Invoice</option>
                  </select>
                </div>

                {/* Receive Amount */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-24">RECEIVE</span>
                  <input
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-3 py-2 bg-[#00A86B] text-white rounded-lg text-right font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#00A86B] placeholder:text-white/50"
                  />
                </div>

                {/* Change / Due */}
                {received > 0 && (
                  <div className={`flex items-center justify-between py-2 px-3 rounded-lg ${change > 0 ? 'bg-green-50' : due > 0 ? 'bg-red-50' : ''}`}>
                    <span className="text-sm font-medium">{change > 0 ? 'CHANGE' : 'DUE'}</span>
                    <span className={`font-bold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(change > 0 ? change : due)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="h-20 bg-[#F5A623] flex items-center px-6 gap-4 shadow-lg">
          {/* Total Display */}
          <div className="flex items-center gap-2 text-white">
            <span className="text-sm font-medium opacity-80">KSH</span>
            <span className="text-4xl font-black tracking-tight">{totalPayable.toFixed(2)}</span>
          </div>

          <div className="flex-1" />

          {/* Date Picker */}
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
            <Calendar size={18} className="text-white" />
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="bg-transparent text-white font-medium text-sm focus:outline-none [color-scheme:dark]"
            />
          </div>

          <button
            onClick={() => handleSave(false)}
            disabled={saving || cart.length === 0}
            className="flex items-center gap-2 px-8 py-3 bg-[#00A86B] hover:bg-[#008f5b] disabled:bg-gray-400 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Receipt size={24} />
            PAY NOW
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving || cart.length === 0}
            className="flex items-center gap-2 px-8 py-3 bg-[#E74C3C] hover:bg-[#c0392b] disabled:bg-gray-400 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <PauseCircle size={24} />
            HOLD
          </button>
        </div>
      </div>

      {/* Product List Modal */}
      {showProductList && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Select Products</h2>
              <button
                onClick={() => setShowProductList(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => { addToCart(product); setShowProductList(false) }}
                  disabled={(product.quantity || product.stock || 0) <= 0}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
