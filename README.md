# 📚 Library Management System (Offline-First + Cloud Sync)

A modern **Offline-First Library Management System** built using:

- ⚛ React + TypeScript
- 📦 IndexedDB (Local Storage Database)
- 📲 PWA (Progressive Web App)
- 🎨 Tailwind CSS
- 🔥 Laravel API (Backend)
- 🛢 MySQL (Cloud Database)

This system works completely **offline** and automatically **syncs data to the cloud when internet becomes available**.

---

## 🚀 Project Overview

This project is designed to function as:

- A fully offline-capable web application
- Installable as a PWA (like a desktop app)
- Auto-syncing with cloud backend when online
- Zero technical configuration required by end user

Users can install it once and use it without internet.
When internet is restored, all offline activity is synced securely to the cloud server.

---

## 🏗 Architecture

### 🔹 Frontend (Offline Layer)
- React (TypeScript)
- IndexedDB (Local database)
- Service Worker (PWA caching)
- Background Sync mechanism

### 🔹 Backend (Cloud Layer)
- Laravel API
- Sanctum Authentication
- MySQL Database
- RESTful API endpoints

### 🔹 Data Flow

Offline Mode:
User Action → Stored in IndexedDB → Marked as "pending sync"

Online Mode:
App detects internet → Sync engine pushes pending data → Laravel API → MySQL

---

## 🌟 Core Features

### 🔐 Authentication
- Secure login (Laravel Sanctum)
- Token-based API protection
- Admin-controlled access

### 📊 Dashboard
- Total books
- Issued books
- Overdue books
- Members summary

### 📚 Book Management
- Add / Edit / Delete books
- ISBN, Title, Author, Category, Publication
- Availability tracking
- Quick search

### 👥 Member Management
- Add / Manage members
- Students / Staff / Teachers

### 🔄 Transaction Management
- Issue book
- Return book
- Renew book
- Reservation system
- Automatic overdue detection
- Automated fine calculation

### 📈 Reports & Export
- Inventory report
- Issued books report
- Overdue report
- Daily activity
- Member activity
- Export to Excel

### 💾 Backup & Restore
- Local data backup
- Restore capability

---

## 📲 Progressive Web App (PWA)

This web based application:

- Works without internet
- Uses service worker for caching
- Supports background sync

To install:
1. Open in browser
2. Click "Install App"
3. Use like a desktop application

---

## 🛢 Database Structure

### Cloud Database (MySQL)
- users
- books
- members
- transactions
- fines
- personal_access_tokens

### Local Database (IndexedDB)
- books
- members
- transactions
- sync_queue

---

## ⚙️ Installation Guide

### Backend Setup (Laravel API)

```bash
git clone this_repo_link
cd library-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
