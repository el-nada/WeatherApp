# WeatherApp

A simple and responsive weather application that provides current weather conditions and a 5-day forecast for any city. Built using HTML, CSS, and JavaScript, this app fetches real-time weather data from the OpenWeatherMap API.

## Features

Current Weather: Displays the current temperature, weather condition, humidity, and wind speed for the searched city.
5-Day Forecast: Shows the weather forecast for the next 5 days at 12:00 PM.
Dynamic Icons: Weather icons change based on the current weather condition.

## How to Use

- Enter the name of a city in the search bar. 
- Press the search button or hit Enter.

The current weather and 5-day forecast will be displayed. If the city is not found, an error message will appear.

## Technologies Used

- HTML: Structure of the application.
- CSS: Styling and responsive design.
- JavaScript: Fetching data from the OpenWeatherMap API and dynamically updating the DOM.
- OpenWeatherMap API: Provides real-time weather and forecast data.

## Project Structure 
```
weather-app/
├── index.html          # Main HTML file
├── style.css           # Styles for the app
├── script.js           # JavaScript logic for fetching and displaying data
├── assets/             # Folder for static assets
│   ├── weather/        # Weather icons
│   └── message/        # Message images
│   └── bg.jpg          # Background image
└── README.md           # Project documentation
```

## API Reference

This project uses the OpenWeatherMap API to fetch weather and forecast data. The following endpoints are used:

- Current Weather: https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric
- 5-Day Forecast: https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apiKey}&units=metric
