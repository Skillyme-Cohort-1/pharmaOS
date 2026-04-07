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
import Products from "./pages/Products"; // Don't forget this one!
import AddProduct from "./components/modals/AddProduct"; // Import the AddProduct component
import Stock from "./pages/Stock";
import Staff from "./pages/Staff";

export default function App() {
  return (
    <Routes>
      {/* Wrap all authenticated routes in the Layout. 
        Note: I've changed the "/" path to show the Dashboard directly.
      */}
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      
      {/* Main Navigation Routes */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/sales" element={<Layout><Sales /></Layout>} />
      <Route path="/purchases" element={<Layout><Purchases /></Layout>} />
      <Route path="/customers" element={<Layout><Customers /></Layout>} />
      <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
      <Route path="/finance" element={<Layout><Finance /></Layout>} />
      <Route path="/reports" element={<Layout><Reports /></Layout>} />
      <Route path="/stock" element={<Layout><Stock /></Layout>} />
      <Route path="/staff" element={<Layout><Staff /></Layout>} />
      <Route path="/addproducts" element={<Layout><AddProduct onAddProduct={() => { /* You can implement this function to refresh the product list after adding a new product */ }} /></Layout>} />
      
       {/* Add Product Route */}
      <Route path="/products/add" element={<Layout><AddProduct onAddProduct={() => { /* You can implement this function to refresh the product list after adding a new product */ }} /></Layout>} />
      
      
      {/* Account Routes */}
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />

      {/* Fallback: Redirect any unknown routes to Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}