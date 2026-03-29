# SkyCast 🌦️ - Modern Weather Application

SkyCast is a sleek, responsive, and high-performance weather web application built with **React** and **Vanilla CSS**. It provides real-time weather data and 12-hour forecasts with a premium, light-themed user interface.

![SkyCast Preview](https://via.placeholder.com/800x400?text=SkyCast+Weather+App)

## 🌟 Features

- **Real-time Search**: Get accurate weather for any city globally.
- **Current Location**: Detect and display weather for your exact coordinates using the Geolocation API.
- **12-Hour Forecast**: A sophisticated, interpolated hourly forecast that shows you what to expect for the rest of your day.
- **Premium UI**: 
  - Soft gradients (sky blue, lavender)
  - Glassmorphism effects
  - 3D/Glossy SVG icons
  - Smooth Framer Motion animations
- **Persistence**: Remembers your last searched city using LocalStorage.
- **Mobile Responsive**: Perfectly optimized for all screen sizes.

## 🛠️ Built With

- **React 18** (Functional Components & Hooks)
- **Vite** (Next-generation frontend tooling)
- **Vanilla CSS** (Custom CSS variables & modern layouts)
- **Framer Motion** (Subtle micro-interactions & entry animations)
- **Lucide React** (UI Icons)
- **Axios** (API requests)
- **OpenWeatherMap API** (Weather data source)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- An API Key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gvsuraj/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components`: UI modules (`SearchBar`, `WeatherCard`, `Forecast`, `Loader`).
- `src/hooks`: Custom `useWeather` hook for state management and API logic.
- `src/services`: API service layer and icon mapping.
- `public/assets/icons`: High-quality SVG weather icons.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by [Suraj](https://github.com/gvsuraj)
