# News & Blogs App

🚀 Project Overview

A complete full-stack application engineered to combine real-time news aggregation with a robust, cloud-persistent user blogging platform. The project successfully migrated from local browser storage to a MERN stack architecture, demonstrating expertise in asynchronous data flow and RESTful API development. The design follows a clean, modern Apple-inspired aesthetic.

## Features

✨ Core Features

Full CRUD Persistence (Blogs): Implemented complete CRUD functionality (Create, Read, Update, Delete) for personal blog posts, with all data securely stored and managed via MongoDB Atlas.

Asynchronous Data Flow: Utilized Axios and async/await patterns to manage all client-server communication, ensuring UI remains responsive during network operations.

Real-time News Bookmarking: Enabled persistent bookmarking of live news articles using dedicated API endpoints and MongoDB storage, replacing unreliable browser storage.

Integrated Widgets: Features dynamic Weather and Calendar modules within the interface, enhancing utility.

Clean & Responsive UI: Adopted a minimalist, card-based design with soft shadows and controlled whitespace for a premium user experience.

## Tech Stack

Full Stack - MERN (MongoDB, Express.js, React, Node.js)

Database - MongoDB Atlas, Mongoose

Fronted - React.js, Vite, Axios

Backend - Express.js, Node.js, COORS

API Integration - Gnews API, OpenWeatherMap API

Style - Modular Css

📁 Project Structure (Post-Migration)

BlogApp/
├── news-blogs-app/ # FRONTEND (React / Vite)
│ ├── src/App.jsx # State & Routing Logic
│ ├── src/Component/... # All UI Components (News, Blogs, Widgets)
│ └── package.json # Dependencies: react, axios, vite
│
├── server/ # BACKEND (Node.js / Express)
│ ├── package.json # Dependencies: express, mongoose, cors
│ └── server.js # Full Server Logic: Database connection,
│ # Schema definitions, and RESTful CRUD routes.
│
└── README.md

# Getting Started (Setting up the Full Stack)

# Prerequisites

- Node.js 18+

- MongoDB Atlas Account (Free Tier)

- GNews API Key

# Installation

# Backend Setup (# in /server folder):

cd server
npm install
node server.js

# Ensure your MongoDB connection string is placed in server.js

node server.js

# Frontend Setup (in /news-blogs-app folder):

cd ../news-blogs-app
npm install
npm run dev
