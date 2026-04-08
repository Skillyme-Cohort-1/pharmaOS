import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import POSView from './pages/Sales/POSView'
import ListTemplate from './components/templates/ListTemplate'
import FormTemplate, { FormField, FormInput, FormSelect } from './components/templates/FormTemplate'
import Badge from './components/ui/Badge'
import { formatCurrency } from './utils/formatCurrency'

// --- Master Column Definitions ---
const COLS = {
  SALES: [
    { key: 'date', label: 'Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'total', label: 'Total', render: (val) => formatCurrency(val) },
    { key: 'status', label: 'Status', render: (val) => <Badge status={val === 'Paid' ? 'completed' : 'pending'}>{val}</Badge> },
  ],
  PRODUCTS: [
    { key: 'name', label: 'Medicine Name' },
    { key: 'generic', label: 'Generic' },
    { key: 'stock', label: 'Stock', className: 'text-center' },
    { key: 'price', label: 'Price', render: (val) => formatCurrency(val) },
  ],
  CUSTOMERS: [
    { key: 'name', label: 'Customer Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'balance', label: 'Balance', render: (val) => formatCurrency(val || 0) },
  ],
  FINANCE: [
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val) },
    { key: 'status', label: 'Status', render: (val) => <Badge status="completed">{val}</Badge> },
  ]
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
            <Route path="/sales" element={<ProtectedRoute>
              <ListTemplate 
                title="Sales List" 
                subtitle="All historical sales" 
                storageKey="sales_list" 
                columns={COLS.SALES} 
                initialData={[{ id: '1', date: '2024-11-20', customer: 'Wait In Customer', total: 1200, status: 'Paid' }]}
              />
            </ProtectedRoute>} />
            
            {/* Purchases */}
            <Route path="/purchases/new" element={<ProtectedRoute>
              <FormTemplate title="Purchase New" subtitle="Add new stock purchase">
                <FormField label="Supplier"><FormSelect><option>Nairobi Wholesale</option></FormSelect></FormField>
                <FormField label="Purchase Date"><FormInput type="date" /></FormField>
                <FormField label="Invoice No"><FormInput placeholder="INV-001" /></FormField>
              </FormTemplate>
            </ProtectedRoute>} />
            <Route path="/purchases" element={<ProtectedRoute>
              <ListTemplate title="Purchase List" storageKey="purchases" columns={COLS.SALES} initialData={[]} />
            </ProtectedRoute>} />
            
            {/* Products */}
            <Route path="/products" element={<ProtectedRoute>
              <ListTemplate 
                title="All Products" 
                subtitle="Complete inventory" 
                storageKey="products_all" 
                columns={COLS.PRODUCTS} 
                initialData={[
                  { id: '1', name: 'Amoxicillin', generic: 'Antibiotic', stock: 120, price: 450 },
                  { id: '2', name: 'Panadol', generic: 'Paracetamol', stock: 15, price: 50 },
                ]}
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
              <ListTemplate title="Print Barcodes" subtitle="Generate labels for current stock" storageKey="products_all" columns={COLS.PRODUCTS} initialData={[]} />
            </ProtectedRoute>} />
            
            {/* Customers & Suppliers */}
            <Route path="/customers" element={<ProtectedRoute>
              <ListTemplate title="Customer List" storageKey="customers" columns={COLS.CUSTOMERS} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/customers/new" element={<ProtectedRoute>
              <FormTemplate title="Add Customer" subtitle="Create new patient record">
                <FormField label="Customer Name" required><FormInput /></FormField>
                <FormField label="Phone"><FormInput /></FormField>
                <FormField label="Email"><FormInput type="email" /></FormField>
                <FormField label="Address"><FormInput /></FormField>
              </FormTemplate>
            </ProtectedRoute>} />

            <Route path="/suppliers" element={<ProtectedRoute>
              <ListTemplate title="Supplier List" storageKey="suppliers" columns={COLS.CUSTOMERS} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/suppliers/new" element={<ProtectedRoute>
              <FormTemplate title="Add Supplier" subtitle="Create new vendor record">
                <FormField label="Supplier Name" required><FormInput /></FormField>
                <FormField label="Phone"><FormInput /></FormField>
                <FormField label="Contact Person"><FormInput /></FormField>
              </FormTemplate>
            </ProtectedRoute>} />
            
            {/* Financials */}
            <Route path="/incomes" element={<ProtectedRoute>
              <ListTemplate title="Incomes" storageKey="incomes" columns={COLS.FINANCE} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute>
              <ListTemplate title="Expenses" storageKey="expenses" columns={COLS.FINANCE} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/tax" element={<ProtectedRoute>
              <ListTemplate title="Tax List" storageKey="taxes" columns={COLS.FINANCE} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/due-list" element={<ProtectedRoute>
              <ListTemplate title="Due List" storageKey="dues" columns={COLS.FINANCE} initialData={[]} />
            </ProtectedRoute>} />
            
            {/* Reports & Specialized */}
            <Route path="/reports" element={<ProtectedRoute>
              <ListTemplate title="Reports" subtitle="Generate system insights" storageKey="reports" columns={COLS.FINANCE} initialData={[]} />
            </ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute>
              <FormTemplate title="Settings" subtitle="Manage your pharmacy configuration">
                <FormField label="Pharmacy Name"><FormInput defaultValue="PharmaOS Demo" /></FormField>
                <FormField label="Address"><FormInput defaultValue="Nairobi, Kenya" /></FormField>
                <FormField label="Currency"><FormSelect><option>KES</option><option>USD</option></FormSelect></FormField>
              </FormTemplate>
            </ProtectedRoute>} />

            {/* Stock List */}
            <Route path="/stock/current" element={<ProtectedRoute>
              <ListTemplate 
                title="Current Stock" 
                subtitle="All available medicine inventory" 
                storageKey="stock_current" 
                columns={COLS.PRODUCTS} 
                initialData={[
                  { id: '1', name: 'Amoxicillin', generic: 'Antibiotic', stock: 120, price: 450 },
                  { id: '2', name: 'Panadol', generic: 'Paracetamol', stock: 15, price: 50 },
                ]}
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

