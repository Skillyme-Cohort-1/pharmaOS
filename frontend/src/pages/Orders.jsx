import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Table from '../components/ui/Table'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import { useOrders } from '../hooks/useOrders'
import { useProducts } from '../hooks/useProducts'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'
import { ordersApi } from '../services/api'

const statusTabs = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function Orders() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    productId: '',
    quantity: 1,
  })
  const [formErrors, setFormErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [processing, setProcessing] = useState({})

  const { orders, loading, refetch } = useOrders({ 
    status: statusFilter || undefined,
    search: search || undefined,
  })
  const { products } = useProducts({ status: 'active' })

  const productOptions = [
    { value: '', label: 'Select Product' },
    ...products.map(p => ({ value: p.id, label: `${p.name} - ${formatCurrency(p.unitPrice)}` })),
  ]

  const handleOpenModal = () => {
    setFormData({
      customerName: '',
      customerPhone: '',
      productId: '',
      quantity: 1,
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.customerName.trim()) errors.customerName = 'Customer name is required'
    if (!formData.customerPhone.trim()) errors.customerPhone = 'Phone number is required'
    if (!formData.productId) errors.productId = 'Product is required'
    if (formData.quantity < 1) errors.quantity = 'Quantity must be at least 1'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setSaving(true)
    try {
      await ordersApi.create(formData)
      toast.success('Order created successfully')
      setIsModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.message || 'Failed to create order')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusUpdate = async (orderId, status) => {
    setProcessing({ ...processing, [orderId]: true })
    try {
      await ordersApi.updateStatus(orderId, status)
      toast.success(`Order ${status}`)
      refetch()
    } catch (err) {
      toast.error(err.message || 'Failed to update order')
    } finally {
      setProcessing({ ...processing, [orderId]: false })
    }
  }

  const getActionButtons = (order) => {
    const isProcessing = processing[order.id]
    
    switch (order.status) {
      case 'pending':
        return (
          <Button 
            size="sm" 
            onClick={() => handleStatusUpdate(order.id, 'processing')}
            loading={isProcessing}
          >
            Start Processing
          </Button>
        )
      case 'processing':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="primary"
              onClick={() => handleStatusUpdate(order.id, 'completed')}
              loading={isProcessing}
            >
              Complete
            </Button>
            <Button 
              size="sm" 
              variant="danger"
              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
              loading={isProcessing}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        )
      default:
        return <span className="text-gray-400 text-sm">—</span>
    }
  }

  const columns = [
    { header: 'Customer', accessor: 'customerName', render: (row) => (
      <div>
        <div className="font-medium text-gray-900">{row.customerName}</div>
        <div className="text-xs text-gray-500">{row.customerPhone}</div>
      </div>
    )},
    { header: 'Product', accessor: 'product', render: (row) => (
      <span className="text-gray-700">{row.product?.name || 'Unknown'}</span>
    )},
    { header: 'Qty', accessor: 'quantity', align: 'center', render: (row) => (
      <span>{row.quantity}</span>
    )},
    { header: 'Amount', accessor: 'totalAmount', align: 'right', render: (row) => (
      <span className="font-medium">{formatCurrency(row.totalAmount)}</span>
    )},
    { header: 'Status', accessor: 'status', align: 'center', render: (row) => (
      <Badge status={row.status} />
    )},
    { header: 'Date', accessor: 'createdAt', render: (row) => (
      <span className="text-sm text-gray-500">{formatDate(row.createdAt)}</span>
    )},
    { header: 'Action', align: 'right', render: (row) => getActionButtons(row) },
  ]

  return (
    <PageWrapper 
      title="Orders"
      action={
        <Button onClick={handleOpenModal}>
          Create Order
        </Button>
      }
    >
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === tab.value
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={orders}
        loading={loading}
        emptyState={
          <EmptyState
            icon={<ShoppingCart size={48} />}
            title="No orders found"
            description="Create your first order to get started"
            action={
              <Button onClick={handleOpenModal}>
                Create Order
              </Button>
            }
          />
        }
      />

      {/* Create Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Order"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Customer Name *"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            error={formErrors.customerName}
            placeholder="e.g., John Doe"
          />
          
          <Input
            label="Phone Number *"
            value={formData.customerPhone}
            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
            error={formErrors.customerPhone}
            placeholder="e.g., 0712345678"
          />
          
          <Select
            label="Product *"
            value={formData.productId}
            onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
            options={productOptions}
            error={formErrors.productId}
          />
          
          <Input
            label="Quantity *"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            error={formErrors.quantity}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              Create Order
            </Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  )
}
