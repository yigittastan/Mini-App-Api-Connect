const fetch = require('node-fetch'); // API'ye istek göndermek için kullanacağız
const { apiUrl, apiKey } = require('../config/apiConfig'); // API URL ve API anahtarını almak için

// İçerik verisini API'ye ekleme
exports.addContent = async (req, res) => {
    try {
        const { name, url, image } = req.body;

        const response = await fetch(`${apiUrl}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`, // API anahtarını Authorization başlığına ekle
            },
            body: JSON.stringify({ name, url, image }),
        });

        const data = await response.json();
        res.status(201).json(data); // Başarıyla kaydedildiğinde veriyi döndür
    } catch (error) {
        res.status(500).json({ message: 'API\'ye veri gönderilemedi', error });
    }
};

// İçerik verilerini API'den alma
exports.getContents = async (req, res) => {
    try {
        const response = await fetch(`${apiUrl}/content`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`, // API anahtarını Authorization başlığına ekle
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Veriler alınamadı', error });
    }
};

// İçerik silme işlemi
exports.deleteContent = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${apiUrl}/content/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${apiKey}`, // API anahtarını Authorization başlığına ekle
            },
        });

        if (!response.ok) {
            throw new Error('Silme işlemi başarısız');
        }

        res.status(200).json({ message: 'İçerik başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Silme işlemi yapılamadı', error });
    }
};
