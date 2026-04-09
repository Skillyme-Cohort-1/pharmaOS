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
