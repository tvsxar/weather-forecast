const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = process.env.OPENWEATHER_KEY;

// Get weather info
router.get('/', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
})

module.exports = router;