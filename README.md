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

1. `src/services/yokAtlasClient.js` dosyasını açın.
2. `fetchYokAtlasSuggestions` fonksiyonu içinde:
   - Gerekli API isteklerini (REST, proxy sunucu vb.) ekleyin.
   - Geri dönen veriyi, halihazırda kullanılan formatta (`university`, `program`, `city`, `scoreType`, `lastMinScore`) dönüştürün.

Arayüz ve mimari, gerçek zamanlı veri çekmeye hazır olacak şekilde tasarlanmıştır.

