import { useState, useEffect } from 'react'
import { Package, Users, UserSquare2, AlertTriangle, TrendingUp, TrendingDown, MoreHorizontal, ShoppingCart } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import { formatCurrency } from '../utils/formatCurrency'
import { productsApi, ordersApi, analyticsApi } from '../services/api'
import { useTopCustomers } from '../hooks/useCustomers'

// --- Dashboard Component ---

function MetricCard({ title, value, trend, icon: Icon, colorClass, iconBg }) {
  return (
    <Card className="border-none shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className={colorClass} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 font-medium">
          <span className={trend.includes('+') ? 'text-green-500' : 'text-red-500'}>{trend}</span>
        </p>
      </div>
    </Card>
  )
}

export default function Dashboard() {
  const [data, setData] = useState({
    products: [],
    lowStock: [],
    expired: [],
    salesTrend: [],
    profitLoss: [],
    revenue: {},
    purchaseTrend: [],
    dashboardKPIs: null,
    reportData: [],
    salesPurchaseData: [],
  })
  const [loading, setLoading] = useState(true)
  const { customers: topCustomers } = useTopCustomers()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [productsRes, ordersRes, trendRes, profitLossRes, revenueRes, dashboardRes] = await Promise.all([
        productsApi.getAll({}),
        ordersApi.getAll({}),
        analyticsApi.sales(30),
        analyticsApi.profitLoss({ months: 7 }),
        analyticsApi.revenue({ period: 30 }),
        analyticsApi.dashboard(),
      ])

      const products = productsRes.data || []
      const profitLoss = profitLossRes.data || []
      const revenue = revenueRes.data || {}

      // Build purchase trend data for sales & purchase chart
      const salesTrend = trendRes.data?.data || []

      // Create combined sales vs purchase chart data (mock purchase trend matched to sales dates)
      const salesPurchaseData = salesTrend.map(d => ({
        day: d.formattedDate.split(' ')[1] || d.formattedDate,
        sales: d.amount,
        purchase: Math.round(d.amount * 0.6), // Estimated purchase ratio
      }))

      // Revenue breakdown for donut chart
      const reportData = [
        { name: 'Sales', value: revenue.sales || 0, color: '#8231D3' },
        { name: 'Other Income', value: revenue.income || 0, color: '#00987F' },
        { name: 'Expenses', value: revenue.expenses || 0, color: '#EF4444' },
      ].filter(d => d.value > 0)

      setData({
        products,
        lowStock: products.filter(p => p.quantity < (p.minimumStock || 10)).slice(0, 5),
        expired: products.filter(p => p.status === 'expired').slice(0, 5),
        salesTrend,
        profitLoss,
        revenue,
        salesPurchaseData,
        reportData,
        dashboardKPIs: dashboardRes.data || null,
      })
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  const kpis = data.dashboardKPIs || {}

  return (
    <PageWrapper>
      {/* 4-Card KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Customers"
          value={kpis.totalCustomers || 0}
          trend="+0 Today"
          icon={Users}
          colorClass="text-forty-accent"
          iconBg="bg-forty-accent/10"
        />
        <MetricCard
          title="Total Suppliers"
          value={kpis.totalSuppliers || 0}
          trend="+0 Today"
          icon={UserSquare2}
          colorClass="text-forty-primary"
          iconBg="bg-forty-primary/10"
        />
        <MetricCard
          title="Stock Medicine"
          value={kpis.stockMedicine || 0}
          trend="+0 Today"
          icon={Package}
          colorClass="text-blue-500"
          iconBg="bg-blue-500/10"
        />
        <MetricCard
          title="Expired Medicine"
          value={kpis.expiredCount || 0}
          trend="+0 Today"
          icon={AlertTriangle}
          colorClass="text-forty-red"
          iconBg="bg-forty-red/10"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profit / Loss Bar Chart */}
        <Card title="Monthly Profit / Loss" className="lg:col-span-2 shadow-sm border-none">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.profitLoss}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="revenue" fill="#8231D3" radius={[4, 4, 0, 0]} barSize={20} name="Revenue" />
                <Bar dataKey="cost" fill="#FFB444" radius={[4, 4, 0, 0]} barSize={20} name="Cost" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Overall Report Donut Chart */}
        <Card title="Revenue Breakdown" className="shadow-sm border-none">
          <div className="h-[240px] relative">
            {data.reportData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.reportData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.reportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">No data</div>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.revenue.net || 0)}</p>
              <p className="text-xs text-gray-400">Net Revenue</p>
            </div>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {data.reportData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-500 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales & Purchase Trends */}
        <Card title="Sales & Purchase" className="lg:col-span-2 shadow-sm border-none">
          <div className="h-[300px]">
            {data.salesPurchaseData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.salesPurchaseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="sales" stroke="#8231D3" strokeWidth={3} dot={false} name="Sales" />
                  <Line type="monotone" dataKey="purchase" stroke="#00987F" strokeWidth={3} dot={false} name="Purchases" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">No data</div>
            )}
          </div>
        </Card>

        {/* Low Stock Table */}
        <Card 
          title="Low Stock" 
          subtitle="Total Summary" 
          action={<button className="text-xs text-forty-primary font-bold">View All</button>}
          className="shadow-sm border-none"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Medicine Name</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Batch</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.lowStock.length > 0 ? data.lowStock.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-700">{item.name}</td>
                    <td className="py-3 text-xs text-gray-400">NZ421</td>
                    <td className="py-3 text-sm font-bold text-red-500 text-right">{item.quantity}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="py-4 text-center text-xs text-gray-400">No low stock items</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Bottom Grid: Top 5 and Expired */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top 5 Products */}
        <Card title="Top 5 Product" className="shadow-sm border-none">
          <div className="space-y-4">
            {data.products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img src="https://via.placeholder.com/40" alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-[10px] text-gray-400">Batch: NZ421  |  Price: {formatCurrency(product.unitPrice)}</p>
                </div>
                <button className="p-1 text-gray-300 hover:text-gray-600"><MoreHorizontal size={16} /></button>
              </div>
            ))}
          </div>
        </Card>

        {/* Top 5 Customers */}
        <Card title="Top 5 Customer" className="shadow-sm border-none">
          <div className="space-y-4">
            {topCustomers.length > 0 ? topCustomers.map((customer, idx) => (
              <div key={customer.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forty-accent/10 text-forty-accent flex items-center justify-center font-bold text-sm">
                  {customer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{customer.name}</h4>
                  <p className="text-[10px] text-gray-400">{customer.phone} · {formatCurrency(customer.totalSpent)}</p>
                </div>
                <button className="p-1 text-gray-300 hover:text-gray-600"><MoreHorizontal size={16} /></button>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-xs text-gray-400 font-medium">No customer data yet</p>
              </div>
            )}
          </div>
        </Card>

        {/* Expired Products */}
        <Card title="Expired Product" className="shadow-sm border-none">
          <div className="space-y-4">
            {data.expired.length > 0 ? data.expired.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex-shrink-0 flex items-center justify-center text-red-500">
                  <Package size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-[10px] text-red-500 font-medium">Expired: Nov 24, 2024</p>
                </div>
                <button className="p-1 text-gray-300 hover:text-gray-600"><MoreHorizontal size={16} /></button>
              </div>
            )) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2 text-gray-400">
                  <AlertTriangle size={24} />
                </div>
                <p className="text-xs text-gray-400 font-medium">No expired products found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}
