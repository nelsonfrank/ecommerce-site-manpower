# E-Commerce Site

This project is a full-stack e-commerce application built as an interview assessment. It features a modern, responsive frontend and a robust, scalable backend API.

## Project Overview

### Functional Requirements
- **User Authentication**: Secure user registration and login using JWT.
- **Product Catalog**: Browse and view available products.
- **Shopping Cart**: Add products to a cart, update quantities, and view cart items.
- **Checkout & Orders**: Place orders from cart items and track order status.

### Non-Functional Requirements
- **Scalability & Performance**: Optimized database queries and state management for quick load times.
- **Security**: Password hashing with bcrypt, stateless authentication with JWT.
- **Maintainability**: Clean architecture, strongly typed codebase, and well-organized directory structure.
- **API Documentation**: Interactive API endpoints documentation via Swagger.

## Technologies Used

### Frontend (`/client`)
- **Framework**: [Next.js (App Router)](https://nextjs.org/) & React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [React Query (@tanstack/react-query)](https://tanstack.com/query/latest) & Axios
- **Language**: TypeScript

### Backend (`/backend`)
- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (containerized via Docker)
- **Authentication**: Passport.js & JWT
- **Documentation**: Swagger UI
- **Language**: TypeScript

---

## Installation & Setup

### Prerequisites
- Node.js (v20+ recommended)
- pnpm (package manager)
- Docker & Docker Compose (for the database)

### Database Configuration
A `docker-compose.yml` file is provided in the `backend` directory to spin up a PostgreSQL instance.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the database:
   ```bash
   docker compose up -d
   ```
   *The database will run on `localhost:5433` by default.*

### Backend Installation

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Run database migrations and seed:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Start the backend server:
   ```bash
   pnpm run start:dev
   ```

### Frontend Installation

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   Copy `.env.local.example` or create a `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   # Or create it manually with: NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
4. Start the development server:
   ```bash
   pnpm run dev
   ```

---

## Environment Variables

### Backend (`backend/.env`)
- `DATABASE_URL`: Connection string for PostgreSQL (e.g., `postgresql://postgres:postgres@localhost:5433/ecommerce_db?schema=public`)
- `JWT_SECRET`: Secret key for signing JWTs
- `JWT_EXPIRES_IN`: Expiration time for JWTs (e.g., `15m`)
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN`: Expiration time for refresh tokens (e.g., `7d`)
- `PORT`: Port the server runs on (default: `8080`)

### Frontend (`client/.env.local`)
- `NEXT_PUBLIC_API_URL`: The base URL for the backend API (default: `http://localhost:8080`)

---

## How to Run the Application

1. Ensure the PostgreSQL database is running via Docker.
2. Open two terminal windows.
3. In the first terminal, run the backend from the `/backend` directory:
   ```bash
   pnpm run start:dev
   ```
4. In the second terminal, run the frontend from the `/client` directory:
   ```bash
   pnpm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the application.

---

## API Information

The backend API is documented using Swagger. Once the backend server is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:8080/api` (or whichever path the Swagger setup uses, usually `/api` or `/docs`)

The API includes endpoints for:
- **Auth**: Login, Registration, Token Refresh
- **Users**: Manage user profile
- **Products**: List and retrieve products
- **Cart**: Add/remove items, retrieve cart state
- **Orders**: Create orders and list user orders
