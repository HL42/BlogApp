<div align="center">

# 📰 News & Blogs App

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**A modern full-stack application combining real-time news aggregation with a cloud-persistent blogging platform**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure)

</div>

---

## 🚀 Project Overview

A complete full-stack application engineered to combine **real-time news aggregation** with a robust, **cloud-persistent user blogging platform**. The project successfully migrated from local browser storage to a MERN stack architecture, demonstrating expertise in asynchronous data flow and RESTful API development.

LIVELINK: https://blog-app-92jy.vercel.app/

> 🎨 The design follows a clean, modern **Apple-inspired aesthetic**.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **Full CRUD Persistence** | Complete CRUD functionality for personal blog posts, with all data securely stored and managed via MongoDB Atlas |
| ⚡ **Asynchronous Data Flow** | Utilizes Axios and async/await patterns for responsive UI during network operations |
| 📌 **Real-time News Bookmarking** | Persistent bookmarking of live news articles using dedicated API endpoints and MongoDB storage |
| 🌤️ **Integrated Widgets** | Dynamic Weather and Calendar modules within the interface |
| 🎯 **Clean & Responsive UI** | Minimalist, card-based design with soft shadows and controlled whitespace |

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=mongodb" width="48" height="48" alt="MongoDB" />
<br>MongoDB
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
<br>Express
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
<br>Node.js
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
<br>Vite
</td>
</tr>
</table>

| Category | Technologies |
|----------|-------------|
| **Full Stack** | MERN (MongoDB, Express.js, React, Node.js) |
| **Database** | MongoDB Atlas, Mongoose |
| **Frontend** | React.js, Vite, Axios |
| **Backend** | Express.js, Node.js, CORS |
| **API Integration** | GNews API, OpenWeatherMap API |
| **Styling** | Modular CSS |

---

## 📁 Project Structure

```
BlogApp/
├── 📂 news-blogs-app/          # FRONTEND (React / Vite)
│   ├── 📄 src/App.jsx          # State & Routing Logic
│   ├── 📂 src/Component/...    # All UI Components (News, Blogs, Widgets)
│   └── 📄 package.json         # Dependencies: react, axios, vite
│
├── 📂 server/                  # BACKEND (Node.js / Express)
│   ├── 📄 package.json         # Dependencies: express, mongoose, cors
│   └── 📄 server.js            # Full Server Logic: Database connection,
│                               # Schema definitions, and RESTful CRUD routes
│
└── 📄 README.md
```

---

## 🏁 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** 18+ ([Download](https://nodejs.org/))
- ✅ **MongoDB Atlas Account** (Free Tier) ([Sign Up](https://www.mongodb.com/atlas))
- ✅ **GNews API Key** ([Get API Key](https://gnews.io/))

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/BlogApp.git
cd BlogApp
```

#### 2️⃣ Backend Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Configure your MongoDB connection string in server.js
# Then start the server
node server.js
```

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend folder
cd ../news-blogs-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using the MERN Stack

</div>
