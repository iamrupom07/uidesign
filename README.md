# MACPROTEC Enterprise Monorepo

Enterprise-grade, highly scalable Turborepo monorepo powered by **Next.js 16**, **Express.js**, **PostgreSQL**, **Prisma ORM**, **Better Auth**, **Redux Toolkit / RTK Query**, and **Nodemailer with EJS Email Templates**.

Designed for enterprise SaaS workloads with strict security, seamless DX, and modular application expansion.

---

## 📐 Monorepo Architecture

```text
macprotec-site/
├── apps/
│   ├── web/                # Next.js 16 App Router Frontend Application
│   └── api/                # Express.js REST API Backend Engine (Clean Architecture)
│
├── packages/
│   ├── database/           # Prisma ORM, PostgreSQL Schema, Migrations & Admin Seeder
│   ├── ui/                 # Shared React UI Component Library & Design System
│   ├── types/              # Centralized TypeScript Interfaces & API Schemas
│   ├── utils/              # Shared Helper Utilities, Cookie Parsers & Response Formatters
│   ├── constants/          # Shared Roles, HTTP Status Codes & API Route Definitions
│   └── config/             # Base TypeScript, ESLint & Prettier Configurations
│
├── turbo.json              # Turborepo Task Pipelines
├── pnpm-workspace.yaml     # pnpm Workspace Package Definitions
├── package.json            # Root Orchestration & Developer Tooling
└── README.md               # Enterprise Documentation & Setup Guide
```

---

## 🚀 Future Application Scalability

The monorepo architecture is pre-configured to support multi-application scaling without structural modifications. Additional applications can be dropped directly into `apps/`:

- `apps/admin` (Enterprise Admin Backoffice Dashboard)
- `apps/mobile` (React Native / Expo Mobile Application)
- `apps/landing` (High-Performance Marketing Landing Page)
- `apps/docs` (Documentation Portal powered by Nextra or Fumadocs)

Each new app can instantly consume `@repo/ui`, `@repo/types`, `@repo/utils`, `@repo/constants`, and `@repo/database`.

---

## 🛠 Tech Stack Overview

| Tier                                       | Technologies                                                                                                                    |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Monorepo Engine**                        | Turborepo, pnpm Workspaces, TypeScript                                                                                          |
| **Frontend App (`apps/web`)**              | Next.js (App Router), React 19, Redux Toolkit, RTK Query, Tailwind CSS, Framer Motion, Better Auth Client, React Hook Form, Zod |
| **Backend API (`apps/api`)**               | Node.js, Express.js, Better Auth Server, Nodemailer + EJS Email System, Helmet, CORS, Rate Limiter                              |
| **Database Package (`packages/database`)** | PostgreSQL, Prisma ORM 6, Idempotent Admin Seeder                                                                               |
| **Shared Packages**                        | `@repo/ui`, `@repo/types`, `@repo/utils`, `@repo/constants`, `@repo/config`                                                     |
| **Code Quality & DX**                      | ESLint, Prettier, Husky, lint-staged, Zod Validation                                                                            |

---

## 🔑 Environment Variables Setup

Copy `.env.example` templates to `.env` in the root and respective sub-packages:

```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
cp packages/database/.env.example packages/database/.env
```

### Environment Definitions

| Key                   | Description                    | Example / Default                                                         |
| :-------------------- | :----------------------------- | :------------------------------------------------------------------------ |
| `DATABASE_URL`        | PostgreSQL Connection String   | `postgresql://postgres:postgres@localhost:5432/my_database?schema=public` |
| `BETTER_AUTH_SECRET`  | Better Auth Cryptographic Key  | `super-secret-better-auth-key-min-32-chars-long`                          |
| `BETTER_AUTH_URL`     | Express API Base URL for Auth  | `http://localhost:5000`                                                   |
| `NEXT_PUBLIC_API_URL` | Client API Base Endpoint       | `http://localhost:5000`                                                   |
| `CLIENT_URL`          | Frontend URL for CORS & Emails | `http://localhost:3000`                                                   |
| `ADMIN_NAME`          | Initial Admin Account Name     | `System Administrator`                                                    |
| `ADMIN_EMAIL`         | Initial Admin Email Address    | `admin@example.com`                                                       |
| `ADMIN_PASSWORD`      | Initial Admin Password         | `Admin123!`                                                               |
| `SMTP_HOST`           | Nodemailer SMTP Server Host    | `smtp.example.com`                                                        |
| `SMTP_PORT`           | Nodemailer SMTP Port           | `587`                                                                     |

---

## ⚡ Quickstart Guide

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Migration & Seeding

```bash
# Push Prisma Schema to PostgreSQL
pnpm db:push

# Run Idempotent Admin Seeder
pnpm db:seed
```

### 3. Start Development Mode

```bash
pnpm dev
```

- **Web App**: [http://localhost:3000](http://localhost:3000)
- **API Engine**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 💻 Package & Command Reference

### Monorepo Scripts (`package.json`)

```bash
pnpm dev         # Run all apps in development mode concurrently via Turbo
pnpm build       # Build all applications and packages for production
pnpm lint        # Run ESLint across all workspaces
pnpm format      # Format entire codebase using Prettier
pnpm typecheck   # Execute TypeScript type checking across all workspace packages
pnpm db:generate # Generate Prisma Client in @repo/database
pnpm db:push     # Synchronize Prisma Schema with PostgreSQL
pnpm db:migrate  # Run Prisma database migrations
pnpm db:seed     # Run database seeding script
```

---

## 🏗 Backend Architecture (`apps/api`)

The Express backend strictly enforces a **Controller → Service → Repository** pattern:

```text
HTTP Request
  │
  ▼
Middleware (Helmet, CORS, CookieParser, RateLimiter, Zod Validation, Auth & RBAC)
  │
  ▼
Controller (Parses request, calls service, returns standardized JSON)
  │
  ▼
Service (Contains business logic, permissions, transactional flow, emails)
  │
  ▼
Repository (Database interactions via @repo/database Prisma Client)
```

### Standard API Response Format

#### Success

```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": {
    "id": "c7b3d9e2-4f1a-4d2b-8a5c-6e9f0a1b2c3d",
    "name": "Industrial Mixer"
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

#### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "body.price",
      "message": "Price must be greater than 0"
    }
  ]
}
```

---

## ✉ Email System (`apps/api/src/emails`)

Centralized email module powered by Nodemailer and responsive EJS templates:

- **Layout**: `templates/layouts/main.ejs`
- **Templates**:
  - `welcome.ejs` - New user onboarding
  - `verifyEmail.ejs` - Account verification link
  - `forgotPassword.ejs` - Password reset request
  - `resetPassword.ejs` - Reset confirmation
  - `passwordChanged.ejs` - Security notification
  - `loginNotification.ejs` - New sign-in alert with IP address
  - `adminInvitation.ejs` - Admin role invitation
  - `accountApproved.ejs` - Account approval confirmation
  - `genericNotification.ejs` - Dynamic broadcast notification

---

## 🔐 Security & Authentication

- **Better Auth Integration**: Session-based authentication using HTTP-only cookies.
- **RBAC**: Middleware-enforced authorization (`requireAdmin`, `requireUser`, `requireRole`).
- **Data Protection**: Password hashing using `bcryptjs` (salt factor 12).
- **Hardened Defaults**: Helmet security headers, CORS origin restriction, rate limiting, and Zod input validation.

---

## 🚢 Production Deployment Guide

1. **Build Monorepo Output**:
   ```bash
   pnpm build
   ```
2. **Deploy Backend API (`apps/api`)**:
   - Run `pnpm db:migrate` on your production PostgreSQL instance.
   - Start node process: `node apps/api/dist/server.js`.
3. **Deploy Frontend Web (`apps/web`)**:
   - Deploy `apps/web` to Vercel, AWS Amplify, or a standalone Node container.
   - Set environment variables (`NEXT_PUBLIC_API_URL`, etc.).

---

## 📄 License

Internal Enterprise Proprietary Codebase - MACPROTEC Engineering Inc.
