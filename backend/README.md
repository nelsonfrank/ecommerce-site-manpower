# E-Commerce Backend API

A production-grade, modular e-commerce RESTful backend API built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **Passport JWT**.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Architecture & Structure](#project-architecture--structure)
- [Environment Configuration](#environment-configuration)
- [Installation & Database Setup](#installation--database-setup)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [Swagger Interactive API Documentation](#swagger-interactive-api-documentation)
- [API Reference](#api-reference)

---

## Project Overview

This backend application powers an end-to-end e-commerce platform with the following core functionalities:
- **Authentication & Users**: Secure registration with bcrypt password hashing (cost factor 10), email uniqueness validation, automatic shopping cart initialization, JWT credential verification, and protected profile retrieval.
- **Product Catalog**: Full CRUD capabilities, case-insensitive fuzzy text search across titles and descriptions, pagination (`page`, `limit`), and strict stock/price validations.
- **Shopping Cart**: Real-time cart management linked directly to the authenticated user's JWT, auto-computed subtotals and totals, and stock availability safeguards.
- **Orders & Checkout**: Atomic checkout wrapped in a PostgreSQL transaction (`prisma.$transaction`) with real-time stock re-validation, immutable price snapshotting (`priceAtPurchase`), automatic inventory decrementing, and cart clearing.
- **Error Handling & Validation**: Global `ValidationPipe` with payload whitelist transformation and unified `HttpExceptionFilter` ensuring consistent error responses.

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js & TypeScript)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) & [Prisma ORM](https://www.prisma.io/)
- **Authentication**: Passport (`passport-jwt`), `@nestjs/jwt`, `bcrypt`
- **Validation**: `class-validator` & `class-transformer`
- **Documentation**: Swagger / OpenAPI (`@nestjs/swagger`)
- **Package Manager**: `pnpm`
- **Containerization**: Docker Compose

---

## Prerequisites

- **Node.js**: `v18.x` or higher (recommended: `v20+` or `v22+`)
- **pnpm**: `v9.x` or `v11.x` (`npm i -g pnpm`)
- **Docker & Docker Compose**: For running the PostgreSQL container (or an existing PostgreSQL instance)

---

## Project Architecture & Structure

```
backend/
├── docker-compose.yml          # PostgreSQL container definition (host port 5433)
├── .env.example                # Environment variable configuration template
├── .env                        # Local environment variables (gitignored)
├── prisma/
│   ├── schema.prisma           # Prisma data models and relations
│   ├── migrations/             # Applied database migrations
│   └── seed.ts                 # Database seeder script
└── src/
    ├── common/
    │   ├── decorators/         # @CurrentUser() parameter decorator
    │   ├── filters/            # Global HttpExceptionFilter
    │   └── guards/             # Reusable JwtAuthGuard
    ├── prisma/
    │   ├── prisma.service.ts   # PrismaClient lifecycle hooks
    │   └── prisma.module.ts    # Global PrismaModule
    ├── auth/                   # Register, login, profile, and JWT strategy
    ├── users/                  # User entities and DTOs
    ├── products/               # Product catalog, search, pagination, and CRUD
    ├── cart/                   # Shopping cart management and calculations
    ├── orders/                 # Checkout transactions and order history
    ├── app.module.ts           # Root module aggregating feature modules
    └── main.ts                 # Application bootstrap entry point
```

---

## Environment Configuration

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

### Environment Variables Reference

| Variable | Description | Example / Default Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection URL | `postgresql://postgres:postgres@localhost:5433/ecommerce_db?schema=public` |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens | `super-secret-jwt-token-key-2026` |
| `JWT_EXPIRES_IN` | Expiration time for generated JWT tokens | `1d` |
| `PORT` | HTTP port the NestJS application listens on | `3000` |

---

## Installation & Database Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Start PostgreSQL via Docker Compose**:
   ```bash
   docker compose up -d
   ```
   *(Note: The PostgreSQL service maps to port `5433` on the host machine to avoid collision with default local PostgreSQL instances on port `5432`)*.

3. **Run Database Migrations**:
   ```bash
   pnpm exec prisma migrate dev --name init
   ```

4. **Generate Prisma Client**:
   ```bash
   pnpm exec prisma generate
   ```

---

## Running the Application

```bash
# Development mode with hot-reloading
pnpm run start:dev

# Production build
pnpm run build

# Start production server
pnpm run start:prod
```

---

## Database Seeding

Populate the database with diverse sample products (electronics, apparel, office items, espresso machine):

```bash
pnpm exec prisma db seed
```

---

## Swagger Interactive API Documentation

Once the server is running, explore and test all endpoints interactively at:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

---

## API Reference

### Authentication (`/auth`)

| Method | Path | Auth Required | Purpose | Request Body / Params | Responses |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `POST` | `/auth/register` | No | Register new user & create cart | `{ fullName, email, password }` | `201 Created`, `409 Conflict` |
| `POST` | `/auth/login` | No | Authenticate user & issue JWT | `{ email, password }` | `200 OK`, `401 Unauthorized` |
| `GET` | `/auth/profile` | Yes (`Bearer`) | Retrieve current user profile | Header: `Authorization: Bearer <token>` | `200 OK`, `401 Unauthorized` |

### Products (`/products`)

| Method | Path | Auth Required | Purpose | Request Body / Params | Responses |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/products` | No | List products with search & pagination | Query: `?search=&page=&limit=` | `200 OK` |
| `GET` | `/products/:id` | No | Get product details by ID | Param: `:id` (UUID) | `200 OK`, `404 Not Found` |
| `POST` | `/products` | Yes (`Bearer`) | Create new product | `{ name, description?, price, stockQuantity, image? }` | `201 Created`, `400 Bad Request` |
| `PATCH` | `/products/:id` | Yes (`Bearer`) | Update product details | Param: `:id`, Body: partial product fields | `200 OK`, `404 Not Found` |
| `DELETE` | `/products/:id` | Yes (`Bearer`) | Delete product | Param: `:id` | `200 OK`, `404 Not Found` |

### Shopping Cart (`/cart`)

*All cart endpoints require `Authorization: Bearer <token>`.*

| Method | Path | Auth Required | Purpose | Request Body / Params | Responses |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/cart` | Yes (`Bearer`) | View cart items with computed total | None | `200 OK` |
| `POST` | `/cart` | Yes (`Bearer`) | Add item to cart or increment quantity | `{ productId, quantity }` | `201 Created`, `400 Bad Request` |
| `PATCH` | `/cart/:id` | Yes (`Bearer`) | Update cart item quantity | Param: `:id` (CartItem ID), Body: `{ quantity }` | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/cart/:id` | Yes (`Bearer`) | Remove item from cart | Param: `:id` (CartItem ID) | `200 OK`, `404 Not Found` |

### Orders & Checkout (`/orders`)

*All order endpoints require `Authorization: Bearer <token>`.*

| Method | Path | Auth Required | Purpose | Request Body / Params | Responses |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `POST` | `/orders` | Yes (`Bearer`) | Checkout current cart atomically into an order | None | `201 Created`, `400 Bad Request` |
| `GET` | `/orders` | Yes (`Bearer`) | List all orders for the current user | None | `200 OK` |
| `GET` | `/orders/:id` | Yes (`Bearer`) | Get specific order detail with purchased items | Param: `:id` (Order ID) | `200 OK`, `403 Forbidden`, `404 Not Found` |
