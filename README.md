# Weather Dashboard

A polished weather dashboard that lets users search by city name or ZIP code and instantly view current conditions, temperature, wind speed, humidity, and an interactive map centered on the selected location.

## Overview

This project was built as a portfolio-ready frontend application focused on usability, clarity, and deployment hygiene. The interface combines live weather data, smart city suggestions, and a dynamic visual experience that changes based on the current weather conditions.

The goal of the project was to create a product that feels practical and presentable for real-world use while also demonstrating strong frontend fundamentals, API integration, and safe deployment practices.

## My Role

I designed and developed the project end to end, including:

- UI structure and visual design
- Weather API integration
- Interactive map implementation
- Responsive layout behavior
- Deployment setup for Vercel
- Secure handling of the API key through serverless infrastructure

## Development Process

The project was developed in a few clear stages:

1. Started with the base layout and defined the overall user flow: search, results, and map visualization.
2. Integrated OpenWeather to retrieve live weather data by city name or ZIP code.
3. Added a Leaflet map to reinforce the location-based experience.
4. Implemented suggestions for popular cities to improve usability and reduce friction during search.
5. Refined the visual design with layered backgrounds, glassmorphism-style cards, and responsive spacing.
6. Moved the API request into a Vercel Serverless Function so the OpenWeather key would not be exposed in the frontend.
7. Prepared the app for deployment and portfolio presentation.

## Key Features

- Search weather by city name or ZIP code
- Real-time weather data from OpenWeather
- Interactive map centered on the selected city
- Auto-suggestions for popular locations
- Dynamic background changes based on weather conditions
- Clear status and error feedback for the user
- Responsive layout for desktop and mobile
- Secure API handling through a serverless function

## Tech Stack

- HTML
- CSS
- JavaScript
- OpenWeather API
- Leaflet.js
- Vercel Serverless Functions
- Assitance Codex

## Architecture

The app follows a simple and secure flow:

- The frontend sends the search term to `/api/weather`
- The serverless function reads `OPENWEATHER_API_KEY` from environment variables
- The function requests data from OpenWeather
- The response is returned to the frontend and rendered in the UI

This approach keeps the API key out of the browser and makes the project safer for production-style deployment.

## What I Focused On

- Building a clean and intuitive user experience
- Keeping the interface lightweight and responsive
- Making the project easy to present in a portfolio
- Protecting sensitive credentials
- Ensuring the codebase is simple to maintain and extend

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd weather_app
```

### 2. Add the environment variable in Vercel

Create an environment variable named:

```bash
OPENWEATHER_API_KEY
```

Use your OpenWeather API key as the value.

### 3. Deploy

This project is designed to run as a static frontend with a serverless backend function in Vercel. No build step is required.

## Local Preview

Because the project uses a serverless function, it should be tested through a local server instead of opening `index.html` directly with `file://`.

You can use any simple local server, for example:

```bash
python -m http.server 3000
```

Then open:

```bash
http://localhost:3000
```

## Notes

- The OpenWeather API key should never be placed directly in the frontend code.
- The serverless function handles the external request securely.
- The project was intentionally kept simple, readable, and portfolio-friendly.

## Future Improvements

- Add weather forecast views for multiple days
- Store favorite cities locally
- Improve accessibility states and keyboard navigation
- Add temperature unit toggles
- Expand the city suggestion system with a richer dataset

## License

This project is part of my personal portfolio and can be used as a reference for learning and presentation purposes.
