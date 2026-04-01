# Merlin Bookstore

A full-stack e-commerce bookstore built with Next.js (frontend) and Node.js + Express (backend), with MongoDB as the database.

## Project Structure

```
merlin-bookstore/
├── frontend/        # Next.js 14 app
└── backend/         # Node.js + Express API
```

## Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/your-username/merlin-bookstore.git
cd merlin-bookstore
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env       # Fill in your MongoDB URI and secrets
npm install
npm run dev                # Runs on http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env.local  # Set NEXT_PUBLIC_API_URL
npm install
npm run dev                 # Runs on http://localhost:3000
```

### 4. Seed sample books
```bash
cd backend
npm run seed
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/merlin-bookstore
JWT_SECRET=your_jwt_secret_here
SANDBOX_MODE=true
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | Next.js 14, Tailwind CSS     |
| Backend   | Node.js, Express             |
| Database  | MongoDB + Mongoose           |
| Auth      | JWT (httpOnly cookies)       |
| Payments  | Sandbox (Stripe-ready)       |
