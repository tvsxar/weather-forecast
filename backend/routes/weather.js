const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = process.env.OPENWEATHER_KEY;

// Basic cache
const cache = {};
const cacheTime = 10 * 60 * 1000;

// Get weather info
router.get('/', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    // Check cache
    if (cache[city] && (Date.now() - cache[city].time < cacheTime)) {
        return res.json(cache[city].data);
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );
        const weatherData = response.data;

        // Save cache
        cache[city] = { data: weatherData, time: Date.now() };

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
})

module.exports = router;