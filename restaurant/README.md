# 🍽️ Osteria Aurea — MERN Restaurant Website

A full-stack restaurant website with table booking, menu management, and admin dashboard.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT + bcryptjs

---

## 📁 Folder Structure

```
restaurant/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── MenuItem.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── menuRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   └── MenuCard.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Menu.js
    │   │   ├── Booking.js
    │   │   ├── Contact.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── MyBookings.js
    │   │   └── Admin.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=your_secret_key_here
```

Start server:
```bash
npm run dev   # development (nodemon)
npm start     # production
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on **http://localhost:3000** (proxies API to port 5000)

---

## 🌱 Seed Menu Data

After starting the backend, seed sample menu items:

```bash
curl -X POST http://localhost:5000/api/menu/seed
```

Or click the **"Seed Menu Data"** button in the Admin dashboard.

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user (protected) |

### Menu
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/menu | Get all items (filter: `?category=mains&featured=true`) |
| POST | /api/menu/seed | Seed sample data |
| POST | /api/menu | Add item (admin) |
| DELETE | /api/menu/:id | Delete item (admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bookings | Create booking (public) |
| GET | /api/bookings/my | User's bookings (protected) |
| GET | /api/bookings | All bookings (admin) |
| PATCH | /api/bookings/:id | Update status (admin) |
| DELETE | /api/bookings/:id | Cancel booking (protected) |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Send message |
| GET | /api/contact | All messages (admin) |

---

## 👤 Creating an Admin User

Register normally, then in MongoDB:
```js
db.users.updateOne({ email: "admin@email.com" }, { $set: { role: "admin" } })
```

---

## ✨ Features

- 🏠 **Home** — Hero, featured dishes, opening hours
- 🍝 **Menu** — Filterable by category, veg/non-veg indicators
- 📅 **Table Booking** — Form with date/time/guests, confirmation card
- 👤 **Auth** — Register/Login with JWT
- 📋 **My Bookings** — View and cancel reservations
- 🛠️ **Admin** — Manage all bookings, update statuses, seed menu
- 📬 **Contact** — Message form with backend storage
