import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Page Imports
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import Finance from "./pages/Finance";
import Products from "./pages/Products"; 
import Stock from "./pages/Stock";
import Staff from "./pages/Staff";

// Modal Imports
import AddProduct from "./components/modals/AddProduct";

export default function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      
      {/* Main Navigation Routes */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/sales" element={<Layout><Sales /></Layout>} />
      <Route path="/purchases" element={<Layout><Purchases /></Layout>} />
      <Route path="/customers" element={<Layout><Customers /></Layout>} />
      <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
      <Route path="/reports" element={<Layout><Reports /></Layout>} />
      <Route path="/stock" element={<Layout><Stock /></Layout>} />
      <Route path="/staff" element={<Layout><Staff /></Layout>} />
      {/* Update App.jsx to this if you want to keep the SubMenu */}
      <Route path="/finance" element={<Layout><Finance /></Layout>} />
      <Route path="/finance/incomes" element={<Layout><Finance /></Layout>} />
      <Route path="/finance/expenses" element={<Layout><Finance /></Layout>} />
      <Route path="/finance/tax" element={<Layout><Finance /></Layout>} />
      
      {/* Modal / Action Routes */}
      {/* Force isOpen to true since it's its own route, and use history.back() for the close button */}
      <Route 
        path="/products/add" 
        element={
          <Layout>
            <AddProduct 
              isOpen={true} 
              onClose={() => window.history.back()} 
            />
          </Layout>
        } 
      />
      
      {/* Account Routes */}
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />

      {/* Fallback: Redirect any unknown routes to Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}