// /config/apiConfig.js

const dotenv = require('dotenv');

// .env dosyasındaki çevresel değişkenleri yükler
dotenv.config();

module.exports = {
    apiUrl: process.env.API_URL || '', // API URL'si .env dosyasından okunur
    apiKey: process.env.API_KEY || ''  // API anahtarı .env dosyasından okunur
};
