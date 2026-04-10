# PharmaOS

PharmaOS is a pharmacy operations platform. This branch currently contains the React + Vite pharmacy dashboard UI together with Prisma configuration for PostgreSQL-backed users, pharmacists, and role-based access control.

## Current Scope

- Dashboard-style pharmacy management interface
- Product, stock, sales, purchase, supplier, customer, and staff flows
- Finance and reporting pages
- Role permissions in `src/utils/permissions.js`
- Route protection helpers in `src/middleware/roleGuard.js`
- Prisma schema, migrations, and seed data

## Tech Stack


- React
- Vite
- React Router
- Tailwind CSS
- Bootstrap / React Bootstrap
- Prisma ORM
- PostgreSQL

## 📋 Features

- **Inventory Management** — Full CRUD operations with status filtering (active, expired, near-expiry, out-of-stock)
- **Quick-Edit Modals** — High-fidelity pop-ups with **View** vs **Edit** modes for rapid inventory and order updates.
- **Order Lifecycle** — Complete order tracking from pending to completion with atomic inventory updates.
- **Professional Reports** — Export high-quality **PDF (Landscape)** and **CSV** business analytics for Inventory, Expiry, and Sales.
- **Automated Expiry Detection** — Daily scanning engine with real-time sidebar alerts.
- **Intelligent Search** — "Ask PharmaOS" prompt-based search on the dashboard for instant data retrieval.
- **Transaction Audit** — Real-time tracking of every financial change for transparency.

## 📂 Project Structure

```mermaid
graph TD
    Root[pharma-os /] --> BE[backend /]
    Root --> FE[frontend /]
    
    BE --> B_Prisma[prisma / schema.prisma]
    BE --> B_Src[src /]
    B_Src --> B_App[app.js]
    B_Src --> B_Ctrl[controllers /]
    B_Src --> B_Route[routes /]
    B_Src --> B_Mid[middleware /]
    B_Src --> B_Utils[utils /]
    B_Src --> B_Jobs[jobs / expiryScanner]

    FE --> F_Src[src /]
    F_Src --> F_Page[pages / Dashboard, Inventory, Reports...]
    F_page --> F_Comp[components / ui, forms, layout, charts]
    F_Src --> F_Svc[services / api.js]
    F_Src --> F_Ctx[context / Auth, Toast]
    F_Src --> F_Hooks[hooks / useProducts, useOrders]
    F_Src --> F_Utils[utils / reportGenerators]
```

PharmaOS is architected as a clean Monorepo-style project with clear separation between the API (Backend) and the Interface (Frontend).

### 🖥️ Backend (/backend)
Built with **Express**, **Prisma**, and **PostgreSQL**.
- `prisma/` — The database heartbeat. Contains the `schema.prisma` definition and the `seed.js` script.
- `src/`
  - `app.js` — The core Express application configuration and middleware pipeline.
  - `controllers/` — The business logic layer. Handlers for products, orders, imports, and **reporting**.
  - `routes/` — The API routing layer. Defines endpoints and maps them to controllers.
  - `middleware/` — Security, JWT authentication, Zod validation, and error handling.
  - `utils/` — Shared helpers for response formatting, logging, and alert management.
  - `jobs/` — Scheduled tasks, specifically the **Daily Expiry Scanner**.

### 🎨 Frontend (/frontend)
Built with **React 18**, **Vite**, and **Vanilla/Tailwind CSS**.
- `src/`
  - `pages/` — The high-level page views (Dashboard, Inventory, Reports, etc.).
  - `components/`
    - `ui/` — Atomic, reusable UI components (Buttons, Inputs, Modals, Tables).
    - `forms/` — Complex, state-managed forms like the new `ProductModal` and `OrderModal`.
    - `layout/` — Structural components like the `Sidebar` and `PageWrapper`.
    - `charts/` — Data visualization using Recharts.
  - `context/` — Global state management for Authentication and UI Toasts.
  - `services/` — The API communication layer (Axios instances).
  - `utils/` — Formatting helpers for currency, dates, and the **PDF Report Generators**.
  - `hooks/` — Custom React hooks for standardized data fetching.

---

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Recharts (Visualization)
- **jsPDF + AutoTable** (Reporting)
- Lucide React (Icons)
- Axios

### Backend
- Node.js + Express
- **Prisma ORM**
- PostgreSQL
- node-cron (Scheduling)
- Multer (CSV handling)
- Zod (Validation schema)



## Project Structure

```text
src/
  components/
    layout/
    modals/
    ui/
  middleware/
  pages/
  utils/
prisma/
  migrations/
  schema.prisma
  seed.ts
```


## Getting Started

1. Install dependencies:


### Backend Setup

```bash
npm install
```

2. Create a `.env` file with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/pharmaos?schema=public"
```

3. Apply database migrations:

```bash
npx prisma migrate dev
```

4. Seed the database:

```bash
npx prisma db seed
```

5. Start the app:

```bash
npm run dev
```


## Available Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npx prisma validate`
- `npx prisma migrate status`
- `npx prisma db seed`

## Roles
=======
### Frontend Setup
```bash
cd frontend
npm install


Current user roles include:

- `SUPER_ADMIN`
- `MANAGER`
- `DISPATCH`
- `ADMIN`
- `FINANCE`
- `RECEIVING_BAY`
- `RIDER`
- `PHARMACIST`


## Notes

- The seed script creates default test users, including pharmacist records.
- Generated files such as `.vite/`, `dist/`, and `node_modules/` are excluded from version control.

---

## 📚 Documentation & Guides

For deeper technical dives, refer to our specialized guides:

- [API Reference](API.md) — Detailed request/response schemas for all endpoints.
- [Database Schema](DATABASE_SETUP.md) — ER diagrams and table structures.
- [Design Specification](design.md) — UI/UX principles and color tokens.
- [Deployment Guide](C:\Users\victo\.gemini\antigravity\brain\59abee1a-915a-451d-b29a-93848b90b93a/deployment_guide.md) — Production rollout instructions.

---

## 👥 Team

**Tech Vanguard**
- Victor Chogo
- Daisy Bless
- Mukhongo Vivian
- Kioko Julius
- Paul Gitaranga
- Stephen Oduor
  

## 📄 License

Internal project for demonstration purposes.

