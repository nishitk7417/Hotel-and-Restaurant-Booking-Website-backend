# Hotel & Restaurant Booking Website Backend

## Overview
This is the backend service for the Hotel & Restaurant Booking Website. It provides APIs for user authentication, hotel and restaurant management, bookings, and administrative operations. The backend is built using **Node.js** with **Express.js**, and it uses **MongoDB** as the database.

## Features
- **User Authentication & Authorization** (JWT-based authentication, role-based access control)
- **Hotel & Restaurant Management** (CRUD operations for vendors and admins)
- **Booking System** (Room & table reservations, payment handling)
- **Admin Panel** (Manage users, vendors, and bookings) (not completed)
- **RESTful API** architecture

---
## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (Local or cloud-based like MongoDB Atlas)
- [Postman](https://www.postman.com/) (For testing API requests)

### Clone the Repository
```sh
git clone https://github.com/your-username/hotel-booking-backend.git
cd hotel-booking-backend
```

### Install Dependencies
```sh
npm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and configure the following:
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Server
```sh
npm start
```
The server will start at `http://localhost:5000`

---
## API Endpoints

### **Authentication**
```sh
POST   /api/auth/register     # Register a new user
POST   /api/auth/login        # Authenticate user & get token
GET    /api/auth/me           # Get logged-in user details (Requires Token)
```

### **Hotels Management** (Admin/Vendor)
```sh
POST   /api/hotels           # Add a new hotel
GET    /api/hotels           # Get all hotels
GET    /api/hotels/:id       # Get hotel by ID
PUT    /api/hotels/:id       # Update hotel details
DELETE /api/hotels/:id       # Delete a hotel
```

### **Restaurants Management** (Admin/Vendor)
```sh
POST   /api/restaurants       # Add a new restaurant
GET    /api/restaurants       # Get all restaurants
GET    /api/restaurants/:id   # Get restaurant by ID
PUT    /api/restaurants/:id   # Update restaurant details
DELETE /api/restaurants/:id   # Delete a restaurant
```

### **Booking System**
```sh
POST   /api/bookings/hotels       # Book a hotel room
POST   /api/bookings/restaurants  # Book a restaurant table
GET    /api/bookings/user         # Get user's bookings
GET    /api/bookings/admin        # Get all bookings (Admin only)
DELETE /api/bookings/:id          # Cancel a booking
```

### **Admin Operations**
```sh
GET    /api/admin/users       # Get all users
PUT    /api/admin/users/:id   # Update user role
DELETE /api/admin/users/:id   # Remove a user
```
---
## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token)
- **Testing:** Postman

---
## Contributing
Feel free to contribute by creating issues or pull requests.

---
## License
This project is licensed under the MIT License.

---
## Contact
For any queries, reach out at **nishitku123@gmail.com** or create an issue in the repository.

