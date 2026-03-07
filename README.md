# Vehicle Service Portal — Frontend

A modern **React + Vite** frontend for the Vehicle Service Management System.

This application allows customers to book vehicle services, track bookings, manage vehicles, and receive notifications. Admins and service advisors can manage services and monitor operations.

## Live Application

Frontend: https://vehicle-service-frontend.vercel.app
Backend API: https://vehicle-service-backend-production.up.railway.app

---

## Tech Stack

* React
* Vite
* Axios
* React Router
* Bootstrap
* JWT Authentication

---

## Features

### Customer

* Register and login
* Add and manage vehicles
* Book service appointments
* View booking history
* Receive notifications

### Admin

* Manage service master
* Add / update / delete services
* Monitor bookings

### Service Advisor

* View assigned bookings
* Update service status

---

## Project Structure

```
src
 ├── components
 ├── pages
 ├── services
 │     ├── api.js
 │     ├── authService.js
 │     ├── serviceMasterService.js
 ├── App.jsx
 └── main.jsx
```

---

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=https://vehicle-service-backend-production.up.railway.app
```

---

## Installation

Clone the repository:

```
git clone https://github.com/Siddhiamup/vehicle-service-frontend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

---

## Deployment

Frontend is deployed using **Vercel**.

---

## Author

Siddhi Amup
