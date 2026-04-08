import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import POSView from './pages/Sales/POSView'
import SalesList from './pages/Sales/SalesList'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Purchases from './pages/Purchases'
import PurchaseNew from './pages/PurchaseNew'
import Expenses from './pages/Expenses'
import Incomes from './pages/Incomes'
import DueList from './pages/DueList'
import Tax from './pages/Tax'
import Settings from './pages/Settings'
import ListTemplate from './components/templates/ListTemplate'
import FormTemplate, { FormField, FormInput, FormSelect } from './components/templates/FormTemplate'
import Badge from './components/ui/Badge'
import { formatCurrency } from './utils/formatCurrency'

// --- Master Column Definitions ---
const COLS = {
  PRODUCTS: [
    { key: 'name', label: 'Medicine Name' },
    { key: 'generic', label: 'Generic' },
    { key: 'stock', label: 'Stock', className: 'text-center' },
    { key: 'price', label: 'Price', render: (val) => formatCurrency(val) },
  ],
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* Sales */}
            <Route path="/sales/new" element={<ProtectedRoute><POSView /></ProtectedRoute>} />
            <Route path="/sales" element={<ProtectedRoute><SalesList /></ProtectedRoute>} />

            {/* Purchases */}
            <Route path="/purchases/new" element={<ProtectedRoute><PurchaseNew /></ProtectedRoute>} />
            <Route path="/purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />

            {/* Products */}
            <Route path="/products" element={<ProtectedRoute>
              <ListTemplate
                title="All Products"
                subtitle="Complete inventory"
                storageKey="products_all"
                columns={COLS.PRODUCTS}
                initialData={[]}
              />
            </ProtectedRoute>} />
            <Route path="/products/new" element={<ProtectedRoute>
              <FormTemplate title="Add Product" subtitle="Create new medicine record">
                <FormField label="Medicine Name" required><FormInput /></FormField>
                <FormField label="Generic Name"><FormInput /></FormField>
                <FormField label="Category"><FormSelect><option>Tablet</option><option>Syrup</option></FormSelect></FormField>
                <FormField label="Purchase Price"><FormInput type="number" /></FormField>
                <FormField label="Sale Price"><FormInput type="number" /></FormField>
                <FormField label="Stock Quantity"><FormInput type="number" /></FormField>
              </FormTemplate>
            </ProtectedRoute>} />
            <Route path="/products/barcodes" element={<ProtectedRoute>
              <ListTemplate title="Print Barcodes" subtitle="Generate labels for current stock" storageKey="products_barcodes" columns={COLS.PRODUCTS} initialData={[]} />
            </ProtectedRoute>} />

            {/* Customers & Suppliers */}
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/customers/new" element={<ProtectedRoute><Navigate to="/customers" replace /></ProtectedRoute>} />

            <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
            <Route path="/suppliers/new" element={<ProtectedRoute><Navigate to="/suppliers" replace /></ProtectedRoute>} />

            {/* Financials */}
            <Route path="/incomes" element={<ProtectedRoute><Incomes /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/tax" element={<ProtectedRoute><Tax /></ProtectedRoute>} />
            <Route path="/due-list" element={<ProtectedRoute><DueList /></ProtectedRoute>} />

            {/* Reports & Specialized */}
            <Route path="/reports" element={<ProtectedRoute>
              <ListTemplate title="Reports" subtitle="Generate system insights" storageKey="reports" columns={COLS.PRODUCTS} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            {/* Stock List */}
            <Route path="/stock/current" element={<ProtectedRoute>
              <ListTemplate
                title="Current Stock"
                subtitle="All available medicine inventory"
                storageKey="stock_current"
                columns={COLS.PRODUCTS}
                initialData={[]}
              />
            </ProtectedRoute>} />
            <Route path="/stock/expired" element={<ProtectedRoute>
              <ListTemplate
                title="Expired Stock"
                subtitle="Items past their expiry dates"
                storageKey="stock_expired"
                columns={COLS.PRODUCTS}
                initialData={[]}
              />
            </ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App

