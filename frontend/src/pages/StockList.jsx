import { useState, useEffect, useCallback } from 'react'
import { productsApi } from '../services/api'
import ListTemplate from '../components/templates/ListTemplate'
import ProductModal from '../components/forms/ProductModal'
import { formatCurrency } from '../utils/formatCurrency'
import Badge from '../components/ui/Badge'

const STOCK_COLUMNS = [
  { key: 'name', label: 'Medicine Name' },
  { key: 'generic', label: 'Generic' },
  { key: 'category', label: 'Category' },
  {
    key: 'quantity',
    label: 'Stock',
    className: 'text-center',
    render: (val, item) => {
      if (item.status === 'out_of_stock') {
        return <Badge status="out_of_stock">Out of Stock</Badge>
      }
      if (item.status === 'near_expiry') {
        return (
          <div className="flex items-center justify-center gap-1">
            <span className="font-medium">{val}</span>
            <Badge status="near_expiry">Near Expiry</Badge>
          </div>
        )
      }
      if (item.status === 'expired') {
        return <Badge status="expired">Expired</Badge>
      }
      return <span className="font-medium">{val}</span>
    },
  },
  {
    key: 'unitPrice',
    label: 'Price',
    render: (val) => formatCurrency(val),
  },
  {
    key: 'expiryDate',
    label: 'Expiry Date',
    render: (val) => {
      if (!val) return '—'
      const date = new Date(val)
      return date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })
    },
  },
]

export default function StockList({ filter = 'all' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll({})
      setProducts(res.data || [])
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Filter products based on status
  const filteredProducts = products.filter(product => {
    if (filter === 'current') {
      return product.status !== 'expired' && product.status !== 'out_of_stock'
    }
    if (filter === 'expired') {
      return product.status === 'expired'
    }
    if (filter === 'low') {
      return product.quantity < (product.minimumStock || 10)
    }
    if (filter === 'outofstock') {
      return product.status === 'out_of_stock'
    }
    return true // 'all'
  })

  const handleAddNew = useCallback(() => {
    setSelectedProduct(null)
    setModalOpen(true)
  }, [])

  const handleEdit = useCallback((product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }, [])

  const handleSuccess = useCallback(() => {
    fetchProducts()
  }, [fetchProducts])

  const getTitle = () => {
    switch (filter) {
      case 'current': return 'Current Stock'
      case 'expired': return 'Expired Stock'
      case 'low': return 'Low Stock'
      case 'outofstock': return 'Out of Stock'
      default: return 'All Stock'
    }
  }

  const getSubtitle = () => {
    switch (filter) {
      case 'current': return 'All available medicine inventory'
      case 'expired': return 'Items past their expiry dates'
      case 'low': return 'Products running low on stock'
      case 'outofstock': return 'Products currently unavailable'
      default: return 'Complete inventory overview'
    }
  }

  return (
    <>
      <ListTemplate
        title={getTitle()}
        subtitle={getSubtitle()}
        columns={STOCK_COLUMNS}
        data={filteredProducts}
        loading={loading}
        onAddClick={handleAddNew}
        onEditClick={handleEdit}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSuccess={handleSuccess}
      />
    </>
  )
}
