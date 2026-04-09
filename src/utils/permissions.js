/**
 * Centralized permissions map for PharmaOS.
 * Maps logical route groups to an array of allowed UserType roles.
 * These arrays are designed to be passed directly into the roleGuard middleware.
 */
export const PERMISSIONS = {
  // --- Core Operations ---
  PRODUCTS: ['ADMIN', 'SUPER_ADMIN'],
  
  ORDERS: ['ADMIN', 'SUPER_ADMIN', 'PHARMACIST'],
  
  TRANSACTIONS: ['FINANCE', 'ADMIN', 'SUPER_ADMIN'],
  
  ANALYTICS: ['FINANCE', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'],

  // --- Specialized / Administrative Operations ---
  POS: ['PHARMACIST', 'SUPER_ADMIN'], // Point of Sale operations
  
  USERS: ['SUPER_ADMIN'], // User management
  
  ROLES: ['SUPER_ADMIN']  // Role and permissions management
};