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
        <div className="p-4 max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
                <input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Inserisci una città"
                    className="flex-1 p-2 border rounded-lg"
                    onKeyPress={e => e.key === 'Enter' && getWeather()}
                />
                <button 
                    onClick={getWeather}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Cerca
                </button>
            </div>
            
            {weather && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{weather.name}</h2> {/* Corretto AppMeteo */}
                    <p className="text-lg">🌡 Temperatura: {weather.main.temp}°C</p>
                    <p className="text-lg">🌤 Condizione: {weather.weather[0].description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <p>💧 Umidità: {weather.main.humidity}%</p>
                        <p>💨 Vento: {weather.wind.speed} m/s</p>
                        <p>⬆ Max: {weather.main.temp_max}°C</p>
                        <p>⬇ Min: {weather.main.temp_min}°C</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
