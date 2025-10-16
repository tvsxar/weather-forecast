# Weather Forecast

A weather application built with **React** and **Express.js** that provides real-time weather information, city search suggestions, and server-side caching for faster responses.

📋 **Table of Contents**
- [Description](#description)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies & Stack Explanation](#technologies--stack-explanation)
- [Architecture & Flow](#architecture--flow)
- [Installation & Run](#installation--run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Author](#author)

---

## Description
This Weather App allows users to:
- Search for a city and get current weather information
- See weather details including temperature, feels like, humidity, wind, visibility, and weather description
- Get city suggestions while typing
- Cache recent queries on the server for faster responses

The backend handles API requests to OpenWeatherMap and caches results for 10 minutes to reduce unnecessary API calls. The frontend is built in React with context-based state management.

---

## Live Demo
Try it online via your hosted environment or locally.

---

## Features
- Current weather information for any city
- City suggestions while typing (autocomplete)
- Server-side caching of recent weather data (10 min)
- Responsive UI
- Context-based state management
- Loading indicators and error handling

---

## Technologies & Stack Explanation
- **React (Vite)** — frontend UI framework
- **Express.js / Node.js** — backend server
- **axios / fetch** — HTTP requests from frontend to backend
- **OpenWeatherMap API** — source of weather data
- **Context API** — state management
- **SCSS** — styling
- **Server-side cache** — improves performance and reduces API calls

---

## Architecture & Flow
1. User types a city name in the input field.
2. Frontend sends a request to the backend API for weather data or suggestions.
3. Backend checks the cache for recent data.
    - If found and valid (less than 10 minutes old), it returns cached data.
    - Otherwise, it fetches new data from OpenWeatherMap API, stores it in the cache, and returns it.
4. Frontend receives the data and updates the UI.

---

## Installation & Run

### Backend
```bash
cd backend
npm install
npm i express axios dotenv cors nodemon
```
Create a `.env` file inside `backend/` with the following:

```
PORT=4000
OPENWEATHER_KEY=your_openweathermap_api_key
```

Start the server:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install -D sass
```

Create a `.env` file inside `frontend/` with the following:
```
VITE_API_URL=http://localhost:4000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`.

---

## Project Structure
```
weather-app/
├─ backend/
│  ├─ routes/
│  │  ├─ weather.js   # API route
│  │  └─ geo.js 
│  ├─ package.json
│  └─ index.js       # Express server setup
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ components/
│  │  │  ├─ Weather.jsx
│  │  │  └─ StatItem.jsx
│  │  ├─ context/
│  │  │  └─ WeatherContext.jsx
│  │  └─ assets/
│  │     └─ images (sunny, cloudy, rain, snow, drizzle, mist)
│  └─ package.json
└─ README.md
```

---

## API Endpoints

| Method | Endpoint            | Description                         |
|--------|-------------------|-------------------------------------|
| GET    | `/api/weather`     | Get current weather by city         |
| GET    | `/api/geo`         | Get city suggestions for autocomplete |

---

## Author

**Taras Poiatsyka**\
[GitHub](https://github.com/tvsxar)

