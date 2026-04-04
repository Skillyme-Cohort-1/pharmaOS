import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, ShoppingCart, AlertTriangle, TrendingUp, DollarSign, Pencil } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProductModal from '../components/forms/ProductModal'
import OrderModal from '../components/forms/OrderModal'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatCurrency'
import { formatRelativeTime } from '../utils/formatDate'
import { productsApi, ordersApi, alertsApi, transactionsApi, promptApi } from '../services/api'

function KPICard({ title, value, trend, icon: Icon, color }) {
  const colorStyles = {
    teal: 'border-teal-500',
    green: 'border-green-500',
    amber: 'border-amber-500',
    red: 'border-red-500',
    blue: 'border-blue-500',
  }

  return (
    <Card className={`border-l-4 ${colorStyles[color]} h-full`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 break-words">{value}</p>
          {trend && (
            <div className={`mt-2 flex items-center text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className={`flex-shrink-0 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span className="ml-1 text-xs sm:text-sm truncate">{Math.abs(trend)}% vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg flex-shrink-0 ${color === 'teal' ? 'bg-teal-100' : color === 'green' ? 'bg-green-100' : color === 'amber' ? 'bg-amber-100' : color === 'red' ? 'bg-red-100' : 'bg-blue-100'}`}>
          <Icon size={24} className={color === 'teal' ? 'text-teal-600' : color === 'green' ? 'text-green-600' : color === 'amber' ? 'text-amber-600' : color === 'red' ? 'text-red-600' : 'text-blue-600'} />
        </div>
      </div>
    </Card>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const toast = useToast()
  const [kpiData, setKpiData] = useState({
    todaySales: 0,
    monthlyRevenue: 0,
    pendingOrders: 0,
    expiredProducts: 0,
    lowStock: 0,
  })
  const [salesTrend, setSalesTrend] = useState([])
  const [alerts, setAlerts] = useState([])
  const [promptQuery, setPromptQuery] = useState('')
  const [promptLoading, setPromptLoading] = useState(false)
  const [promptResults, setPromptResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [editProduct, setEditProduct] = useState(null)
  const [editOrder, setEditOrder] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const openProductEdit = (item) => {
    setEditProduct(item)
    setIsProductModalOpen(true)
  }

  const openOrderEdit = (item) => {
    setEditOrder(item)
    setIsOrderModalOpen(true)
  }

  const handleModalSuccess = () => {
    fetchDashboardData() // Refresh dashboard after edit
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [summaryRes, ordersRes, productsRes, alertsRes, trendRes] = await Promise.all([
        transactionsApi.getSummary(),
        ordersApi.getAll({ status: 'pending' }),
        productsApi.getAll({}),
        alertsApi.getAll({ is_read: 'false', limit: 5 }),
        analyticsApi.sales(7),
      ])

      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      const monthAgo = new Date()
      monthAgo.setDate(monthAgo.getDate() - 30)

      const productsList = productsRes.data || []
      const expiredCount = productsList.filter(p => p.status === 'expired').length
      const lowStockCount = productsList.filter(p => p.quantity < 10 && p.status !== 'expired').length

      setAllProducts(productsList)

      setKpiData({
        todaySales: summaryRes.data?.today || 0,
        monthlyRevenue: summaryRes.data?.month || 0,
        pendingOrders: ordersRes.data?.length || 0,
        expiredProducts: expiredCount,
        lowStock: lowStockCount,
      })

      setSalesTrend(trendRes.data?.data || [])
      setAlerts(alertsRes.data || [])
    } catch (err) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleRunScan = async () => {
    try {
      const res = await alertsApi.runScan()
      toast.success(res.message || 'Expiry scan completed')
      fetchDashboardData()
    } catch (err) {
      toast.error('Failed to run expiry scan')
    }
  }

  const handlePromptSearch = async (e) => {
    e.preventDefault()
    if (!promptQuery.trim()) return

    setPromptLoading(true)
    try {
      const res = await promptApi.query(promptQuery)
      setPromptResults(res.data)
    } catch (err) {
      toast.error('Failed to process query')
    } finally {
      setPromptLoading(false)
    }
  }

  const handleMarkAlertRead = async (alertId) => {
    try {
      await alertsApi.markRead(alertId)
      setAlerts(prev => prev.filter(a => a.id !== alertId))
    } catch (err) {
      toast.error('Failed to mark alert as read')
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await alertsApi.markAllRead()
      setAlerts([])
    } catch (err) {
      toast.error('Failed to mark all as read')
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'expired': return '🔴'
      case 'near_expiry': return '🟠'
      case 'low_stock': return '🟡'
      default: return '⚪'
    }
  }

  return (
    <PageWrapper 
      title="Dashboard" 
      action={
        <Button onClick={handleRunScan} variant="secondary">
          Run Expiry Scan ▶
        </Button>
      }
    >
      {loading ? (
        <div className="text-center py-12">Loading dashboard...</div>
      ) : (
        <>
          {/* Financial KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 mb-6">
            <KPICard
              title="Sales Today"
              value={formatCurrency(kpiData.todaySales)}
              trend={12}
              icon={DollarSign}
              color="teal"
            />
            <KPICard
              title="Monthly Revenue"
              value={formatCurrency(kpiData.monthlyRevenue)}
              trend={8}
              icon={TrendingUp}
              color="green"
            />
          </div>

          {/* Operational KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6 mb-8">
            <KPICard
              title="Pending Orders"
              value={kpiData.pendingOrders}
              icon={ShoppingCart}
              color="amber"
            />
            <KPICard
              title="Expired Products"
              value={kpiData.expiredProducts}
              icon={AlertTriangle}
              color="red"
            />
            <KPICard
              title="Low Stock Items"
              value={kpiData.lowStock}
              icon={Package}
              color="blue"
            />
          </div>

          {/* Charts and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <Card title="7-Day Revenue Trend" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={salesTrend}>
                  <XAxis 
                    dataKey="formattedDate" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `KES ${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#0D9488"
                    strokeWidth={2}
                    fill="url(#colorAmount)"
                    fillOpacity={0.3}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#0D9488"
                    strokeWidth={2}
                    dot={false}
                  />
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Alerts Panel */}
            <Card title="Recent Alerts">
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No new alerts</p>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 py-3 border-b border-gray-100 transition-colors hover:bg-gray-50 group"
                    >
                      <span 
                        className="text-lg cursor-pointer" 
                        onClick={() => handleMarkAlertRead(alert.id)}
                      >
                        {getAlertIcon(alert.type)}
                      </span>
                      <div className="flex-1 cursor-pointer" onClick={() => handleMarkAlertRead(alert.id)}>
                        <p className="text-sm text-gray-700">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(alert.triggeredAt)}</p>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const prod = allProducts.find(p => p.id === alert.productId)
                            if (prod) openProductEdit(prod)
                            else toast.error('Product data not loaded')
                          }}
                          className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
              {alerts.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleMarkAllRead}
                  className="w-full mt-4"
                >
                  Mark All Read
                </Button>
              )}
            </Card>
          </div>

          {/* Prompt-to-Action Bar */}
          <Card>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔍</span>
                <h3 className="text-lg font-semibold text-gray-900">Ask PharmaOS</h3>
              </div>
              <p className="text-sm text-gray-500">
                Use natural language to quickly fetch insights, check inventory status, or view operational metrics in real-time.
              </p>
            </div>
            
            <form onSubmit={handlePromptSearch} className="mb-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promptQuery}
                  onChange={(e) => setPromptQuery(e.target.value)}
                  placeholder="Try: 'show expired drugs', 'low stock', 'pending orders'"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Button type="submit" loading={promptLoading}>
                  Search
                </Button>
              </div>
            </form>

            {promptResults && (
              <div className="border-t pt-4">
                {promptResults.success === false ? (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">No direct match found. Try one of these:</h4>
                    <div className="flex flex-wrap gap-2">
                      {promptResults.suggestions?.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setPromptQuery(suggestion)
                            // Optionally trigger search automatically or let user click
                          }}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{promptResults.label}</h4>
                      <Badge status="completed">{promptResults.count} results</Badge>
                    </div>
                    
                    {promptResults.type === 'get_summary' ? (
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(promptResults.results.total)}
                      </div>
                    ) : Array.isArray(promptResults.results) ? (
                      <div className="space-y-2">
                        {promptResults.results.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 group">
                            <div>
                              <span className="text-sm text-gray-700">
                                {item.name || item.customerName || 'Item'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {item.quantity !== undefined && (
                                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                              )}
                              {isAdmin && (
                                <button
                                  onClick={() => promptResults.type === 'get_orders' ? openOrderEdit(item) : openProductEdit(item)}
                                  className="p-1 text-gray-400 hover:text-teal-600 rounded transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Pencil size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {promptResults.count > 5 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          if (promptResults.label.includes('Expired')) navigate('/inventory?status=expired')
                          else if (promptResults.label.includes('Low Stock')) navigate('/inventory?status=out_of_stock')
                          else if (promptResults.label.includes('Pending')) navigate('/orders?status=pending')
                        }}
                      >
                        View Full List →
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </Card>
        </>
      )}

      {/* Quick Edit Modals for Admin via Dashboard */}
      {isAdmin && (
        <>
          <ProductModal
            isOpen={isProductModalOpen}
            onClose={() => setIsProductModalOpen(false)}
            product={editProduct}
            onSuccess={handleModalSuccess}
          />
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            order={editOrder}
            onSuccess={handleModalSuccess}
          />
        </>
      )}
    </PageWrapper>
  )
}

// Import analyticsApi
import { analyticsApi } from '../services/api'
