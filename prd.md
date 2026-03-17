# 📄 Product Requirements Document (PRD)

## 🧩 Product Name  
**SyncSpace**

---

## 🎯 Objective  
Build a real-time collaboration platform (like Google Docs / Notion) where multiple users can **edit documents simultaneously**, with instant updates and high performance.

---

## 👤 Target Users  
- Students (group projects)  
- Developers (notes, planning)  
- Small teams (collaboration)  

---

## 🚀 Core Features

### 1. 🔐 Authentication
- User signup/login (JWT-based)
- Secure password hashing
- Session management

---

### 2. 📄 Document Management
- Create / edit / delete documents
- Document title + rich text content
- Auto-save functionality

---

### 3. ⚡ Real-Time Collaboration
- Multiple users editing the same document
- Live cursor tracking
- Instant content sync

---

### 4. 👥 Presence System
- Show active users in a document
- “User is typing…” indicator

---

### 5. 🕓 Version History
- Save document versions
- Restore previous versions

---

### 6. 📊 Dashboard
- List user documents
- Last edited time
- Search documents

---

## ⚙️ Tech Stack

### 🖥 Frontend
- React (Vite)
- Zustand (state management)
- Tailwind CSS

---

### 🔙 Backend
- Node.js + Express
- REST + WebSocket support

---

### 🗄 Database
- MongoDB (Atlas)

---

### ⚡ Cache & Real-time Engine
- Redis  
Used for:
- Pub/Sub (real-time updates)
- Active users tracking
- Caching documents

---

### 🌐 Reverse Proxy
- NGINX

---

### 🐳 DevOps
- Docker + Docker Compose  
- AWS EC2 deployment  

---

## 🏗 System Architecture (High Level)
```
Client (React)
     ↓
NGINX (reverse proxy)
      ↓
Backend (Node.js)
↓              ↓
MongoDB      Redis
(storage)   (real-time + cache)
```


---

## 🔄 Data Flow (Real-time Editing)

1. User edits document  
2. Frontend sends update via WebSocket  
3. Backend processes change  
4. Redis Pub/Sub broadcasts update  
5. All connected users receive update instantly  

---

## 📡 API Design (Sample)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

---

### Documents
- `GET /api/docs`
- `POST /api/docs`
- `GET /api/docs/:id`
- `PUT /api/docs/:id`
- `DELETE /api/docs/:id`

---

### Collaboration (WebSocket Events)
- `JOIN_DOC`
- `EDIT_DOC`
- `LEAVE_DOC`

---

## 🧠 Redis Usage

- Pub/Sub → real-time updates  
- Caching → frequently accessed docs  
- Presence tracking → active users  
- Rate limiting → prevent spam  

---

## 🔐 Security Requirements

- JWT authentication  
- Input validation  
- Rate limiting (Redis-based)  
- HTTPS (Let's Encrypt)  

---

## 📈 Non-Functional Requirements

- Low latency (<200ms updates)
- Scalable architecture
- Fault-tolerant (container restart)
- High availability (future upgrade)

---

## 📦 Deployment Plan

- Dockerize all services:
  - frontend
  - backend
  - redis
  - nginx

- Use Docker Compose on EC2

---

## 🧪 Testing

- Unit tests (backend)
- Integration tests (API)
- Real-time event testing

---

## 🔮 Future Enhancements

- Rich text editor (like Notion)
- Comments on documents
- File uploads
- Role-based access (viewer/editor)
- Offline support

---

## 🎯 Success Metrics

- Real-time sync latency  
- Active users per document  
- API response time  
- Error rate  