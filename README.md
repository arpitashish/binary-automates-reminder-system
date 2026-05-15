# Mini Payment Reminder SaaS

A polished mini payment reminder system for small businesses. It lets you create invoices, track payment status, send real reminder emails through Resend, and monitor activity from a dashboard that feels closer to a real SaaS product than a demo.

## What is included

- Invoice CRUD
- Auto overdue detection
- Search, filters, and sorting
- Reminder sending with Resend
- Activity log and reminder history
- Dashboard metrics and paid/unpaid analytics
- Responsive SaaS-style UI
- SQLite backend
- Deployment notes for Render and Vercel

## Folder structure

```txt
client/
server/
```

## Tech stack

Frontend: React, Vite, Tailwind CSS, React Router, Axios, React Hot Toast, Lucide React, Recharts  
Backend: Node.js, Express, SQLite, Resend

## Setup

### 1) Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2) Configure environment variables

Copy `.env.example` to `.env` in the project root or inside `server/` depending on your deployment setup. Use real values for:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `CLIENT_URL`

### 3) Run the backend

```bash
cd server
npm run dev
```

### 4) Run the frontend

```bash
cd client
npm run dev
```

The app expects the API at `https://binary-automates-api.onrender.com`.

## API overview

- `GET /api/dashboard`
- `GET /api/invoices`
- `POST /api/invoices`
- `GET /api/invoices/:id`
- `PUT /api/invoices/:id`
- `DELETE /api/invoices/:id`
- `POST /api/invoices/:id/mark-paid`
- `POST /api/invoices/:id/remind`
- `GET /api/activity`

## Database

The SQLite schema lives in `server/src/db/schema.sql`.  
Tables:

- `invoices`
- `activity_logs`

## Deployment

### Backend on Render

1. Create a new Web Service.
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add env vars from `.env.example`
5. Ensure the SQLite file path is writable. For production, use persistent disk or swap to hosted Postgres if required.

### Frontend on Vercel

1. Create a new project from the `client/` folder.
2. Set `VITE_API_BASE_URL` to your Render backend URL.
3. Deploy.

## Tradeoffs

- SQLite keeps the take-home simple and fast to run.
- Reminder sending is synchronous for clarity.
- Live updates are handled through periodic refresh rather than websockets.
- Authentication is intentionally omitted to keep the scope focused on invoice/reminder workflow.

## Future improvements

- Authentication and multi-tenant workspaces
- Websocket live updates
- CSV import/export
- Scheduled reminders
- Role-based permissions
- Better analytics and revenue forecasting

## Interview talking points

- The dashboard aggregates invoice state into business metrics.
- Reminder history creates a trustable audit trail.
- Overdue logic is derived from due dates so the app stays consistent.
- SQLite was chosen to make setup frictionless for a take-home assignment.
- The frontend is organized into reusable components to keep the UI maintainable.

## Screenshots

Add screenshots here after running the app locally and capturing the dashboard, invoices table, invoice modal, and reminder activity timeline.

## Sample data

Run the seed script:

```bash
cd server
npm run seed
```
