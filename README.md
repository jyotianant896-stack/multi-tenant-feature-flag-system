# Multi-Tenant Feature Flag Management System

## Overview

This project is a SaaS-like Multi-Tenant Feature Flag Management System developed using React.js, Node.js, Express.js, and MySQL.

The system allows:

- Super Admin to create organizations
- Organization Admin to manage feature flags
- End Users to check whether a feature is enabled or disabled

This project demonstrates frontend development, backend API integration, authentication, CRUD operations, and MySQL database connectivity.

---

# Tech Stack

## Frontend
- React.js
- Bootstrap
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- JWT Authentication

## Database
- MySQL

---

# Modules Implemented

## 1. Login Module
- User login page
- JWT authentication
- Login validation

---

## 2. Super Admin Dashboard
Features implemented:

- Create organization
- View organization list
- Store organizations in MySQL database

Example organizations:
- Google
- TCS
- Infosys
- Byepo
- Amazon

---

## 3. Feature Flag Dashboard
Features implemented:

- Add feature
- Enable/Disable feature
- View feature statistics
- Active feature count
- Inactive feature count
- Feature list table
- Logout functionality

Example features:
- Dark Mode
- Chat Support
- Payment Gateway

---

## 4. User Feature Check
Features implemented:

- Enter feature name
- Check whether feature is enabled or disabled
- Dynamic result display

Example:
- Payment Gateway → ENABLED

---

# Current Implementation

Currently implemented:

✅ Single login system

✅ Super Admin Dashboard

✅ Organization creation

✅ Feature management

✅ Feature statistics dashboard

✅ User feature checking

✅ REST APIs

✅ MySQL integration

✅ GitHub repository upload

---

# Project Structure

## Frontend

frontend/
- src/pages
- src/services
- App.js
- index.js

## Backend

backend/
- config
- controllers
- middleware
- routes
- server.js

---

# Frontend Setup

## Step 1: Move to frontend folder

```bash
cd frontend
```

## Step 2: Install dependencies

```bash
npm install
```

## Step 3: Start frontend server

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3001
```

---

# Backend Setup

## Step 1: Move to backend folder

```bash
cd backend
```

## Step 2: Install dependencies

```bash
npm install
```

## Step 3: Start backend server

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:3000
```

---

# MySQL Database Setup

## Step 1: Open MySQL

```bash
mysql -u root -p
```

## Step 2: Create database

```sql
CREATE DATABASE feature_flag_db;
```

## Step 3: Use database

```sql
USE feature_flag_db;
```

---

# Database Tables

Tables used:

- organizations
- features
- users
- roles

---

# API Endpoints

## Authentication
- POST /api/auth/login

## Organizations
- GET /api/organizations
- POST /api/organizations

## Features
- GET /api/features
- POST /api/features

---

# Environment Variables

Create `.env` file inside backend folder:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=feature_flag_db

JWT_SECRET=mysecretkey
```

---

# Output Screens

Implemented screens:

- Login Page
- Feature Flag Dashboard
- Super Admin Dashboard
- User Feature Check Page

---

# Author

Jyothi Anant Naik
