Quick run instructions

✅ Development (run both backend and dashboard concurrently):
  1. From repository root:
     npm install
  2. Then run:
     npm run dev
  - This runs the backend in dev mode (nodemon) and CRA dev server for the dashboard (port 3000). The dashboard dev server proxies API requests to the backend via the `proxy` set in `dashboard/package.json`.

✅ Production (serve built dashboard from backend):
  1. Build the dashboard:
     npm run build
  2. Set environment variables and start backend (PowerShell example):
     $env:MONGO_URL = "<your-mongo-uri>"
     $env:PORT = 3002
     $env:NODE_ENV = "production"
     npm start
  - The backend will serve the dashboard build from `dashboard/build` and expose API routes.

Notes:
- Dashboard API calls are now relative (e.g., `/allHoldings`) so they work both with the dev proxy and when served from the backend in production.
- If `nodemon` is not installed for backend development, install it: cd backend && npm install
