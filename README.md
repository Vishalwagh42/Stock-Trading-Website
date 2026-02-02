# Zerodha-like Trading Dashboard ⚡

A lightweight full-stack trading dashboard built with **Node.js / Express / MongoDB** and **React**. This repo contains a backend API and two React apps: a `dashboard` (main app) and a `frontend` (marketing/landing pages).

---

## 🚀 Features

- User authentication (signup/login) with JWT
- Orders, Holdings, Positions APIs
- React dashboard UI with Material UI and charts
- Dev script to run backend + dashboard + frontend concurrently
- Backend serves `dashboard` build in production

---

## 📁 Repo Structure

```
/ (root)
├─ backend/        # Express + Mongoose API
├─ dashboard/      # React dashboard (Material UI + charts)
├─ frontend/       # React marketing / landing pages
├─ package.json    # monorepo scripts (dev, start, build)
```

---

## 🧰 Tech Stack

- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Frontend: React, Material-UI, react-chartjs-2
- Database: MongoDB (local or Atlas)

---

## ⚙️ Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB (local or a MongoDB Atlas connection string)

---

## 🛠 Setup & Run (Development)

1. Clone the repo

```bash
git clone <repo-url>
cd zerodha
```

2. Install dependencies

```bash
npm install --prefix backend
npm install --prefix dashboard
npm install --prefix frontend
```

3. Create `backend/.env` (see `.env.example`)

```env
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=3002
```

4. Start everything in dev

```bash
npm run dev
```

- Backend default port: `3002`
- `dashboard` dev uses `proxy` to `http://localhost:3002`

---

## 📦 Build & Production

1. Build the dashboard

```bash
npm run build --prefix dashboard
```

2. Start backend in production mode (backend will serve `dashboard/build` when NODE_ENV=production)

```bash
# Windows
set NODE_ENV=production && npm start

# cross-platform
npx cross-env NODE_ENV=production npm start
```

---

## 🔌 API (Examples)

- POST `/api/auth/signup` — { name, email, password }
- POST `/api/auth/login` — { email, password } → returns `{ token, user }`
- GET `/api/profile` — protected route (Authorization: `Bearer <token>`)
- GET `/allHoldings`, `/allPositions`, `/allOrders`
- POST `/newOrder` — { name, qty, price, mode: "BUY"|"SELL" }

---

## 🔒 Security & Notes

- Keep `.env` out of version control (add to `.gitignore`).
- Required env vars: `MONGO_URL`, `JWT_SECRET`.

Suggested `.gitignore` entries:

```
node_modules/
.env
backend/node_modules/
dashboard/node_modules/
frontend/node_modules/
dashboard/build/
.DS_Store
```

---

## 🧩 Contributing

1. Fork the repo
2. Create branch: `git checkout -b feat/your-feature`
3. Commit, push, open PR

---

## 📄 License

MIT — feel free to use and modify.

---

If you'd like, I can also add a `.env.example` and a `.gitignore` file for you. Which file should I add next? 🔧