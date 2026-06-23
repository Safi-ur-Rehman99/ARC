# ARC - Language Exchange Platform

ARC is a modern, real-time communication platform designed specifically for language learners. It connects people from around the world who want to practice and learn different languages together. Through seamless matching, direct messaging, and high-quality video calls, ARC bridges the gap between language theory and real-world conversation practice.

## 🚀 Features

- **Discover Language Partners**: Find and connect with users whose native language matches your target language (and vice versa).
- **Friend System**: Send, accept, and manage friend requests to build your personal language network.
- **Real-Time Text Chat**: Instant, reliable messaging powered by the Stream Chat SDK.
- **Video Calling**: High-quality, low-latency video calls built directly into the app using the Stream Video SDK for immersive language practice.
- **Dynamic Theming**: Beautiful, customizable user interface with multiple light and dark themes (powered by DaisyUI).
- **Secure Authentication**: JWT-based authentication system keeping your personal data safe.

## 💻 Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS & DaisyUI
- Zustand (Global State Management)
- React Query (Data Fetching & Caching)
- Stream Chat React SDK & Stream Video React SDK

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs
- Stream Chat Server SDK

## 🛠️ Local Installation & Setup

Follow these steps to get the project running locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- A [Stream](https://getstream.io/) account for Chat and Video API keys

### 1. Clone the repository
```bash
git clone https://github.com/Safi-ur-Rehman99/ARC.git
cd ARC
```

### 2. Install Dependencies
You can install dependencies for both the frontend and backend simultaneously from the root directory:
```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3. Environment Variables
You will need to create two `.env` files, one for the backend and one for the frontend.

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
Create a `.env` file in the `frontend` directory and add the following variable:
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

### 4. Run the Application
You can start both the backend and frontend development servers.

**Start the Backend:**
```bash
cd backend
npm run dev
```

**Start the Frontend:**
Open a new terminal window:
```bash
cd frontend
npm run dev
```

The frontend will typically be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## 🚢 Deployment
The application is structured to be easily deployed on platforms like Render or Heroku. The root `package.json` includes a master `build` script that installs dependencies and builds the React frontend, allowing the Express backend to serve the compiled static files in production.
