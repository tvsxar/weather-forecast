const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherRouter = require('./routes/weather');
const geoRouter = require('./routes/geo');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRouter);
app.use('/api/geo', geoRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Weather Forecast");
});

// Listening to the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})