import {
  Product,
  Category,
  SubCategory,
  Campaign,
  Review,
  ProductReviewSummary,
} from "@/types";

// Genişletilmiş Kategoriler
export const extendedCategories: Category[] = [
  {
    id: 1,
    categoryName: "Elektronik",
    description: "Telefon, bilgisayar, tablet ve diğer elektronik ürünler",
    imageUrl: "https://picsum.photos/300/200?random=cat1",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    categoryName: "Moda",
    description: "Giyim, ayakkabı, çanta ve aksesuar",
    imageUrl: "https://picsum.photos/300/200?random=cat2",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    categoryName: "Ev & Yaşam",
    description: "Ev dekorasyonu, mutfak, banyo ve yaşam ürünleri",
    imageUrl: "https://picsum.photos/300/200?random=cat3",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    categoryName: "Spor & Outdoor",
    description: "Spor giyim, fitness, outdoor ve kamp ürünleri",
    imageUrl: "https://picsum.photos/300/200?random=cat4",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    categoryName: "Anne & Bebek",
    description: "Bebek giyim, oyuncak, bakım ürünleri",
    imageUrl: "https://picsum.photos/300/200?random=cat5",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    categoryName: "Kozmetik & Kişisel Bakım",
    description: "Makyaj, cilt bakımı, parfüm ve kişisel bakım",
    imageUrl: "https://picsum.photos/300/200?random=cat6",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    categoryName: "Süpermarket",
    description: "Gıda, temizlik, kişisel bakım ürünleri",
    imageUrl: "https://picsum.photos/300/200?random=cat7",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    categoryName: "Kitap & Müzik",
    description: "Kitaplar, müzik, film ve hobi ürünleri",
    imageUrl: "https://picsum.photos/300/200?random=cat8",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    categoryName: "Oto & Bahçe",
    description: "Araç aksesuarları, bahçe malzemeleri",
    imageUrl: "https://picsum.photos/300/200?random=cat9",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    categoryName: "Kırtasiye & Ofis",
    description: "Ofis malzemeleri, kırtasiye ürünleri",
    imageUrl: "https://picsum.photos/300/200?random=cat10",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Genişletilmiş SubKategoriler
export const extendedSubCategories: SubCategory[] = [
  // Elektronik SubKategorileri
  { id: 1, subCategoryName: "Telefon & Aksesuar", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, subCategoryName: "Bilgisayar & Tablet", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, subCategoryName: "TV & Ses Sistemleri", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, subCategoryName: "Kamera & Fotoğraf", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, subCategoryName: "Oyun & Konsol", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, subCategoryName: "Küçük Ev Aletleri", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, subCategoryName: "Klima & Isıtma", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 8, subCategoryName: "Güvenlik Sistemleri", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 9, subCategoryName: "Araç Elektroniği", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 10, subCategoryName: "Saat & Aksesuar", categoryId: 1, categoryName: "Elektronik", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Moda SubKategorileri
  { id: 11, subCategoryName: "Kadın Giyim", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 12, subCategoryName: "Erkek Giyim", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 13, subCategoryName: "Çocuk Giyim", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 14, subCategoryName: "Ayakkabı", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 15, subCategoryName: "Çanta & Aksesuar", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 16, subCategoryName: "Saat & Mücevher", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 17, subCategoryName: "Gözlük", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 18, subCategoryName: "İç Giyim", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 19, subCategoryName: "Plaj & Havuz", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 20, subCategoryName: "Büyük Beden", categoryId: 2, categoryName: "Moda", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Ev & Yaşam SubKategorileri
  { id: 21, subCategoryName: "Mobilya", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 22, subCategoryName: "Dekorasyon", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 23, subCategoryName: "Mutfak & Yemek", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 24, subCategoryName: "Banyo", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 25, subCategoryName: "Yatak Odası", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 26, subCategoryName: "Oturma Odası", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 27, subCategoryName: "Çocuk Odası", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 28, subCategoryName: "Bahçe & Balkon", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 29, subCategoryName: "Temizlik", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 30, subCategoryName: "Ev Tekstili", categoryId: 3, categoryName: "Ev & Yaşam", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Spor & Outdoor SubKategorileri
  { id: 31, subCategoryName: "Fitness & Kondisyon", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 32, subCategoryName: "Futbol", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 33, subCategoryName: "Basketbol", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 34, subCategoryName: "Tenis", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 35, subCategoryName: "Yüzme", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 36, subCategoryName: "Kamp & Outdoor", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 37, subCategoryName: "Bisiklet", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 38, subCategoryName: "Koşu", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 39, subCategoryName: "Yoga & Pilates", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 40, subCategoryName: "Kış Sporları", categoryId: 4, categoryName: "Spor & Outdoor", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Anne & Bebek SubKategorileri
  { id: 41, subCategoryName: "Bebek Giyim", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 42, subCategoryName: "Bebek Bakım", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 43, subCategoryName: "Bebek Beslenme", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 44, subCategoryName: "Bebek Odası", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 45, subCategoryName: "Bebek Arabası", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 46, subCategoryName: "Oyuncak", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 47, subCategoryName: "Anne Giyim", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 48, subCategoryName: "Hamilelik", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 49, subCategoryName: "Emzirme", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 50, subCategoryName: "Güvenlik", categoryId: 5, categoryName: "Anne & Bebek", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Kozmetik & Kişisel Bakım SubKategorileri
  { id: 51, subCategoryName: "Makyaj", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 52, subCategoryName: "Cilt Bakımı", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 53, subCategoryName: "Saç Bakımı", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 54, subCategoryName: "Parfüm", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 55, subCategoryName: "Erkek Bakım", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 56, subCategoryName: "Güneş Bakımı", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 57, subCategoryName: "Doğal Ürünler", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 58, subCategoryName: "Vitamin & Takviye", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 59, subCategoryName: "Kişisel Bakım", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 60, subCategoryName: "Bebek Bakım", categoryId: 6, categoryName: "Kozmetik & Kişisel Bakım", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Süpermarket SubKategorileri
  { id: 61, subCategoryName: "Gıda", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 62, subCategoryName: "İçecek", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 63, subCategoryName: "Temizlik", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 64, subCategoryName: "Kişisel Bakım", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 65, subCategoryName: "Bebek & Çocuk", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 66, subCategoryName: "Evcil Hayvan", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 67, subCategoryName: "Dondurulmuş", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 68, subCategoryName: "Organik", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 69, subCategoryName: "Atıştırmalık", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 70, subCategoryName: "Kahvaltılık", categoryId: 7, categoryName: "Süpermarket", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Kitap & Müzik SubKategorileri
  { id: 71, subCategoryName: "Kitap", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 72, subCategoryName: "Müzik", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 73, subCategoryName: "Film & Dizi", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 74, subCategoryName: "Hobi", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 75, subCategoryName: "Sanat", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 76, subCategoryName: "Eğitim", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 77, subCategoryName: "Çocuk Kitapları", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 78, subCategoryName: "Dergi", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 79, subCategoryName: "Enstrüman", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 80, subCategoryName: "Oyun", categoryId: 8, categoryName: "Kitap & Müzik", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Oto & Bahçe SubKategorileri
  { id: 81, subCategoryName: "Araç Bakım", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 82, subCategoryName: "Araç Aksesuar", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 83, subCategoryName: "Bahçe Aletleri", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 84, subCategoryName: "Bahçe Mobilyası", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 85, subCategoryName: "Bitki & Tohum", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 86, subCategoryName: "Havuz & Spa", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 87, subCategoryName: "Güvenlik", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 88, subCategoryName: "Aydınlatma", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 89, subCategoryName: "Temizlik", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 90, subCategoryName: "Dekorasyon", categoryId: 9, categoryName: "Oto & Bahçe", isActive: true, createdAt: new Date(), updatedAt: new Date() },

  // Kırtasiye & Ofis SubKategorileri
  { id: 91, subCategoryName: "Ofis Malzemeleri", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 92, subCategoryName: "Okul Kırtasiye", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 93, subCategoryName: "Sanat Malzemeleri", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 94, subCategoryName: "Teknoloji", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 95, subCategoryName: "Dosyalama", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 96, subCategoryName: "Yazı Malzemeleri", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 97, subCategoryName: "Planlama", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 98, subCategoryName: "Hediye", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 99, subCategoryName: "Organizasyon", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 100, subCategoryName: "Özel Günler", categoryId: 10, categoryName: "Kırtasiye & Ofis", isActive: true, createdAt: new Date(), updatedAt: new Date() },
];

// Genişletilmiş Kampanyalar
export const extendedCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Elektronik Fırsatları",
    subtitle: "Tüm elektronik ürünlerde %30'a varan indirimler",
    description: "Telefon, laptop, tablet ve diğer elektronik ürünlerde büyük indirimler. Sınırlı süre!",
    discount: 30,
    imageUrl: "https://picsum.photos/800/400?random=campaign1",
    backgroundColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    timeLeft: "5 gün kaldı",
    buttonText: "Hemen Keşfet",
    buttonHref: "/categories/elektronik",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Moda Sezonu",
    subtitle: "Yeni sezon koleksiyonları %25 indirimle",
    description: "Kadın, erkek ve çocuk giyimde yeni sezon ürünleri özel fiyatlarla.",
    discount: 25,
    imageUrl: "https://picsum.photos/800/400?random=campaign2",
    backgroundColor: "bg-gradient-to-r from-pink-600 to-red-600",
    timeLeft: "10 gün kaldı",
    buttonText: "Koleksiyonu Gör",
    buttonHref: "/categories/moda",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Ev & Yaşam",
    subtitle: "Ev dekorasyonu ve mobilya fırsatları",
    description: "Evinizi yenileyin! Mobilya, dekorasyon ve ev tekstili ürünlerinde indirimler.",
    discount: 20,
    imageUrl: "https://picsum.photos/800/400?random=campaign3",
    backgroundColor: "bg-gradient-to-r from-green-600 to-teal-600",
    timeLeft: "7 gün kaldı",
    buttonText: "Evi Yenile",
    buttonHref: "/categories/ev-yasam",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Spor & Fitness",
    subtitle: "Spor ekipmanları ve giyimde %35 indirim",
    description: "Sağlıklı yaşam için ihtiyacınız olan tüm spor ürünleri özel fiyatlarla.",
    discount: 35,
    imageUrl: "https://picsum.photos/800/400?random=campaign4",
    backgroundColor: "bg-gradient-to-r from-orange-600 to-yellow-600",
    timeLeft: "12 gün kaldı",
    buttonText: "Spora Başla",
    buttonHref: "/categories/spor",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Anne & Bebek",
    subtitle: "Bebek ürünlerinde %40'a varan indirimler",
    description: "Bebeğiniz için en kaliteli ürünler özel fiyatlarla. Güvenli alışveriş garantisi.",
    discount: 40,
    imageUrl: "https://picsum.photos/800/400?random=campaign5",
    backgroundColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    timeLeft: "15 gün kaldı",
    buttonText: "Bebek Ürünleri",
    buttonHref: "/categories/anne-bebek",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Kozmetik & Bakım",
    subtitle: "Güzellik ürünlerinde %30 indirim",
    description: "Makyaj, cilt bakımı ve kişisel bakım ürünlerinde büyük fırsatlar.",
    discount: 30,
    imageUrl: "https://picsum.photos/800/400?random=campaign6",
    backgroundColor: "bg-gradient-to-r from-rose-600 to-pink-600",
    timeLeft: "8 gün kaldı",
    buttonText: "Güzellik Ürünleri",
    buttonHref: "/categories/kozmetik",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Süpermarket",
    subtitle: "Gıda ve temizlik ürünlerinde %20 indirim",
    description: "Günlük ihtiyaçlarınız için en uygun fiyatlar. Hızlı teslimat.",
    discount: 20,
    imageUrl: "https://picsum.photos/800/400?random=campaign7",
    backgroundColor: "bg-gradient-to-r from-green-600 to-emerald-600",
    timeLeft: "6 gün kaldı",
    buttonText: "Alışverişe Başla",
    buttonHref: "/categories/süpermarket",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Kitap & Müzik",
    subtitle: "Kitaplar ve müzik ürünlerinde %25 indirim",
    description: "Okuma ve müzik tutkunları için özel fırsatlar. Yeni çıkan kitaplar ve albümler.",
    discount: 25,
    imageUrl: "https://picsum.photos/800/400?random=campaign8",
    backgroundColor: "bg-gradient-to-r from-indigo-600 to-blue-600",
    timeLeft: "14 gün kaldı",
    buttonText: "Kitapları Keşfet",
    buttonHref: "/categories/kitap",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Oto & Bahçe",
    subtitle: "Araç ve bahçe ürünlerinde %30 indirim",
    description: "Aracınız ve bahçeniz için ihtiyacınız olan tüm ürünler özel fiyatlarla.",
    discount: 30,
    imageUrl: "https://picsum.photos/800/400?random=campaign9",
    backgroundColor: "bg-gradient-to-r from-emerald-600 to-green-600",
    timeLeft: "9 gün kaldı",
    buttonText: "Araç & Bahçe",
    buttonHref: "/categories/oto",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Kırtasiye & Ofis",
    subtitle: "Ofis ve okul malzemelerinde %35 indirim",
    description: "Ofis ve okul ihtiyaçlarınız için en uygun fiyatlar. Toplu alımlarda ek indirim.",
    discount: 35,
    imageUrl: "https://picsum.photos/800/400?random=campaign10",
    backgroundColor: "bg-gradient-to-r from-amber-600 to-orange-600",
    timeLeft: "11 gün kaldı",
    buttonText: "Kırtasiye Ürünleri",
    buttonHref: "/categories/kirtasiye",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    title: "Black Friday",
    subtitle: "Yılın en büyük indirimi %50'ye varan fırsatlar",
    description: "Black Friday fırsatları başladı! Tüm kategorilerde büyük indirimler.",
    discount: 50,
    imageUrl: "https://picsum.photos/800/400?random=campaign11",
    backgroundColor: "bg-gradient-to-r from-red-600 to-black",
    timeLeft: "3 gün kaldı",
    buttonText: "Black Friday",
    buttonHref: "/campaigns",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    title: "Cyber Monday",
    subtitle: "Teknoloji ürünlerinde %40 indirim",
    description: "Cyber Monday'de teknoloji tutkunları için özel fırsatlar.",
    discount: 40,
    imageUrl: "https://picsum.photos/800/400?random=campaign12",
    backgroundColor: "bg-gradient-to-r from-cyan-600 to-blue-600",
    timeLeft: "2 gün kaldı",
    buttonText: "Teknoloji Fırsatları",
    buttonHref: "/categories/elektronik",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    title: "Yeni Yıl",
    subtitle: "Yeni yıla özel %25 indirim",
    description: "Yeni yıla girerken tüm ürünlerde özel indirimler.",
    discount: 25,
    imageUrl: "https://picsum.photos/800/400?random=campaign13",
    backgroundColor: "bg-gradient-to-r from-gold-600 to-yellow-600",
    timeLeft: "20 gün kaldı",
    buttonText: "Yeni Yıl Fırsatları",
    buttonHref: "/campaigns",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    title: "Sevgililer Günü",
    subtitle: "Sevgiliniz için özel hediyeler %30 indirim",
    description: "Sevgililer günü için özel hediye seçenekleri ve indirimler.",
    discount: 30,
    imageUrl: "https://picsum.photos/800/400?random=campaign14",
    backgroundColor: "bg-gradient-to-r from-pink-600 to-red-600",
    timeLeft: "18 gün kaldı",
    buttonText: "Hediye Seç",
    buttonHref: "/categories/moda",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    title: "Anneler Günü",
    subtitle: "Anneler için özel ürünler %35 indirim",
    description: "Anneler günü için özel ürünler ve indirimler.",
    discount: 35,
    imageUrl: "https://picsum.photos/800/400?random=campaign15",
    backgroundColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    timeLeft: "25 gün kaldı",
    buttonText: "Anne Hediyeleri",
    buttonHref: "/categories/kozmetik",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Genişletilmiş Ürünler (200+ ürün)
export const generateExtendedProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = extendedCategories;
  const subCategories = extendedSubCategories;

  // Elektronik ürünleri (50 ürün)
  const electronicsProducts = [
    "iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "MacBook Pro M3", "Dell XPS 13", "iPad Air",
    "Sony WH-1000XM5", "AirPods Pro", "Samsung QLED TV", "LG OLED TV", "PlayStation 5",
    "Xbox Series X", "Nintendo Switch", "Canon EOS R5", "Sony A7 IV", "DJI Mavic 3",
    "Apple Watch Series 9", "Samsung Galaxy Watch", "Fitbit Versa 4", "Garmin Fenix 7", "GoPro Hero 12",
    "Logitech MX Master 3S", "Razer DeathAdder V3", "SteelSeries Arctis 7P", "Corsair K95 RGB", "ASUS ROG Strix",
    "MSI Gaming Laptop", "Alienware Aurora", "Mac Studio", "Intel NUC", "Raspberry Pi 5",
    "Arduino Uno R4", "3D Printer Ender 3", "Robot Vacuum iRobot", "Smart Speaker Echo", "Google Nest Hub",
    "Philips Hue Bulbs", "Ring Doorbell", "Arlo Security Camera", "Tesla Model 3", "Electric Scooter",
    "Drone DJI Mini 4", "Action Camera Insta360", "VR Headset Meta Quest 3", "Steam Deck", "Gaming Chair",
    "Standing Desk", "Monitor Arm", "Webcam Logitech C920", "Microphone Blue Yeti", "Audio Interface Focusrite"
  ];

  // Moda ürünleri (40 ürün)
  const fashionProducts = [
    "Levi's 501 Jeans", "Nike Air Max", "Adidas Ultraboost", "Zara Blazer", "H&M T-Shirt",
    "Uniqlo Hoodie", "Converse Chuck Taylor", "Vans Old Skool", "Timberland Boots", "Dr. Martens",
    "Ray-Ban Aviator", "Oakley Sunglasses", "Rolex Submariner", "Apple Watch Band", "Fossil Watch",
    "Coach Handbag", "Louis Vuitton Bag", "Gucci Belt", "Hermes Scarf", "Chanel Perfume",
    "Dior Lipstick", "MAC Foundation", "Urban Decay Palette", "Too Faced Mascara", "Fenty Beauty",
    "Lululemon Leggings", "Nike Sports Bra", "Adidas Tracksuit", "Under Armour Shirt", "Puma Sneakers",
    "New Balance 990", "Asics Gel-Kayano", "Brooks Ghost", "Hoka One One", "Salomon Trail",
    "Patagonia Jacket", "North Face Backpack", "Columbia Fleece", "Arc'teryx Shell", "Marmot Sleeping Bag"
  ];

  // Ev & Yaşam ürünleri (35 ürün)
  const homeProducts = [
    "IKEA Billy Bookcase", "West Elm Sofa", "Crate & Barrel Dining Table", "Pottery Barn Bed", "Restoration Hardware Chair",
    "Wayfair Coffee Table", "Article Sectional", "AllModern Rug", "CB2 Lamp", "Design Within Reach Desk",
    "Herman Miller Aeron", "Steelcase Leap", "Vitra Eames Chair", "Knoll Barcelona", "Cassina LC4",
    "B&B Italia Sofa", "Poltrona Frau Armchair", "Kartell Ghost Chair", "Magis Spun Chair", "Flos Arco Lamp",
    "Artemide Tolomeo", "Kartell Bourgie", "Alessi Juicy Salif", "Alessi 9093", "Bodum French Press",
    "Le Creuset Dutch Oven", "All-Clad Pan Set", "KitchenAid Mixer", "Breville Espresso", "Dyson Vacuum",
    "Shark Robot Vacuum", "Roomba i7", "Philips Air Purifier", "Honeywell Humidifier", "De'Longhi Heater"
  ];

  // Spor ürünleri (30 ürün)
  const sportsProducts = [
    "Nike Air Zoom Pegasus", "Adidas Ultraboost 22", "Brooks Ghost 15", "Asics Gel-Nimbus 25", "New Balance 1080v13",
    "Hoka One One Clifton 9", "Saucony Triumph 21", "Mizuno Wave Rider 27", "Under Armour HOVR", "Puma Velocity Nitro",
    "Wilson Pro Staff", "Babolat Pure Drive", "Head Speed Pro", "Yonex EZONE", "Prince Textreme",
    "Callaway Mavrik Driver", "Titleist T300 Irons", "TaylorMade Spider Putter", "Ping G425 Hybrid", "Cobra King F9",
    "Nike Dri-FIT Shirt", "Adidas Climacool Shorts", "Under Armour HeatGear", "Lululemon Align Leggings", "Athleta Elation",
    "Garmin Forerunner 955", "Polar Vantage M2", "Suunto 9 Peak", "Coros Apex Pro", "Wahoo Elemnt Bolt"
  ];

  // Anne & Bebek ürünleri (25 ürün)
  const babyProducts = [
    "Graco 4Ever Car Seat", "Chicco KeyFit 30", "Britax Boulevard", "Cybex Sirona S", "Maxi-Cosi Pria 85",
    "Uppababy Vista Stroller", "Baby Jogger City Mini", "Bugaboo Cameleon3", "Stokke Xplory", "Nuna Mixx",
    "Fisher-Price Rock 'n Play", "4moms Mamaroo", "BabyBjorn Bouncer", "Skip Hop Activity Center", "Bright Starts Playard",
    "Graco Pack 'n Play", "Summer Infant Pop 'n Jump", "Evenflo ExerSaucer", "VTech Sit-to-Stand", "LeapFrog Learning Table",
    "Gerber Baby Food", "Earth's Best Organic", "Happy Baby Pouches", "Plum Organics", "Beech-Nut Naturals"
  ];

  // Kozmetik ürünleri (20 ürün)
  const beautyProducts = [
    "Estée Lauder Double Wear", "MAC Studio Fix", "Fenty Beauty Pro Filt'r", "NARS Radiant Creamy", "Too Faced Born This Way",
    "Urban Decay Naked Palette", "Anastasia Beverly Hills", "Huda Beauty Desert Dusk", "Morphe 35O Palette", "ColourPop Yes Please",
    "Charlotte Tilbury Pillow Talk", "Pat McGrath Labs", "Tom Ford Lip Color", "YSL Rouge Volupté", "Dior Addict Lipstick",
    "Chanel Coco Mademoiselle", "Marc Jacobs Daisy", "Viktor & Rolf Flowerbomb", "Yves Saint Laurent Black Opium", "Lancôme La Vie Est Belle"
  ];

  // Tüm ürün listelerini birleştir
  const allProducts = [
    ...electronicsProducts.map((name, index) => ({ name, categoryId: 1, basePrice: 500 + index * 100 })),
    ...fashionProducts.map((name, index) => ({ name, categoryId: 2, basePrice: 50 + index * 25 })),
    ...homeProducts.map((name, index) => ({ name, categoryId: 3, basePrice: 200 + index * 50 })),
    ...sportsProducts.map((name, index) => ({ name, categoryId: 4, basePrice: 100 + index * 30 })),
    ...babyProducts.map((name, index) => ({ name, categoryId: 5, basePrice: 80 + index * 20 })),
    ...beautyProducts.map((name, index) => ({ name, categoryId: 6, basePrice: 30 + index * 15 })),
  ];

  // Ürünleri oluştur
  allProducts.forEach((product, index) => {
    const category = categories.find(c => c.id === product.categoryId);
    const subCategory = subCategories.find(sc => sc.categoryId === product.categoryId);
    
    products.push({
      id: index + 1,
      productName: product.name,
      unitPrice: product.basePrice,
      unitInStock: Math.floor(Math.random() * 100) + 10,
      quantityPerUnit: "1 adet",
      category: category,
      subCategory: subCategory,
      description: `${product.name} - Yüksek kaliteli ürün. Detaylı açıklama ve özellikler.`,
      imageUrl: `https://picsum.photos/600/400?random=${index + 1}`,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
      isActive: true,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    });
  });

  return products;
};

// Genişletilmiş Yorumlar
export const generateExtendedReviews = (products: Product[]): Review[] => {
  const reviews: Review[] = [];
  const userNames = [
    "Ahmet Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Fatma Özkan", "Ali Çelik",
    "Zeynep Arslan", "Mustafa Şahin", "Elif Yıldız", "Burak Öztürk", "Selin Aydın",
    "Emre Doğan", "Gamze Kılıç", "Onur Yılmaz", "Pınar Acar", "Serkan Özkan",
    "Deniz Çakır", "Ebru Yılmaz", "Tolga Demir", "Seda Kaya", "Murat Özkan",
    "Gizem Çelik", "Kemal Arslan", "Nur Şahin", "Berk Yıldız", "İpek Öztürk"
  ];

  const reviewTitles = [
    "Harika ürün!", "Çok memnun kaldım", "Beklentilerimi aştı", "Kaliteli ve güvenilir",
    "Hızlı teslimat", "Mükemmel paketleme", "Fiyat performans", "Tavsiye ederim",
    "İkinci kez alacağım", "Ailem de beğendi", "Çok pratik", "Dayanıklı ürün",
    "Güzel tasarım", "Kolay kullanım", "Değer para", "Süper kalite"
  ];

  const reviewComments = [
    "Ürün gerçekten çok kaliteli. Beklentilerimi aştı. Hızlı teslimat için teşekkürler.",
    "Çok memnun kaldım. Fiyat performans açısından mükemmel. Tavsiye ederim.",
    "Harika bir ürün. Kalitesi çok iyi. Paketleme de çok düzgündü.",
    "Beklediğimden çok daha iyi çıktı. Kullanımı kolay ve pratik.",
    "Mükemmel! Hızlı teslimat ve kaliteli ürün. Kesinlikle tekrar alacağım.",
    "Çok güzel bir ürün. Tasarımı harika ve kullanımı kolay.",
    "Fiyatına göre çok iyi. Kaliteli malzeme kullanılmış.",
    "Ailem de çok beğendi. Herkese tavsiye ederim.",
    "Dayanıklı ve güvenilir. Uzun süre kullanacağım.",
    "Süper kalite! Beklentilerimi aştı. Teşekkürler."
  ];

  products.forEach((product, productIndex) => {
    const reviewCount = Math.floor(Math.random() * 10) + 5; // 5-15 yorum
    
    for (let i = 0; i < reviewCount; i++) {
      const userName = userNames[Math.floor(Math.random() * userNames.length)];
      const rating = Math.floor(Math.random() * 5) + 1;
      const title = reviewTitles[Math.floor(Math.random() * reviewTitles.length)];
      const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)];
      
      reviews.push({
        id: reviews.length + 1,
        userId: Math.floor(Math.random() * 1000) + 1,
        productId: product.id,
        rating: rating,
        title: title,
        comment: comment,
        isVerified: Math.random() > 0.3,
        isHelpful: Math.random() > 0.5,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        userName: userName,
        productName: product.productName,
      });
    }
  });

  return reviews;
};

// Genişletilmiş Yorum Özetleri
export const generateExtendedReviewSummaries = (products: Product[], reviews: Review[]): ProductReviewSummary[] => {
  return products.map(product => {
    const productReviews = reviews.filter(review => review.productId === product.id);
    const totalReviews = productReviews.length;
    
    if (totalReviews === 0) {
      return {
        productId: product.id,
        averageRating: 0,
        totalReviews: 0,
        rating1Count: 0,
        rating2Count: 0,
        rating3Count: 0,
        rating4Count: 0,
        rating5Count: 0,
      };
    }

    const ratingCounts = {
      1: productReviews.filter(r => r.rating === 1).length,
      2: productReviews.filter(r => r.rating === 2).length,
      3: productReviews.filter(r => r.rating === 3).length,
      4: productReviews.filter(r => r.rating === 4).length,
      5: productReviews.filter(r => r.rating === 5).length,
    };

    const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    return {
      productId: product.id,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: totalReviews,
      rating1Count: ratingCounts[1],
      rating2Count: ratingCounts[2],
      rating3Count: ratingCounts[3],
      rating4Count: ratingCounts[4],
      rating5Count: ratingCounts[5],
    };
  });
};
