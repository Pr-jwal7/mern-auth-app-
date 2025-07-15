# MERN Auth App

A complete MERN (MongoDB, Express.js, React.js, Node.js) authentication app with user registration, login/logout, and protected routes. Built using Vite, Context API, and Zod for form validation. Uses JWT for authentication, bcrypt for password hashing, and MongoDB Atlas for cloud storage.

## 🔧 Tech Stack

- **Frontend:** React.js (Vite), Context API, Zod, Tailwind CSS (if used)
- **Backend:** Node.js, Express.js, JWT, Bcrypt.js, dotenv
- **Database:** MongoDB Atlas
- **Tools:** Postman, VS Code

## ✨ Features

- User registration and login
- Password hashing with bcrypt
- JSON Web Token (JWT) authentication
- Protected routes (frontend + backend)
- Auto-filled contact forms using stored data
- Form validation with Zod
- Environment variable management with dotenv
- MongoDB Atlas integration

## 📁 Folder Structure

MERNSTACK/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── assets/ # Images or static assets
│ ├── components/ # Reusable components
│ ├── pages/ # Route pages (Login, Register, Home, etc.)
│ ├── store/ # Context API logic
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Express backend
│ ├── controllers/ # Route handlers
│ ├── middlewares/ # JWT auth, error handlers
│ ├── models/ # Mongoose schemas
│ ├── router/ # Express routers
│ ├── utils/ # JWT/token helpers
│ ├── validators/ # Zod validators
│ ├── server.js # Entry point
│ └── .env # Environment variables
│
├── README.md
└── .gitignore

