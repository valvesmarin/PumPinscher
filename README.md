# PumPinscher 🐶💪

**The workout app that never quits.**

PumPinscher is a modern, motivational fitness tracker designed for people who take their training seriously. Whether you're chasing muscle gain, fat loss, or just want to stay consistent, PumPinscher helps you log workouts, track progress, and stay inspired — all with a fun yet professional Pinscher mascot who represents strength, attitude, and never giving up.

Built as a full-stack project with clean architecture, beautiful UI, and real persistence in MongoDB.

## ✨ What makes it special

- Clean, modern interface with smooth animations and a strong orange/black theme
- Full multilingual support (Portuguese, Spanish, English)
- Smart rest timer with multiple presets
- Quick workout templates + manual exercise entry
- Complete workout history with detailed view
- Dynamic profile with BMI calculation and personalized recommendations
- Motivational quotes that rotate automatically
- Real backend with MongoDB Atlas (no more lost data when refreshing)

## 🚀 Live Demo

- **Frontend**: [https://pump-pinscher-git-main-valvesmarins-projects.vercel.app](https://pump-pinscher-git-main-valvesmarins-projects.vercel.app)
- **Backend API**: [https://pumpinscher-backend.onrender.com](https://pumpinscher-backend.onrender.com)
- **API Documentation (Swagger)**: [https://pumpinscher-backend.onrender.com/api](https://pumpinscher-backend.onrender.com/api)

## 🛠️ Tech Stack

**Frontend**
- React + TypeScript
- Tailwind CSS
- Framer Motion (smooth animations and page transitions)
- Vite

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- CORS and environment variables

**Other**
- Full REST API with proper error handling
- Deployed on Vercel (frontend) and Render (backend)

## 📋 Features

- Secure login / register with email
- Multi-language interface
- Dashboard with live stats and rotating motivational quotes
- Workout builder with quick templates and custom exercises
- Built-in rest timer (30s to 5min)
- Progress history with detailed workout cards
- Profile management (weight, height, goal, gender) + automatic IMC
- Personalized workout recommendations
- Pinscher mascot with cool animated page transitions

## 🖥️ How to run locally

### Backend

```bash
cd server
npm install
cp .env.example .env        # add your MONGO_URI
npm run dev

cd ..                       # back to root
npm install
npm run dev

PumPinscher/
├── src/                  # React + TypeScript frontend
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   └── .env
├── public/
│   ├── pinscher-mascot.png
│   └── pinscher-puxando.png
└── README.md

## 👨‍💻 Author
Vitor Marin
Student developer passionate about clean code, great UX, and building useful tools.
This project was developed as part of my full-stack training, combining modern frontend techniques with a solid backend architecture.
