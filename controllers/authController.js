const axios = require('axios');
const API_URL = process.env.API_URL;

// Kullanıcı kaydı
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await axios.post(`${API_URL}/register`, { username, password });

        // API'den gelen cevabı kontrol et
        if (response.status === 201) {
            res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
        } else {
            res.status(400).json({ message: 'Kullanıcı kaydı sırasında bir hata oluştu' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı kaydı sırasında bir hata oluştu', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await axios.post(`${API_URL}/login`, { username, password });

        // API'den gelen cevabı kontrol et
        if (response.status === 200) {
            res.status(200).json({ message: 'Giriş başarılı', token: response.data.token });
        } else {
            res.status(400).json({ message: 'Kullanıcı adı veya şifre yanlış' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Giriş sırasında bir hata oluştu', error: error.message });
    }
};

// /controllers/authController.js

// Kullanıcı silme
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; // Silinecek kullanıcı ID'si URL parametresinden alınır
        const response = await axios.delete(`${API_URL}/users/${userId}`);

        if (response.status === 200) {
            res.status(200).json({ message: 'Kullanıcı başarıyla silindi' });
        } else {
            res.status(400).json({ message: 'Kullanıcı silme sırasında bir hata oluştu' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı silme sırasında bir hata oluştu', error: error.message });
    }
};
