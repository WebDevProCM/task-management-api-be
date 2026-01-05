# Task Management API (Backend)

Repo_url - `https://github.com/WebDevProCM/task-management-api-be`

Backend REST API for the Task Management application built with **Node.js, Express, TypeScript, MongoDB**, and **JWT authentication**.  
This backend is designed to work with a separate Next.js frontend.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Rate Limiting

---

## Project Configuration

All environment-specific and sensitive configuration is isolated inside the `config/` folder.

### `config/` folder contains:

- `db.ts` – MongoDB connection setup using Mongoose
- `.env` – Environment variable loading and validation

---

## Environment Variables

Create the following file locally:

### `config/.env`

```env
PORT=5001
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d
FRONT_URL="http://localhost:3000"
MONGO_URI='mongodb://127.0.0.1:27017/task_management_api'
```

## Database Setup
- MongoDB is used as the database
- Ensure MongoDB is running locally or provide a MongoDB Atlas connection string
- Update MONGO_URI in config/.env accordingly

### `config/db.ts`

```env
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed");
  }
};

module.exports = connectDB;
```

## Installation & Running Locally
```
npm install
npm run dev
```



---



# Task Management App (Frontend)

Repo_url - `https://github.com/WebDevProCM/task-management-api-fe`

Frontend application for the Task Management system built with **Next.js (App Router)**.  
It communicates with a separate Express-based backend API.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

---

## Environment Configuration

Frontend configuration is handled using environment variables.

### Create `.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## Installation & Running Locally
```
npm install
npm run dev
```


