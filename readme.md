# 🧊 Cube Collab - Real-Time Document Collaboration


![React](https://img.shields.io/badge/React-19.2.4-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Redis](https://img.shields.io/badge/Real--time-Redis-red)

An intelligent unified real-time collaboration ecosystem that transforms traditional document editing into a modern, highly performant digital platform. Edit documents simultaneously with your team, leveraging WebSockets and Redis for instant updates, live cursors, and active presence tracking.

## ✨ Features

- ⚡ **Real-Time Collaboration**: Multiple users editing the same document simultaneously
- 🎯 **Live Presence**: Instantly updates with live cursors and "user is typing..." indicators
- 📝 **Document Management**: Create, edit, search, and delete documents with rich auto-save
- 🔐 **Secure Authentication**: JWT-based login, secure password hashing, and session management
- 📅 **Version History**: Save and track different iterations of your documents
- 📊 **Dashboard Management**: List user documents, track last edited time
- 💬 **Instant Content Sync**: Millisecond latency updates backed by Redis Pub/Sub
- 🐳 **Dockerized Deployment**: Effortless dev & production environments with Docker Compose

## 🛠️ Technology Stack

### Frontend
- React.js 19.2.4
- React Router DOM 7.13.1
- Tailwind CSS 4.2.2
- Zustand 5.0.12 (state management)
- Vite 8.0.0
- Axios 1.13.6

### Backend
- Node.js + Express.js 5.2.1
- MongoDB + Mongoose 9.3.0
- Redis (Pub/Sub & caching)
- JWT (Authentication)
- Cloudinary & Multer (file upload & assets)
- Nodemailer 8.0.2

## 📋 Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (free tier or local)
- Redis server (or Docker container)
- Docker & Docker Compose (optional, for quick start)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cube-collab.git
cd cube-collab
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file with your credentials:**

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cubecollab?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
REDIS_URL=redis://localhost:6379
# Add Cloudinary & Nodemailer configs as required
```

**Get your API credentials:**
- MongoDB: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Cloudinary: [Cloudinary Dashboard](https://cloudinary.com/console)

```bash
# Start backend server
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Docker Quickstart (Recommended)
```bash
# Ensure Docker Engine is running
docker-compose up --build
```
This single command spins up the Frontend, Backend, Database, and Redis engines!

## 📁 Project Structure

```
Cube Collab/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page layout components (Login_Page.jsx, etc.)
│   │   ├── Stores/        # Zustand state stores (Auth_store.js, etc.)
│   │   ├── assets/        # Static UI assets
│   │   ├── App.jsx        # Routing configuration
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind & global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Node.js backend
│   ├── config/            # External service configurations
│   ├── controllers/       # Route logic & abstractions
│   ├── middleware/        # API route protection headers
│   ├── models/            # Mongoose Schemas definitions
│   ├── routes/            # Express router setups
│   ├── utils/             # Cross-cutting helper functions
│   ├── server.js          # Core Express server & WS mount
│   ├── package.json
│   └── .env.example
├── docker-compose.yaml    # Docker orchestrator
└── prd.md                 # Product Requirements Document
```

## 🔌 API Endpoints

### POST `/api/auth/login`
Authenticate an existing user to receive session tokens

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUz...",
  "user": {
    "id": "...",
    "name": "Jane Doe",
    "email": "user@example.com"
  }
}
```

### GET `/api/docs`
Fetch all documents accessible to the authenticated user

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Hackathon Brainstorm",
    "content": "...",
    "collaborators": ["user_1", "user_2"],
    "lastEditedAt": "2026-03-20T10:30:00.000Z"
  }
]
```

### WebSockets Events (Real-Time Subsystem)
- `JOIN_DOC`: Signals the server to attach user to a specific document's Redis broadcast channel
- `EDIT_DOC`: Carries the rich-text deltas emitted whenever changes are typed into a document
- `LEAVE_DOC`: Signals document exit, cleaning up typing indicators and presence lists

## 🎨 Features Walkthrough

### 1. Collaborative Editing Flow
1. User selects a document from the Dashboard module
2. Client emits a `JOIN_DOC` event over WebSocket
3. User begins typing their notes directly on the document
4. Client continuously emits small `EDIT_DOC` changes
5. Server routes these payload deltas to Redis Pub/Sub, efficiently broadcasting the alterations back to all connected subscribers
6. Other connected clients process the deltas in real-time

### 2. Live Presence System
- **Online Status**: The interface reflects a live bubble for every user actively engaged with the document.
- **Typing Indicator**: Rapid bursts update a temporary cache status denoting "User is typing..." for immediate UI feedback.

## 🧪 Testing the App

### Test Real-Time Collaboration
1. Ensure the Node.js backend, React frontend, and Redis processes are all actively running
2. Navigate to `http://localhost:5173` on Desktop Window 1
3. Navigate to the same URL using a secondary browser or Incognito logic (Desktop Window 2)
4. Select the same document on both endpoints
5. Enter text on Window 1, watch it seamlessly populate on Window 2 without delay

## 🚀 Deployment

### Frontend (Vercel / Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder directly to Vercel via CLI
```

### Backend (AWS EC2 / Render)
```bash
# Recommended deployment is via Docker compose to a reserved VM (e.g., AWS EC2)
git clone https://github.com/yourusername/cube-collab.git
docker-compose up -d
```

## 📊 Database Schema (Sample)

```javascript
{
  title: String (required, default "Untitled Document"),
  content: String,
  owner: ObjectId (ref User),
  collaborators: [ObjectId] (ref User),
  lastEditedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Notes

- ✅ Never commit `.env` containing sensitive database URIs or JWT secrets
- ✅ Rotate JWT Secret securely in production environments
- ✅ Sanitize all incoming WebSocket and HTTP data forms against injection
- ✅ File uploads (Cloudinary/Multer) strictly bounded by extension type and max file limit 
- ✅ Row Level Security configured (Docs viewable solely by active collaborators)

## 🐛 Troubleshooting

### Redis Connection Error
- For local dev, ensure you installed `redis-server` running on port 6379, or that `REDIS_URL` precisely matches Docker engine networking IPs.

### MongoDB Connection Error
- Confirm whether your IP is whitelisted under MongoDB Atlas > Network Access configuration.

### Live Sync Dropping / Lagging
- Use browser DevTools > Network > WS to assert websocket upgrade 101 success
- Verify NGINX or external reverse proxies do not enforce severe inactivity timeout configurations on 101 protocol switching requests.

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/CoolNewEditor`)
3. Commit changes (`git commit -m 'Add CoolNewEditor feature'`)
4. Push to branch (`git push origin feature/CoolNewEditor`)
5. Open Pull Request

## 📝 License

ISC License - see LICENSE file for details

## 👥 Authors

- Arshadvkb - Architecture & Implementation

## 🙏 Acknowledgments

- React.js & Vite ecosystem for world-class rendering loops
- MongoDB & Redis for data integrity alongside sub-millisecond Pub/Sub speeds
- Node.js & Express framework

## 📧 Contact

For questions or support, please open an issue or contact:
- GitHub: [@Arshadvkb](https://github.com/Arshadvkb)

---

**Made with ❤️ for Seamless Collaboration**
