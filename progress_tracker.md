# PharmaOS Progress Tracker

## 2026-04-11 — Dashboard 403 Handling & Demo Data Balance

### Issues Identified
- **Dashboard 403 Forbidden errors**: Users without proper roles (PHARMACIST, DISPATCH, RIDER, RECEIVING_BAY) were getting 403 errors on analytics, products, orders, and customers endpoints. The dashboard was failing silently with missing data.
- **Negative net revenue on dashboard**: Demo seed data had massively unbalanced expenses (KES 211,000) vs sales (KES 11,820) and income (KES 9,500), causing the revenue breakdown to show a large negative value.
- **Stock List "Add New" button not working**: The Stock List pages used `ListTemplate` without passing `onAddClick`, so clicking "Add New" did nothing.

### Fixes Applied
- **Graceful 403 degradation on Dashboard** (`Dashboard.jsx`):
  - Added `permissions` state to track access per section (analytics, products, orders, customers)
  - Created `AccessDenied` component with lock icon and clear messaging
  - Changed from `Promise.all()` to `Promise.allSettled()` to prevent one failure from crashing the entire dashboard
  - Added `isRejected()` helper to detect permission errors per endpoint
  - KPI cards show "—" and "Restricted" when access is denied
  - All chart sections (Profit/Loss, Revenue Breakdown, Sales & Purchase) conditionally render `AccessDenied` when permissions are false
  - Low Stock table, Top 5 Products, and Top 5 Customers sections also protected

- **Positive revenue on dashboard** (`seed.js`, `start.sh`, `update-demo-data.js`, `package.json`):
  - Created `prisma/update-demo-data.js` script to rebalance demo financial data
  - Expenses reduced from ~KES 211,000 to ~KES 31,000
  - Income increased from ~KES 9,500 to ~KES 25,100
  - Expected net: ~KES 5,920 (positive)
  - Updated `start.sh` to run `npm run update-demo` on every deployment (not just when users=0)
  - Dashboard donut chart now shows "Net Revenue" when positive, "Net Loss" (in red) when negative

- **Stock List fully functional** (`StockList.jsx`, `ListTemplate.jsx`, `App.jsx`):
  - Created dedicated `StockList` page component with inline expandable form (matching Customers/Suppliers pattern)
  - "Add New" button opens inline form inside the Card
  - Same form handles Create and Edit (using `editId` state)
  - Search filters by name, generic, or category
  - Status badges (Out of Stock, Near Expiry, Expired) displayed inline
  - Edit/Delete row actions fully wired
  - `ListTemplate.jsx` updated to accept external `data` and `loading` props
  - Routes added: `/stock/current`, `/stock/expired`, `/stock/low`, `/stock/outofstock`

- **Products page** (`Products.jsx`, `App.jsx`):
  - Created dedicated `Products` page with inline form pattern
  - Full CRUD: name, generic, category, batch, quantity, unit price, purchase price, expiry date, minimum stock
  - Search filters by name, generic, category, or batch number
  - Low stock highlighting in red
  - Replaced old `ListTemplate` usage with proper page component

- **Reports page** (`App.jsx`):
  - Updated routing to use existing `Reports.jsx` (card-based layout with PDF/CSV download buttons)
  - Removed dead `ListTemplate` wrapper

### Branches
- `main` — Active development branch
- `testing` — Snapshot of current implementation for QA (created from `main` at commit `09fe50e`)

---

## 2026-04-11 — POS Quick Actions Functional & Stretchable Cart

### Issues Identified
- **Quick Action buttons on POS were dead**: Stock List, Today Sales, Calculator, and Power/Logout buttons had no `onClick` handlers.
- **Customer "+" button did nothing**: No navigation to customer creation.
- **Cart area didn't stretch**: The transaction table had fixed proportions and didn't adapt when items were added.

### Fixes Applied
- **Quick Actions wired up** (`POSView.jsx`):
  - **Stock List** → navigates to `/stock/current`
  - **Today Sales** → navigates to `/sales`
  - **Calculator** → opens working calculator modal with basic arithmetic (+, -, *, /)
  - **Power/Logout** → triggers logout confirmation via `useAuth()`
  - **Customer "+" button** → navigates to `/customers`

- **Stretchable cart layout** (`POSView.jsx`):
  - Outer panel constrained to `maxHeight: 'calc(100vh - 120px)'` to never exceed viewport
  - Cart area: `minHeight: '280px'` (fits ~5 items), expands naturally for ≤5 items
  - When >5 items: `maxHeight: '420px'` with scroll overflow
  - Quick Actions, Billing, and Footer sections use `shrink-0` to never get compressed
  - Payment inputs and Reset/Save/Save & Print buttons always visible

### Commits
- `feat: make POS Quick Actions fully functional with navigation, calculator, and logout` — `0fdf21c`
- `refactor: make POS cart area stretchable with proper min/max height for 5+ items` — `4be38b7`

---
