# Binary Automates Reminder System

A modern full-stack payment reminder SaaS application built for small businesses to manage invoices, track overdue payments, and send automated reminder emails.

## Live Demo

Frontend: [https://binary-automates-reminder-system-cl-wheat.vercel.app](https://binary-automates-reminder-system-cl-wheat.vercel.app)



---

# Features

* Create, update, and manage invoices
* Track paid, pending, and overdue invoices
* Real-time dashboard analytics
* Activity timeline for invoice actions
* Responsive modern UI built with React + Tailwind CSS
* SQLite database integration
* REST API backend using Express.js
* Full-stack deployment on Vercel and Render

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router


## Backend

* Node.js
* Express.js
* SQLite
* Better-SQLite3
* Resend Email API
* Nodemon

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# Project Structure

```bash
payment-reminder-saas/
│
├── client/          # Frontend React application
├── server/          # Backend Express server
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/arpitashish/binary-automates-reminder-system.git
```

```bash
cd binary-automates-reminder-system
```

---

# Backend Setup

## Move to server folder

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
DATABASE_PATH=./src/db/app.sqlite
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Start backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Move to client folder

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Invoice Routes

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| GET    | /api/invoices            | Get all invoices    |
| POST   | /api/invoices            | Create invoice      |
| PUT    | /api/invoices/:id        | Update invoice      |
| DELETE | /api/invoices/:id        | Delete invoice      |
| POST   | /api/invoices/:id/remind | Send reminder email |

## Dashboard Routes

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

## Activity Routes

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/activity |

---

# Email Reminder System

The project integrates Resend API for sending reminder emails.

## Example Reminder Flow

1. Create invoice
2. Invoice becomes overdue
3. Click "Send Reminder"
4. Email sent to client
5. Activity logged in dashboard

---

# Dashboard Analytics

The dashboard includes:

* Total invoices
* Paid invoices
* Pending invoices
* Overdue invoices
* Collection health tracking
* Revenue analytics chart
* Recent activity timeline

---

# Deployment

## Frontend Deployment (Vercel)

```bash
Root Directory: client
Build Command: npm run build
Output Directory: dist
```

Environment Variable:

```env
VITE_API_BASE_URL=https://binary-automates-api.onrender.com/api
```

---

## Backend Deployment (Render)

```bash
Root Directory: server
Build Command: npm install
Start Command: npm start
```

Environment Variables:

```env

PORT=5000
DATABASE_PATH=./src/db/app.sqlite
RESEND_API_KEY=re_NRJfGS97_LhMzQ2QqztZTxsuwpEGXZTqH
EMAIL_FROM=onboarding@resend.dev
CLIENT_URL=https://binary-automates-reminder-system-cl-wheat.vercel.app
NODE_ENV=development


```

---

# Screenshots

## Dashboard

<img width="1919" height="924" alt="image" src="https://github.com/user-attachments/assets/4a1228fb-fb5c-4a47-94b9-11204d60fa46" />


## Invoice Management

<img width="1907" height="674" alt="image" src="https://github.com/user-attachments/assets/2884de44-de30-4758-8211-9ac1ec55625b" />

## Reminder Email System

<img width="1095" height="774" alt="image" src="https://github.com/user-attachments/assets/72c416f6-b55d-4911-b873-da72d831284b" />

## Analytics Section
<img width="1909" height="917" alt="image" src="https://github.com/user-attachments/assets/6f97a7e2-ca66-448a-b8d7-faf091d3e91f" />




---

# Challenges Faced

* SQLite deployment issues
* CORS configuration in production
* Tailwind + Vite compatibility issues
* Vercel deployment configuration
* Email sandbox restrictions

---



# Author

Arpit Ashish Raj

GitHub: [https://github.com/arpitashish](https://github.com/arpitashish)

---


