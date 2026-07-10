# Store Rating App

A full-stack web application where users can submit ratings (1–5) for stores registered on the platform. The app supports a single login system with three roles — System Administrator, Normal User, and Store Owner — each with role-specific dashboards and permissions.

## Tech Stack

**Backend:** Express, TypeScript, PostgreSQL (hosted on Neon), Prisma ORM, Zod (validation), JWT (httpOnly cookie-based auth)

**Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Redux Toolkit, React Router

## Project Structure

```
roxiler/
├── server/     → Express + TypeScript backend
└── client/     → React + TypeScript frontend
```

## Features

### System Administrator
- Dashboard with total users, total stores, and total ratings submitted
- Add new users (any role) and new stores
- View and filter users/stores by Name, Email, Address, and Role
- Sort listings (ascending/descending) on key fields
- View full details of any user, including a Store Owner's rating

### Normal User
- Sign up and log in
- View all registered stores with overall rating and their own submitted rating
- Search stores by Name and Address
- Submit or modify a rating (1–5) for any store
- Update password

### Store Owner
- Log in and view a dashboard showing:
  - Average rating of their store
  - List of users who have rated their store
- Update password

All roles can log out and update their password after logging in.

## Setup Instructions

### Prerequisites
- Node.js
- pnpm
- A PostgreSQL database (this project uses [Neon](https://neon.tech))

### 1. Backend Setup

```bash
cd server
pnpm install
```

Create a `.env` file in `server/` with:

```env
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET=your_random_secret_string
PORT=4444
```

Run migrations and seed the database:

```bash
pnpm prisma migrate dev
pnpm prisma db seed
```

Start the server:

```bash
pnpm dev
```

Backend runs on `http://localhost:7777`.

### 2. Frontend Setup

```bash
cd client
pnpm install
pnpm dev
```

Frontend runs on `http://localhost:5173`.

## Test Credentials

The seed script creates one ready account for each role:

| Role  | Email             | Password     |
|-------|-------------------|--------------|
| Admin | admin@test.com    | Password@123   |
| Owner | owner@test.com    | Password@123   |
| User  | user@test.com     | Password@123   |

## Form Validation Rules

- **Name:** 20–60 characters
- **Address:** max 400 characters
- **Password:** 8–16 characters, at least 1 uppercase letter and 1 special character
- **Email:** standard email format

## Notes

- Passwords are hashed with bcrypt and never returned in API responses.
- A user can only rate a store once — submitting again updates the existing rating (Prisma `upsert` with a compound unique constraint on `userId` + `storeId`).
- Role-based access is enforced on both backend (middleware) and frontend (protected routes).
