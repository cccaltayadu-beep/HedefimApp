# Hedefim Landing

Modern React + Tailwind CSS landing page for the **Hedefim** app, a scientific YKS university preference guide.

## Kurulum

Proje klasöründe aşağıdaki adımları izleyin:

```bash
npm install
npm run dev
```

Geliştirme sunucusu varsayılan olarak `http://localhost:5173` adresinde açılır.

## Mimarinin Özeti

- **React + Vite**: Hızlı geliştirme ortamı
- **Tailwind CSS**: Derin mavi ve beyaz ağırlıklı, modern ve prestijli arayüz
- **YKS Puan Alanı**: TYT, SAY, EA, SÖZ ve yıl seçimi için temiz bir giriş alanı
- **YÖK Atlas İstemcisi**: `src/services/yokAtlasClient.js` dosyasında bağımsız bir fonksiyon
  - Şu anda mock veri döndürür
  - Gerçek zamanlı YÖK Atlas entegrasyonu için bu fonksiyon içi doldurulmalıdır

## YÖK Atlas Entegrasyonu

Gerçek veriye geçmek için:

1. Backend tarafında YÖK Atlas veya kendi veri tabanınıza erişen bir endpoint tanımlayın. Önerilen sözleşme:
   - URL: `POST /api/yok-atlas/suggestions`
   - Body:
     ```json
     {
       "year": "2025",
       "scores": {
         "tyt": 420.75,
         "say": 430.12,
         "ea": 395.6,
         "soz": 380.2
       }
     }
     ```
   - Cevap:
     ```json
     [
       {
         "id": "boun-ceng",
         "university": "Boğaziçi Üniversitesi",
         "program": "Bilgisayar Mühendisliği",
         "city": "İstanbul",
         "scoreType": "SAY",
         "lastMinScore": 560.42
       }
     ]
     ```
2. Frontend `.env` dosyanızda backend adresini tanımlayın:
   ```bash
   VITE_YOK_ATLAS_API_URL=https://your-backend-domain.com/api/yok-atlas
   ```
3. `src/services/yokAtlasClient.js` içindeki `fetchYokAtlasSuggestions` fonksiyonu bu endpoint’e `POST` isteği atar, gelen veriyi normalize eder ve arayüze uygun forma çevirir.

Arayüz ve mimari, bu endpoint gerçek YÖK Atlas verisiyle beslendiğinde ekstra değişiklik olmadan çalışacak şekilde tasarlanmıştır.

