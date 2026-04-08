import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// Request interceptor - always attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - unwrap .data and handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized globally (but not for login endpoint)
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }

    const message = error.response?.data?.error || 'Request failed. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export default api

// Products API
export const productsApi = {
  getAll: (params) => api.get('/products', { params }),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
}

// Orders API
export const ordersApi = {
  getAll: (params) => api.get('/orders', { params }),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
}

// Alerts API
export const alertsApi = {
  getAll: (params) => api.get('/alerts', { params }),
  runScan: () => api.post('/alerts/run'),
  markRead: (id) => api.put(`/alerts/${id}/read`),
  markAllRead: () => api.put('/alerts/read-all'),
}

// Analytics API
export const analyticsApi = {
  sales: (period) => api.get('/analytics/sales', { params: { period } }),
  topProducts: (params) => api.get('/analytics/top-products', { params }),
}

// Transactions API
export const transactionsApi = {
  getAll: (params) => api.get('/transactions', { params }),
  getSummary: () => api.get('/transactions/summary'),
}

// Prompt API
export const promptApi = {
  query: (query) => api.post('/prompt', { query }),
}

// Import API
export const importApi = {
  uploadCSV: (file) => {
    const form = new FormData()
    form.append('file', file)
    return api.post('/import/products', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// Reports API
export const reportsApi = {
  getInventory: () => api.get('/reports/inventory'),
  getExpiry: () => api.get('/reports/expiry'),
  getSales: () => api.get('/reports/sales'),
}

// Customers API
export const customersApi = {
  getAll: (params) => api.get('/customers', { params }),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  remove: (id) => api.delete(`/customers/${id}`),
  getTop: () => api.get('/customers/top'),
}

// Suppliers API
export const suppliersApi = {
  getAll: (params) => api.get('/suppliers', { params }),
  create: (data) => api.post('/suppliers', data),
  update: (id, data) => api.put(`/suppliers/${id}`, data),
  remove: (id) => api.delete(`/suppliers/${id}`),
}

// Purchases API
export const purchasesApi = {
  getAll: (params) => api.get('/purchases', { params }),
  create: (data) => api.post('/purchases', data),
  update: (id, data) => api.put(`/purchases/${id}`, data),
  remove: (id) => api.delete(`/purchases/${id}`),
  getSummary: (params) => api.get('/purchases/summary', { params }),
}

// Expenses API
export const expensesApi = {
  getAll: (params) => api.get('/expenses', { params }),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  remove: (id) => api.delete(`/expenses/${id}`),
  getSummary: (params) => api.get('/expenses/summary', { params }),
}

// Incomes API
export const incomesApi = {
  getAll: (params) => api.get('/incomes', { params }),
  create: (data) => api.post('/incomes', data),
  update: (id, data) => api.put(`/incomes/${id}`, data),
  remove: (id) => api.delete(`/incomes/${id}`),
  getSummary: (params) => api.get('/incomes/summary', { params }),
}

// Settings API
export const settingsApi = {
  getAll: () => api.get('/settings'),
  get: (key) => api.get(`/settings/${key}`),
  update: (key, data) => api.put(`/settings/${key}`, data),
  updateBulk: (data) => api.put('/settings/bulk', data),
}

// Extend Analytics API with dashboard endpoints
export const analyticsExtended = {
  ...analyticsApi,
  dashboard: () => api.get('/analytics/dashboard'),
  profitLoss: (params) => api.get('/analytics/profit-loss', { params }),
  revenue: (params) => api.get('/analytics/revenue', { params }),
}
