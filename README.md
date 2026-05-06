---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local) or MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/restaurant-mern.git
cd restaurant-mern
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Seed Menu Data
```bash
# Linux/Mac
curl -X POST http://localhost:5000/api/menu/seed

# Windows PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/menu/seed" -Method POST
```

### 4. Setup Frontend
```bash
cd frontend
npm install
npm start
```

Visit **http://localhost:3000** 🎉

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |

### Menu
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/menu | Get all menu items |
| POST | /api/menu/seed | Seed sample menu data |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bookings | Create a booking |
| GET | /api/bookings/my | Get user's bookings |
| GET | /api/bookings | Get all bookings (admin) |
| PATCH | /api/bookings/:id | Update booking status (admin) |
| DELETE | /api/bookings/:id | Cancel booking |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Send a message |

---

## 👤 Creating an Admin Account

1. Register a normal account at `/register`
2. Open MongoDB Compass
3. Go to `restaurant_db` → `users`
4. Find your user and edit `role` from `"user"` to `"admin"`
5. Log out and log back in

---

## 📸 Pages

- `/` — Home
- `/menu` — Menu
- `/booking` — Reserve a Table
- `/my-bookings` — My Reservations
- `/admin` — Admin Dashboard
- `/login` — Sign In
- `/register` — Create Account
- `/contact` — Contact Us

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NODE_ENV` | Environment (development/production) |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Google Fonts](https://fonts.google.com/)
