# Modern E-Ticaret Sitesi - Next.js 14 Uygulaması

Modern bir e-ticaret sitesi uygulaması. Next.js 14, TypeScript, Tailwind CSS, Zustand ve Radix UI kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Temel Özellikler
- ✅ **Next.js 14**: App Router ile modern React framework
- ✅ **TypeScript**: Tam TypeScript entegrasyonu ve tip güvenliği
- ✅ **Tailwind CSS**: Utility-first CSS framework
- ✅ **State Management**: Zustand ile modern state yönetimi
- ✅ **UI Components**: Radix UI ile erişilebilir bileşenler
- ✅ **Responsive Design**: Mobil-first tasarım yaklaşımı

### E-Ticaret Özellikleri
- 🛍️ **Ürün Listeleme**: Grid ve liste görünümü
- 🔍 **Arama ve Filtreleme**: Gelişmiş arama ve filtreleme sistemi
- 🛒 **Sepet Yönetimi**: Ürün ekleme, çıkarma, miktar güncelleme
- 💳 **Ödeme Sistemi**: Çoklu ödeme yöntemi desteği
- 📱 **Responsive Tasarım**: Mobil uyumlu arayüz
- 🎨 **Modern UI/UX**: Kullanıcı dostu tasarım

### Gelişmiş Özellikler
- 🔄 **Loading States**: Yükleme durumları
- 📢 **Toast Notifications**: Kullanıcı bildirimleri
- 🏷️ **İndirim Sistemi**: Ürün indirimleri
- 📊 **Stok Takibi**: Stok durumu gösterimi
- 🏪 **Kategori Sistemi**: Ürün kategorileri
- 📄 **Sipariş Takibi**: Sipariş durumu takibi

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.3+
- **State Management**: Zustand 4.4+
- **UI Components**: Radix UI, Lucide React
- **Form Management**: React Hook Form, Zod
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Build Tool**: Next.js (Turbopack)

## 📦 Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **PostgreSQL veritabanını kurun:**
```bash
# PostgreSQL'de veritabanını oluşturun
psql -U postgres -f setup-database.sql
```

3. **Environment dosyasını oluşturun:**
```bash
# env.example dosyasını .env.local olarak kopyalayın
cp env.example .env.local
```

4. **Backend seçimi yapın (.env.local dosyasında):**
```bash
# Mock data için
NEXT_PUBLIC_BACKEND_TYPE=mock

# Spring Boot için
NEXT_PUBLIC_BACKEND_TYPE=spring

# .NET Core için
NEXT_PUBLIC_BACKEND_TYPE=dotnet
```

5. **Backend'i çalıştırın (seçtiğiniz backend'e göre):**

**Spring Boot:**
```bash
cd backend-spring
./mvnw spring-boot:run
```

**.NET Core:**
```bash
cd backend-dotnet
dotnet run
```

6. **Frontend'i çalıştırın:**
```bash
npm run dev
```

7. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global CSS
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa
│   ├── products/          # Ürün sayfaları
│   │   ├── page.tsx       # Ürün listesi
│   │   └── [id]/page.tsx  # Ürün detayı
│   ├── cart/page.tsx      # Sepet sayfası
│   ├── checkout/page.tsx  # Ödeme sayfası
│   └── order-success/page.tsx # Sipariş başarı
├── src/
│   ├── components/        # Bileşenler
│   │   ├── ui/           # Temel UI bileşenleri
│   │   ├── navigation.tsx # Navigasyon
│   │   ├── product-card.tsx # Ürün kartı
│   │   ├── product-grid.tsx # Ürün grid'i
│   │   ├── search-bar.tsx # Arama çubuğu
│   │   └── category-filter.tsx # Kategori filtresi
│   ├── lib/              # Yardımcı fonksiyonlar
│   │   └── utils.ts      # Utility fonksiyonları
│   ├── store/            # Zustand store'ları
│   │   ├── cart-store.ts # Sepet state
│   │   └── product-store.ts # Ürün state
│   ├── services/         # API servisleri
│   │   └── product-service.ts
│   └── types/            # TypeScript type tanımları
│       └── index.ts
├── public/               # Statik dosyalar
├── tailwind.config.js    # Tailwind konfigürasyonu
├── next.config.js        # Next.js konfigürasyonu
└── tsconfig.json         # TypeScript konfigürasyonu
```

## 🎯 Kullanım

### Ürün Görüntüleme
- Ana sayfada ürünleri listeleyin
- Arama çubuğunu kullanarak ürün arayın
- Filtreleme paneli ile ürünleri filtreleyin
- Ürün kartlarına tıklayarak detayları görüntüleyin

### Sepet İşlemleri
- Ürünleri sepete ekleyin
- Sepet miktarını güncelleyin
- Ürünleri sepetten çıkarın
- Sepeti temizleyin

### Ödeme İşlemi
- Sepet sayfasından ödemeye geçin
- Teslimat bilgilerini girin
- Ödeme yöntemini seçin
- Siparişi tamamlayın

## 🔧 Geliştirme

### TypeScript Konfigürasyonu
- `tsconfig.json` dosyasında TypeScript ayarları
- Strict mode aktif
- Path mapping yapılandırması

### Redux Store
- Type-safe Redux store
- Cart state yönetimi
- Action creators ve reducers

### API Entegrasyonu
- Axios ile HTTP istekleri
- Type-safe API responses
- Error handling

## 🚀 Build ve Deploy

### Production Build
```bash
npm run build
```

### Test
```bash
npm test
```

## 📝 API Endpoints

Uygulama aşağıdaki API endpoint'lerini kullanır:

- `GET /api/products/getall` - Tüm ürünleri getir
- `GET /api/products/getByProductName` - Ürün adına göre getir
- `GET /api/products/{id}` - ID'ye göre ürün getir
- `GET /api/products/category/{id}` - Kategoriye göre ürünler
- `GET /api/products/search` - Ürün arama
- `GET /api/products/featured` - Öne çıkan ürünler
- `GET /api/products/discounted` - İndirimli ürünler

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir. Production kullanımı için ek güvenlik ve optimizasyon önlemleri alınmalıdır.
