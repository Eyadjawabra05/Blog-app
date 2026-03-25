# 🚀 Blog API - Node.js & Express

RESTful API لبناء نظام مدونة (Blog System) باستخدام Node.js و Express.

## 🔥 Features
- 🔐 Authentication باستخدام JWT (Register / Login)
- 📝 CRUD للبوستات (Create, Read, Update, Delete)
- 💬 Comments system
- 👤 Users Management
- 
## 🛠️ Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## 📦 Installation

```bash
git clone https://github.com/Eyadjawabra05/Blog-app.git
cd Blog-app
npm install


## Run
npm run dev


## 📌 API Endpoints

### 🔐 Auth
- POST /api/auth/register → Register new user
- POST /api/auth/login → Login user

### 📝 Posts
- GET /api/posts → Get all posts
- POST /api/posts → Create new post
- PUT /api/posts/:id → Update post
- DELETE /api/posts/:id → Delete post

### 💬 Comments
- POST /api/comments → Add comment
- DELETE /api/comments/:id → Delete comment
