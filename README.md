# PharmaOS — Pharmacy Internal Management System

> **The operational backbone of the modern pharmacy.**

PharmaOS is a comprehensive internal management system designed for pharmacy operations. It provides inventory management, order tracking, expiry detection, analytics, and intelligent prompt-to-action capabilities.

## 🚀 Live Demo

[Insert Live URL Here]

## 📋 Features

- **Inventory Management** — Full CRUD operations with status filtering (active, expired, near-expiry, out-of-stock)
- **Order Management** — Complete order lifecycle from pending to completion with atomic inventory updates
- **Expiry Detection** — Automated daily scanning with real-time alerts for expiring products
- **Dashboard** — Real-time KPIs, revenue charts, and intelligent prompt-to-action search
- **Analytics** — Sales trends and top-performing products visualization
- **Transaction Log** — Complete audit trail of all financial activities
- **CSV Import** — Bulk data migration from legacy systems

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Recharts
- Lucide React Icons
- Axios

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- node-cron
- Multer (file uploads)
- Zod validation

## 📦 Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file from .env.example
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

Server will start on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file from .env.example
cp .env.example .env

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/pharmaos"
PORT=3000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
LOW_STOCK_THRESHOLD=10
NEAR_EXPIRY_DAYS=7
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:3000/api"
```

## 📚 API Documentation

Full API documentation available in `docs/` folder. Quick reference:

| Endpoint | Method | Description |
|---|---|---|
| `/api/products` | GET, POST | List/create products |
| `/api/products/:id` | PUT, DELETE | Update/delete product |
| `/api/orders` | GET, POST | List/create orders |
| `/api/orders/:id/status` | PUT | Update order status |
| `/api/transactions` | GET | List transactions |
| `/api/transactions/summary` | GET | Get revenue summary |
| `/api/alerts` | GET | List alerts |
| `/api/alerts/run` | POST | Run expiry scan |
| `/api/analytics/sales` | GET | Get sales trends |
| `/api/analytics/top-products` | GET | Get top products |
| `/api/import/products` | POST | Import CSV |
| `/api/prompt` | POST | Query resolver |

## 👥 Team

**Tech Vanguard**
- Victor Chogo
- Lynn Gathoni
- Mukhoyo
- Vivian Kioko
- Julis
- Paul Gitaranga

## 📄 License

Internal project for demonstration purposes.
