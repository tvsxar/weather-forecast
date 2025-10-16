const express = require('express');
const router = express.Router();
const axios = require('axios')
const apiKey = process.env.OPENWEATHER_KEY;

// Get suggestions
router.get('/', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`
        );
        
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching city suggestions" });
  }
})

module.exports = router;