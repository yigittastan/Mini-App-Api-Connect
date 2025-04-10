// /app.js

const express = require('express');
const bodyParser = require('body-parser');
const contentRoutes = require('./routes/contentRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());

// API route'larını dahil et
app.use('/api', contentRoutes);

// Ana sayfa
app.get('/', (req, res) => {
    res.send('Ana Sayfa');
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
