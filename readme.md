/project-root
│
├── /config
│   └── apiConfig.js          # API bağlantı ayarları ve konfigürasyonu
│
├── /controllers
│   └── contentController.js  # API'den içerik verisi çekme ve işlemleri
│
├── /routes
│   └── contentRoutes.js      # İçerik ile ilgili HTTP isteklerini yönlendiren route'lar
│
├── /public
│   └── /images              # Yüklenen resimler burada saklanabilir (isteğe bağlı)
│
├── /views
│   └── index.html            # Ana HTML sayfası
│
├── /assets
│   └── /css
│       └── style.css         # CSS dosyaları
│   └── /js
│       └── script.js         # Ana JavaScript dosyası
│
├── app.js                    # Sunucu dosyası, express ayarları burada
├── package.json              # Proje bağımlılıkları ve script'ler
└── .env                      # Çevresel değişkenler, API URL ve diğer ayarlar
