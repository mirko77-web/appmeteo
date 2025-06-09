import React, { useState } from "react";
import axios from "axios";


const API_KEY = "d628330637b09a39106336bd8d166e20";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/weather`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: "metric",
                    lang: "it"
                }
            });
            setWeather(res.data);
        } catch (error) {
            console.error("Errore nella richiesta:", error);
            alert("Città non trovata!");
        }
    };

    return (
      
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100">
  <div className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/40">
    <div className="flex gap-2 mb-6">
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Inserisci una città"
        className="flex-1 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
        onKeyDown={e => e.key === 'Enter' && getWeather()}
      />
      <button
        onClick={getWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Cerca
      </button>
    </div>
    {weather && (
      <div className="text-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="w-24 h-24 mx-auto mb-2"
        />
        <h2 className="text-3xl font-extrabold mb-1">{weather.name}</h2>
        <p className="text-4xl font-bold mb-2">{weather.main.temp}°C</p>
        <p className="text-lg capitalize mb-4">{weather.weather[0].description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>💧 Umidità: {weather.main.humidity}%</p>
          <p>💨 Vento: {weather.wind.speed} m/s</p>
          <p>⬆ Max: {weather.main.temp_max}°C</p>
          <p>⬇ Min: {weather.main.temp_min}°C</p>
        </div>
      </div>
    )}
  </div>
</div>

       
    );
}

export default Weather;
