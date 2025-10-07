# Proje Yapısı

## 🏗️ Backend Projeleri

### .NET Core Backend
```
backend-dotnet/
├── Application/
│   ├── DTOs/
│   │   ├── BaseResponseDto.cs
│   │   ├── CategoryDto.cs
│   │   ├── PagedResultDto.cs
│   │   ├── ProductDto.cs
│   │   └── ProductFilterDto.cs
│   └── Services/
│       ├── IProductService.cs
│       └── ProductService.cs
├── Domain/
│   └── Entities/
│       ├── BaseEntity.cs
│       ├── Campaign.cs
│       ├── Category.cs
│       └── Product.cs
├── Infrastructure/
│   ├── Data/
│   │   ├── ApplicationDbContext.cs
│   │   └── DataSeeder.cs
│   ├── Middleware/
│   │   ├── GlobalExceptionMiddleware.cs
│   │   └── ValidationMiddleware.cs
│   ├── Repositories/
│   │   ├── CategoryRepository.cs
│   │   ├── ICategoryRepository.cs
│   │   ├── IProductRepository.cs
│   │   └── ProductRepository.cs
│   └── Web/
│       └── Controllers/
│           └── ProductController.cs
├── EcommerceBackend.csproj
└── Program.cs
```

### Spring Boot Backend
```
backend-spring/
├── src/main/java/com/ecommerce/backend/
│   ├── application/
│   │   ├── dto/
│   │   │   ├── BaseResponseDto.java
│   │   │   ├── CategoryDto.java
│   │   │   ├── ProductDto.java
│   │   │   └── ProductFilterDto.java
│   │   └── service/
│   │       └── ProductService.java
│   ├── domain/
│   │   └── entity/
│   │       ├── BaseEntity.java
│   │       ├── Campaign.java
│   │       ├── Category.java
│   │       └── Product.java
│   ├── infrastructure/
│   │   ├── data/
│   │   │   └── DataSeeder.java
│   │   ├── repository/
│   │   │   ├── CampaignRepository.java
│   │   │   ├── CategoryRepository.java
│   │   │   └── ProductRepository.java
│   │   └── web/
│   │       ├── controller/
│   │       │   └── ProductController.java
│   │       └── exception/
│   │           └── GlobalExceptionHandler.java
│   ├── EcommerceBackendApplication.java
│   └── resources/
│       └── application.yml
├── pom.xml
└── mvnw.cmd
```

## 🎯 Temizlenen Dosyalar

### .NET Core'dan Silinenler:
- ❌ `Controllers/` (eski controller'lar)
- ❌ `Data/` (eski data context)
- ❌ `DTOs/` (eski DTO'lar)
- ❌ `Models/` (eski model'lar)
- ❌ `Repositories/` (eski repository'ler)
- ❌ `Services/` (eski service'ler)

### Spring Boot'tan Silinenler:
- ❌ `com.eticaret` paketi (eski paket yapısı)

## ✅ Modern Mimari Özellikleri

### Clean Architecture
- **Domain Layer**: Entities ve business rules
- **Application Layer**: DTOs ve services
- **Infrastructure Layer**: Data access, web, middleware

### Teknoloji Stack
- **.NET Core**: Entity Framework, PostgreSQL, Validation Middleware
- **Spring Boot**: JPA, PostgreSQL, Global Exception Handler
- **PostgreSQL**: Her iki backend için ortak veritabanı
- **Validation**: Middleware ile merkezi validation

### API Endpoints
- `GET /api/products` - Ürün listesi (filtreleme, sayfalama)
- `GET /api/products/{id}` - Ürün detayı
- `GET /api/products/category/{id}` - Kategoriye göre ürünler
- `GET /api/products/search` - Ürün arama
- `GET /api/products/featured` - Öne çıkan ürünler
- `GET /api/products/discounted` - İndirimli ürünler
- `POST /api/products` - Yeni ürün ekleme
- `PUT /api/products/{id}` - Ürün güncelleme
- `DELETE /api/products/{id}` - Ürün silme

## 🚀 Kullanım

### Environment Konfigürasyonu
```bash
# .env.local dosyasında
NEXT_PUBLIC_BACKEND_TYPE=mock    # Mock data
NEXT_PUBLIC_BACKEND_TYPE=spring  # Spring Boot
NEXT_PUBLIC_BACKEND_TYPE=dotnet  # .NET Core
```

### Backend Çalıştırma
```bash
# .NET Core
cd backend-dotnet
dotnet run

# Spring Boot
cd backend-spring
./mvnw spring-boot:run
```

### Frontend Çalıştırma
```bash
npm run dev
```
