# 🧭 BharatYatra — Travel Platform (MERN Stack)

A complete India travel platform with user authentication, city/state/city discovery, interactive maps, pre-booking, reviews, and nearby places.

---

## 📁 Project Structure

```
travel-app/
├── backend/
│   ├── server.js               ← Express entry point
│   ├── .env                    ← MongoDB URI & JWT secret
│   ├── config/
│   │   └── seedData.js         ← 30+ seeded places across India
│   ├── models/
│   │   ├── User.js             ← User schema (bcrypt passwords)
│   │   ├── Place.js            ← Place schema (reviews, photos, coords)
│   │   └── Booking.js          ← Booking schema
│   ├── routes/
│   │   ├── authRoutes.js       ← Register / Login / Profile
│   │   ├── placeRoutes.js      ← CRUD + filter + review endpoints
│   │   └── bookingRoutes.js    ← Create / list / cancel bookings
│   └── middleware/
│       └── auth.js             ← JWT protect middleware
│
└── frontend/
    └── src/
        ├── App.js              ← Routes (public + private)
        ├── index.css           ← Global styles (Playfair + Lato)
        ├── context/
        │   └── AuthContext.js  ← Login / Register / Logout state
        ├── data/
        │   └── indiaData.js    ← All 36 states + cities (700+ cities)
        ├── pages/
        │   ├── LoginPage.js    ← Split-screen login with demo creds
        │   ├── RegisterPage.js ← 3-step registration with state/city picker
        │   ├── HomePage.js     ← Hero + nearby places + popular cities
        │   ├── CityPage.js     ← Grid/Map view with category filters
        │   ├── PlaceDetailPage.js ← Photos, reviews, booking, directions
        │   ├── BookingsPage.js ← My bookings management
        │   └── MapPage.js      ← Full interactive map with GPS tracking
        └── components/
            ├── Navbar.js       ← Sticky nav with user info
            └── PlaceCard.js    ← Reusable place card component
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB Compass (or MongoDB running locally)
- npm

---

### Step 1 — MongoDB Compass Setup

1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. The app will **auto-create** a database called `travelplatform`
4. The app will **auto-seed** 30+ places on first start

---

### Step 2 — Backend Setup

```bash
cd travel-app/backend
npm install
```

Edit `.env` if needed:
```
MONGO_URI=mongodb://localhost:27017/travelplatform
JWT_SECRET=travelsecretkey2024supersecure
PORT=5000
```

Start the backend:
```bash
npm run dev      # with nodemon (recommended)
# or
npm start        # without nodemon
```

✅ You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected to MongoDB Compass
✅ Seeded 30 places into MongoDB
```

---

### Step 3 — Frontend Setup

```bash
cd travel-app/frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**  
Backend runs at: **http://localhost:5000**

> The `"proxy": "http://localhost:5000"` in package.json handles API routing automatically.

---

## 🔑 Demo Login

Use these credentials on the login page:

| Field    | Value                   |
|----------|-------------------------|
| Email    | demo@bharatyatra.com    |
| Password | demo1234                |

Or **register** a new account and select your state & city.

---

## ✨ Features

### 👤 Authentication
- Multi-step registration: account info → country/state/city selection → review
- All 36 Indian states with 700+ cities included
- JWT-based authentication stored in localStorage
- Password hashing with bcryptjs

### 🏠 Home Page
- Hero banner with state + city search
- **Nearby places** auto-loaded based on your registered city
- Category filter: Tourist | Hotels | Hostels | Hospitals | Medical | Temples | Parks
- Popular cities grid (Delhi, Mumbai, Hyderabad, Jaipur, Goa, etc.)
- Featured destinations section

### 🏙️ City Page
- Grid view and **Map view** toggle
- Category filter with counts
- Search within city
- Sort by rating or alphabetically
- Interactive map with colored markers per category
- Sidebar list in map view

### 📍 Place Detail Page
- Photo gallery with thumbnails
- Full info: phone, timings, price, address, amenities
- **Pre-booking form** with check-in/out dates, guests, special requests
- **Interactive map** with your location + place marker
- **Google Maps Directions** button (opens with route from your GPS)
- Reviews with star ratings
- Write a review form

### 🗺️ Map Page
- Full-screen interactive map
- **Live GPS tracking** (watch position)
- Colored markers by category
- User location with radius circle
- Popup with photo, details, directions button
- Category filter bar

### 📅 Bookings Page
- View all bookings with status (pending/confirmed/cancelled)
- Cancel pending bookings
- View place details from booking

---

## 🗄️ API Endpoints

### Auth
| Method | Endpoint          | Description     |
|--------|-------------------|-----------------|
| POST   | /api/auth/register | Register user  |
| POST   | /api/auth/login    | Login user     |
| GET    | /api/auth/profile  | Get profile    |

### Places
| Method | Endpoint                   | Description                        |
|--------|----------------------------|------------------------------------|
| GET    | /api/places                | Get all (filter: city, state, category, search, featured) |
| GET    | /api/places/:id            | Get single place                   |
| POST   | /api/places/:id/review     | Add review (auth required)         |

### Bookings
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/bookings         | Create booking (auth)    |
| GET    | /api/bookings/my      | Get my bookings (auth)   |
| PUT    | /api/bookings/:id/cancel | Cancel booking (auth) |

---

## 🏙️ Seeded Cities & Places

The database auto-seeds with places across:
- **Hyderabad** — Charminar, Golconda, Taj Falaknuma, Apollo Hospital, MedPlus
- **Mumbai** — Gateway of India, Taj Mahal Palace, Siddhivinayak, Lilavati Hospital
- **Delhi** — Red Fort, Qutub Minar, The Imperial Hotel, AIIMS
- **Jaipur** — Amber Fort, Hawa Mahal, Rambagh Palace
- **Bengaluru** — Lalbagh Gardens, ITC Windsor, Manipal Hospital
- **Chennai** — Marina Beach, ITC Grand Chola
- **Kolkata** — Victoria Memorial, Oberoi Grand
- **Agra** — Taj Mahal, Oberoi Amarvilas
- **Varanasi** — Dashashwamedh Ghat
- **Goa** — Baga Beach, Taj Exotica Resort

---

## 🎨 Design System

- **Font Pair**: Playfair Display (headings) + Lato (body)
- **Primary**: `#1a3c5e` (deep navy)
- **Accent**: `#c8963c` (warm gold)
- **Background**: `#f8f6f2` (warm off-white)
- Classic & elegant — inspired by premium travel magazines

---

## 📦 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router v6           |
| Maps      | Leaflet.js + React-Leaflet          |
| HTTP      | Axios                               |
| Styling   | Custom CSS (no framework)           |
| Icons     | React Icons (Font Awesome)          |
| Toast     | React Hot Toast                     |
| Backend   | Express.js                          |
| Database  | MongoDB (via Mongoose)              |
| Auth      | JWT + bcryptjs                      |
| Dev Tool  | Nodemon                             |
