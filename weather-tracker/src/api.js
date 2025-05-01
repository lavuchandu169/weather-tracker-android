// src/api.js
const API_KEY = "7ca078f55275b7822e68bdc3fcc644ab"; // Replace this with your real API key

export async function getWeather(lat, lon) {
  const useFahrenheit = localStorage.getItem('useFahrenheit') === 'true';
  const units = useFahrenheit ? 'imperial' : 'metric';

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
