import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Headphones, 
  Camera, 
  Gamepad2,
  Shirt,
  Footprints,
  Handbag,
  Watch,
  Home,
  Sofa,
  Utensils,
  Car,
  Baby,
  Heart,
  BookOpen,
  Music,
  Dumbbell,
  Palette,
  Wrench,
  Briefcase
} from "lucide-react";

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
  icon: any;
}

export interface MegaMenuItem {
  id: string;
  name: string;
  href: string;
  isPopular?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface MegaMenuCategory {
  columns: MegaMenuColumn[];
  featured: MegaMenuFeaturedProduct[];
}

export interface MegaMenuFeaturedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  rating: number;
  href: string;
}

export interface MegaMenuData {
  [key: string]: MegaMenuCategory;
}

export interface AllCategoriesMenu {
  categories: AllCategoryItem[];
}

export interface AllCategoryItem {
  id: string;
  name: string;
  icon: any;
  href: string;
  subCategories: AllSubCategory[];
}

export interface AllSubCategory {
  title: string;
  items: string[];
}

// Tüm Kategoriler menü verisi
export const allCategoriesData: AllCategoriesMenu = {
  categories: [
    {
      id: "women",
      name: "Kadın",
      icon: Shirt,
      href: "/categories/women",
      subCategories: [
        {
          title: "Giyim",
          items: [
            "Elbise", "Tişört", "Gömlek", "Kot Pantolon", "Kot Ceket", 
            "Pantolon", "Mont", "Bluz", "Ceket", "Etek", "Kazak", 
            "Tesettür", "Büyük Beden", "Trençkot", "Yağmurluk & Rüzgarlık", 
            "Sweatshirt", "Kaban", "Hırka", "Palto"
          ]
        },
        {
          title: "Ayakkabı",
          items: [
            "Topuklu Ayakkabı", "Sneaker", "Günlük Ayakkabı", "Babet", 
            "Sandalet", "Bot", "Çizme", "Kar Botu", "Loafer"
          ]
        },
        {
          title: "Çanta",
          items: [
            "Omuz Çantası", "Sırt Çantası", "Bel Çantası", "Okul Çantası", 
            "Laptop Çantası", "Portföy", "Postacı Çantası", "El Çantası", 
            "Kanvas Çantası", "Makyaj Çantası", "Abiye Çantası", "Çapraz Çantası", 
            "Bez Çantası", "Anne Bebek Çantası", "Evrak Çantası", "Tote Çantası", 
            "Beslenme Çantası", "Kartlık", "Cüzdan", "Kadın Spor Çantası"
          ]
        },
        {
          title: "Ev & İç Giyim",
          items: [
            "Pijama Takımı", "Gecelik", "Sütyen", "İç Çamaşırı Takımları", 
            "Fantezi Giyim", "Çorap", "Korse", "Külot", "Büstiyer", "Bralet", 
            "Atlet & Body", "Kombinezon", "Jartiyer"
          ]
        },
        {
          title: "Kozmetik",
          items: [
            "Parfüm", "Göz Makyajı", "Cilt Bakım", "Saç Bakımı", "Makyaj", 
            "Ağız Bakım", "Cinsel Sağlık", "Vücut Bakım", "Hijyenik Ped", 
            "Duş Jeli & Kremleri", "Epilasyon Ürünleri", "Ruj", "Dudak Nemlendirici", 
            "Aydınlatıcı & Highlighter", "Eyeliner", "Ten Makyajı", "Manikür & Pedikür", 
            "BB & CC Krem", "El Kremi", "Yüz Nemlendirici"
          ]
        },
        {
          title: "Spor & Outdoor",
          items: [
            "Sweatshirt", "Tişört", "Spor Sütyeni", "Tayt", "Eşofman", 
            "Koşu Ayakkabısı", "Spor Çantası", "Spor Ekipmanları", "Outdoor Ayakkabı", 
            "Kar Botu", "Outdoor Ekipmanları", "Sporcu Besinleri", "Sporcu Aksesuarları", 
            "Outdoor Çanta", "Kayak Malzemeleri", "Uyku Tulumu", "Mat", "Dağcılık", 
            "Kadın Spor Ceket", "Spor Ayakkabı"
          ]
        }
      ]
    },
    {
      id: "men",
      name: "Erkek",
      icon: Shirt,
      href: "/categories/men",
      subCategories: [
        {
          title: "Giyim",
          items: [
            "Tişört", "Gömlek", "Pantolon", "Kot Pantolon", "Ceket", 
            "Mont", "Kaban", "Sweatshirt", "Kazak", "Hırka", "Şort", 
            "Eşofman", "Takım Elbise", "Yağmurluk", "Polo Tişört"
          ]
        },
        {
          title: "Ayakkabı",
          items: [
            "Sneaker", "Günlük Ayakkabı", "Spor Ayakkabı", "Klasik Ayakkabı", 
            "Bot", "Terlik", "Sandalet", "Loafer", "Outdoor Ayakkabı"
          ]
        },
        {
          title: "Çanta & Aksesuar",
          items: [
            "Sırt Çantası", "Laptop Çantası", "Evrak Çantası", "Spor Çantası", 
            "Kemer", "Cüzdan", "Saat", "Güneş Gözlüğü", "Şapka"
          ]
        }
      ]
    },
    {
      id: "baby-kids",
      name: "Anne & Çocuk",
      icon: Baby,
      href: "/categories/baby-kids",
      subCategories: [
        {
          title: "Bebek Giyim",
          items: [
            "Bebek Body", "Bebek Tulumu", "Bebek Takımı", "Bebek Pijama", 
            "Bebek Çorap", "Bebek Eldiven", "Bebek Şapka", "Bebek Patik"
          ]
        },
        {
          title: "Çocuk Giyim",
          items: [
            "Çocuk Tişört", "Çocuk Pantolon", "Çocuk Elbise", "Çocuk Mont", 
            "Çocuk Ayakkabı", "Çocuk Çorap", "Çocuk İç Giyim"
          ]
        },
        {
          title: "Bebek Bakım",
          items: [
            "Bebek Bezi", "Bebek Maması", "Bebek Şampuanı", "Bebek Kremi", 
            "Bebek Pudrası", "Bebek Yağı", "Bebek Losyonu"
          ]
        }
      ]
    },
    {
      id: "home-furniture",
      name: "Ev & Mobilya",
      icon: Home,
      href: "/categories/home-furniture",
      subCategories: [
        {
          title: "Mobilya",
          items: [
            "Yatak Odası", "Oturma Odası", "Yemek Odası", "Çalışma Odası", 
            "Genç Odası", "Banyo Mobilyası", "Koridor Mobilyası"
          ]
        },
        {
          title: "Ev Tekstili",
          items: [
            "Yatak Takımı", "Nevresim", "Yorgan", "Yastık", "Battaniye", 
            "Perde", "Halı", "Kilim", "Masa Örtüsü"
          ]
        },
        {
          title: "Mutfak",
          items: [
            "Mutfak Gereçleri", "Tencere", "Tava", "Tabak", "Bardak", 
            "Çatal Kaşık", "Mutfak Robotu", "Kahve Makinesi"
          ]
        }
      ]
    },
    {
      id: "supermarket",
      name: "Süpermarket",
      icon: Utensils,
      href: "/categories/supermarket",
      subCategories: [
        {
          title: "Gıda",
          items: [
            "Kahvaltılık", "Et & Tavuk", "Süt & Süt Ürünleri", "Meyve & Sebze", 
            "Bakliyat", "Makarna & Erişte", "Konserve", "Dondurulmuş Gıda"
          ]
        },
        {
          title: "İçecek",
          items: [
            "Su", "Meyve Suyu", "Gazlı İçecek", "Çay", "Kahve", 
            "Enerji İçeceği", "Alkollü İçecek"
          ]
        },
        {
          title: "Temizlik",
          items: [
            "Çamaşır Deterjanı", "Bulaşık Deterjanı", "Yüzey Temizleyici", 
            "Tuvalet Kağıdı", "Kağıt Havlu", "Temizlik Bezi"
          ]
        }
      ]
    },
    {
      id: "cosmetics",
      name: "Kozmetik",
      icon: Heart,
      href: "/categories/cosmetics",
      subCategories: [
        {
          title: "Makyaj",
          items: [
            "Fondöten", "Kapatıcı", "Ruj", "Göz Kalemi", "Maskara", 
            "Allık", "Highlighter", "Eyeliner", "Göz Fırçası"
          ]
        },
        {
          title: "Cilt Bakım",
          items: [
            "Temizleyici", "Tonik", "Nemlendirici", "Güneş Kremi", 
            "Anti-Aging", "Göz Kremi", "Yüz Maskesi", "Serum"
          ]
        },
        {
          title: "Saç Bakım",
          items: [
            "Şampuan", "Saç Kremi", "Saç Maskesi", "Saç Yağı", 
            "Saç Spreyi", "Saç Jeli", "Saç Boyası"
          ]
        }
      ]
    },
    {
      id: "shoes-bags",
      name: "Ayakkabı & Çanta",
      icon: Footprints,
      href: "/categories/shoes-bags",
      subCategories: [
        {
          title: "Kadın Ayakkabı",
          items: [
            "Topuklu", "Babet", "Sneaker", "Bot", "Çizme", 
            "Sandalet", "Loafer", "Spor Ayakkabı"
          ]
        },
        {
          title: "Erkek Ayakkabı",
          items: [
            "Sneaker", "Klasik", "Bot", "Spor", "Terlik", 
            "Sandalet", "Loafer", "Outdoor"
          ]
        },
        {
          title: "Çanta",
          items: [
            "El Çantası", "Sırt Çantası", "Laptop Çantası", "Evrak Çantası", 
            "Spor Çantası", "Bavul", "Valiz", "Küçük Çanta"
          ]
        }
      ]
    },
    {
      id: "electronics",
      name: "Elektronik",
      icon: Smartphone,
      href: "/categories/elektronik",
      subCategories: [
        {
          title: "Telefon & Tablet",
          items: [
            "Akıllı Telefon", "Tablet", "Telefon Aksesuar", "Tablet Aksesuar", 
            "Powerbank", "Şarj Cihazı", "Kulaklık"
          ]
        },
        {
          title: "Bilgisayar",
          items: [
            "Laptop", "Masaüstü", "Monitör", "Klavye", "Mouse", 
            "Webcam", "Hoparlör", "Kulaklık"
          ]
        },
        {
          title: "TV & Ses",
          items: [
            "Televizyon", "Soundbar", "Hoparlör", "Kulaklık", 
            "Müzik Sistemi", "Projeksiyon", "Anten"
          ]
        }
      ]
    },
    {
      id: "sports-outdoor",
      name: "Spor & Outdoor",
      icon: Dumbbell,
      href: "/categories/sports-outdoor",
      subCategories: [
        {
          title: "Spor Giyim",
          items: [
            "Spor Tişört", "Spor Şort", "Eşofman", "Spor Ayakkabı", 
            "Spor Çorap", "Spor Çanta", "Spor Eldiven"
          ]
        },
        {
          title: "Fitness",
          items: [
            "Dambıl", "Halter", "Koşu Bandı", "Bisiklet", 
            "Yoga Matı", "Fitness Topu", "Ağırlık"
          ]
        },
        {
          title: "Outdoor",
          items: [
            "Çadır", "Uyku Tulumu", "Sırt Çantası", "Outdoor Ayakkabı", 
            "Outdoor Giyim", "Kamp Malzemeleri", "Dağcılık"
          ]
        }
      ]
    },
    {
      id: "books-stationery",
      name: "Kitap & Kırtasiye",
      icon: BookOpen,
      href: "/categories/books-stationery",
      subCategories: [
        {
          title: "Kitap",
          items: [
            "Roman", "Bilim Kurgu", "Tarih", "Biyografi", "Çocuk Kitabı", 
            "Eğitim", "Dil Öğrenimi", "Dergi"
          ]
        },
        {
          title: "Kırtasiye",
          items: [
            "Kalem", "Defter", "Çanta", "Silgi", "Cetvel", 
            "Makas", "Yapıştırıcı", "Bant"
          ]
        },
        {
          title: "Ofis",
          items: [
            "Dosya", "Klasör", "Zımba", "Delgeç", "Hesap Makinesi", 
            "Telefon", "Faks", "Yazıcı"
          ]
        }
      ]
    }
  ]
};

// Mega menü veri yapısı
export const megaMenuData: MegaMenuData = {
  "electronics": {
    columns: [
      {
        title: "Telefon & Aksesuar",
        icon: Smartphone,
        items: [
          { id: "smartphone", name: "Akıllı Telefonlar", href: "/categories/elektronik/telefon", isPopular: true },
          { id: "phone-case", name: "Telefon Kılıfları", href: "/categories/elektronik/telefon-kilifi" },
          { id: "screen-protector", name: "Ekran Koruyucu", href: "/categories/elektronik/ekran-koruyucu" },
          { id: "charger", name: "Şarj Cihazları", href: "/categories/elektronik/sarj-cihazi" },
          { id: "cable", name: "Kablolar", href: "/categories/elektronik/kablo" },
          { id: "powerbank", name: "Powerbank", href: "/categories/elektronik/powerbank", isNew: true },
          { id: "headphones", name: "Kulaklık", href: "/categories/elektronik/kulaklik" },
          { id: "speaker", name: "Hoparlör", href: "/categories/elektronik/hoparlor" },
        ]
      },
      {
        title: "Bilgisayar & Tablet",
        icon: Laptop,
        items: [
          { id: "laptop", name: "Laptop", href: "/categories/elektronik/laptop", isPopular: true },
          { id: "desktop", name: "Masaüstü Bilgisayar", href: "/categories/elektronik/masaustu" },
          { id: "tablet", name: "Tablet", href: "/categories/elektronik/tablet" },
          { id: "monitor", name: "Monitör", href: "/categories/elektronik/monitor" },
          { id: "keyboard", name: "Klavye", href: "/categories/elektronik/klavye" },
          { id: "mouse", name: "Mouse", href: "/categories/elektronik/mouse" },
        ]
      },
      {
        title: "TV & Ses Sistemleri",
        icon: Tv,
        items: [
          { id: "tv", name: "Televizyon", href: "/categories/elektronik/tv", isPopular: true },
          { id: "soundbar", name: "Soundbar", href: "/categories/elektronik/soundbar" },
          { id: "speaker", name: "Hoparlör", href: "/categories/elektronik/hoparlor" },
          { id: "headphone", name: "Kulaklık", href: "/categories/elektronik/kulaklik", isNew: true },
          { id: "earphone", name: "Kulak İçi Kulaklık", href: "/categories/elektronik/kulak-ici" },
          { id: "bluetooth", name: "Bluetooth Hoparlör", href: "/categories/elektronik/bluetooth-hoparlor" },
        ]
      },
      {
        title: "Kamera & Fotoğraf",
        icon: Camera,
        items: [
          { id: "camera", name: "Fotoğraf Makinesi", href: "/categories/elektronik/fotograf-makinesi" },
          { id: "action-cam", name: "Aksiyon Kamerası", href: "/categories/elektronik/aksiyon-kamerasi" },
          { id: "lens", name: "Objektif", href: "/categories/elektronik/objektif" },
          { id: "tripod", name: "Tripod", href: "/categories/elektronik/tripod" },
          { id: "memory-card", name: "Hafıza Kartı", href: "/categories/elektronik/hafiza-karti" },
        ]
      },
      {
        title: "Oyun & Eğlence",
        icon: Gamepad2,
        items: [
          { id: "gaming-console", name: "Oyun Konsolu", href: "/categories/elektronik/oyun-konsolu", isPopular: true },
          { id: "gaming-laptop", name: "Gaming Laptop", href: "/categories/elektronik/gaming-laptop" },
          { id: "gaming-mouse", name: "Gaming Mouse", href: "/categories/elektronik/gaming-mouse" },
          { id: "gaming-keyboard", name: "Gaming Klavye", href: "/categories/elektronik/gaming-klavye" },
          { id: "gaming-headset", name: "Gaming Kulaklık", href: "/categories/elektronik/gaming-kulaklik" },
        ]
      }
    ],
    featured: [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 64999,
        originalPrice: 69999,
        discount: 7,
        imageUrl: "https://cdn.hepsiburada.net/s/56/220-220/1102000000000000.jpg",
        rating: 4.8,
        href: "/products/1"
      },
      {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 52999,
        originalPrice: 57999,
        discount: 8,
        imageUrl: "https://cdn.hepsiburada.net/s/55/220-220/1102000000000000.jpg",
        rating: 4.7,
        href: "/products/2"
      },
      {
        id: 3,
        name: "MacBook Pro M3",
        price: 42999,
        originalPrice: 45999,
        discount: 6,
        imageUrl: "https://cdn.hepsiburada.net/s/60/220-220/1102000000000000.jpg",
        rating: 4.9,
        href: "/products/3"
      },
      {
        id: 4,
        name: "Sony WH-1000XM5",
        price: 8999,
        originalPrice: 9999,
        discount: 10,
        imageUrl: "https://cdn.hepsiburada.net/s/58/220-220/1102000000000000.jpg",
        rating: 4.6,
        href: "/products/4"
      }
    ]
  },

  "women": {
    columns: [
      {
        title: "Kadın Giyim",
        icon: Shirt,
        items: [
          { id: "woman-dress", name: "Elbise", href: "/categories/moda/kadin/elbise", isPopular: true },
          { id: "woman-tops", name: "Üst Giyim", href: "/categories/moda/kadin/ust-giyim" },
          { id: "woman-pants", name: "Pantolon", href: "/categories/moda/kadin/pantolon" },
          { id: "woman-jeans", name: "Jean", href: "/categories/moda/kadin/jean" },
          { id: "woman-skirt", name: "Etek", href: "/categories/moda/kadin/etek" },
          { id: "woman-sweater", name: "Kazak", href: "/categories/moda/kadin/kazak" },
          { id: "woman-blouse", name: "Bluz", href: "/categories/moda/kadin/bluz" },
          { id: "woman-jacket", name: "Ceket", href: "/categories/moda/kadin/ceket" },
        ]
      },
      {
        title: "Erkek Giyim",
        icon: Shirt,
        items: [
          { id: "man-shirt", name: "Gömlek", href: "/categories/moda/erkek/gomlek", isPopular: true },
          { id: "man-t-shirt", name: "T-Shirt", href: "/categories/moda/erkek/t-shirt" },
          { id: "man-polo", name: "Polo Yaka", href: "/categories/moda/erkek/polo" },
          { id: "man-jeans", name: "Jean", href: "/categories/moda/erkek/jean" },
          { id: "man-pants", name: "Pantolon", href: "/categories/moda/erkek/pantolon" },
          { id: "man-shorts", name: "Şort", href: "/categories/moda/erkek/sort" },
          { id: "man-sweater", name: "Kazak", href: "/categories/moda/erkek/kazak" },
          { id: "man-jacket", name: "Ceket", href: "/categories/moda/erkek/ceket" },
        ]
      },
      {
        title: "Ayakkabı & Çanta",
        icon: Footprints,
        items: [
          { id: "woman-shoes", name: "Kadın Ayakkabı", href: "/categories/moda/kadin-ayakkabi", isPopular: true },
          { id: "man-shoes", name: "Erkek Ayakkabı", href: "/categories/moda/erkek-ayakkabi" },
          { id: "sneakers", name: "Spor Ayakkabı", href: "/categories/moda/spor-ayakkabi" },
          { id: "boots", name: "Bot", href: "/categories/moda/bot" },
          { id: "sandals", name: "Sandalet", href: "/categories/moda/sandalet" },
          { id: "handbag", name: "El Çantası", href: "/categories/moda/el-cantasi" },
          { id: "backpack", name: "Sırt Çantası", href: "/categories/moda/sirt-cantasi" },
          { id: "wallet", name: "Cüzdan", href: "/categories/moda/cuzdan" },
        ]
      },
      {
        title: "Aksesuar & Saat",
        icon: Watch,
        items: [
          { id: "watch", name: "Saat", href: "/categories/moda/saat", isPopular: true },
          { id: "jewelry", name: "Takı", href: "/categories/moda/taki" },
          { id: "belt", name: "Kemer", href: "/categories/moda/kemer" },
          { id: "tie", name: "Kravat", href: "/categories/moda/kravat" },
          { id: "scarf", name: "Eşarp", href: "/categories/moda/esarp" },
          { id: "gloves", name: "Eldiven", href: "/categories/moda/eldiven" },
          { id: "hat", name: "Şapka", href: "/categories/moda/sapka" },
          { id: "sunglasses", name: "Güneş Gözlüğü", href: "/categories/moda/gunes-gozlugu" },
        ]
      }
    ],
    featured: [
      {
        id: 4,
        name: "Deri Ceket",
        price: 1200,
        originalPrice: 1500,
        discount: 20,
        imageUrl: "https://picsum.photos/200/200?random=jacket",
        rating: 4.5,
        href: "/products/4"
      },
      {
        id: 5,
        name: "Spor Ayakkabı",
        price: 800,
        imageUrl: "https://picsum.photos/200/200?random=sneakers",
        rating: 4.7,
        href: "/products/5"
      },
      {
        id: 6,
        name: "El Çantası",
        price: 600,
        imageUrl: "https://picsum.photos/200/200?random=handbag",
        rating: 4.4,
        href: "/products/6"
      }
    ]
  },

  "home-furniture": {
    columns: [
      {
        title: "Mobilya",
        icon: Sofa,
        items: [
          { id: "sofa", name: "Koltuk Takımı", href: "/categories/ev-yasam/koltuk", isPopular: true },
          { id: "dining-table", name: "Yemek Masası", href: "/categories/ev-yasam/yemek-masasi" },
          { id: "bed", name: "Yatak", href: "/categories/ev-yasam/yatak" },
          { id: "wardrobe", name: "Gardırop", href: "/categories/ev-yasam/gardrop" },
          { id: "desk", name: "Çalışma Masası", href: "/categories/ev-yasam/calisma-masasi" },
          { id: "chair", name: "Sandalye", href: "/categories/ev-yasam/sandalye" },
          { id: "bookshelf", name: "Kitaplık", href: "/categories/ev-yasam/kitaplik" },
          { id: "tv-unit", name: "TV Ünitesi", href: "/categories/ev-yasam/tv-unitesi" },
        ]
      },
      {
        title: "Ev Tekstili",
        icon: Home,
        items: [
          { id: "bedding", name: "Yatak Takımı", href: "/categories/ev-yasam/yatak-takimi", isPopular: true },
          { id: "curtain", name: "Perde", href: "/categories/ev-yasam/perde" },
          { id: "carpet", name: "Halı", href: "/categories/ev-yasam/hali" },
          { id: "pillow", name: "Yastık", href: "/categories/ev-yasam/yastik" },
          { id: "blanket", name: "Battaniye", href: "/categories/ev-yasam/battaniye" },
          { id: "towel", name: "Havlu", href: "/categories/ev-yasam/havlu" },
          { id: "tablecloth", name: "Masa Örtüsü", href: "/categories/ev-yasam/masa-ortusu" },
        ]
      },
      {
        title: "Mutfak & Yemek",
        icon: Utensils,
        items: [
          { id: "kitchen-appliance", name: "Mutfak Aletleri", href: "/categories/ev-yasam/mutfak-aletleri", isPopular: true },
          { id: "cookware", name: "Tencere & Tava", href: "/categories/ev-yasam/tencere-tava" },
          { id: "dinnerware", name: "Sofra Takımı", href: "/categories/ev-yasam/sofra-takimi" },
          { id: "glass", name: "Bardak & Kupa", href: "/categories/ev-yasam/bardak-kupa" },
          { id: "cutlery", name: "Çatal & Kaşık", href: "/categories/ev-yasam/catal-kasik" },
          { id: "storage", name: "Saklama Kabı", href: "/categories/ev-yasam/saklama-kabi" },
        ]
      },
      {
        title: "Dekorasyon",
        icon: Palette,
        items: [
          { id: "wall-art", name: "Duvar Sanatı", href: "/categories/ev-yasam/duvar-sanati" },
          { id: "vase", name: "Vazo", href: "/categories/ev-yasam/vazo" },
          { id: "candle", name: "Mum", href: "/categories/ev-yasam/mum" },
          { id: "plant", name: "Süs Bitkisi", href: "/categories/ev-yasam/sus-bitkisi" },
          { id: "mirror", name: "Ayna", href: "/categories/ev-yasam/ayna" },
          { id: "clock", name: "Saat", href: "/categories/ev-yasam/saat" },
        ]
      }
    ],
    featured: [
      {
        id: 7,
        name: "Modern Koltuk Takımı",
        price: 8500,
        originalPrice: 10000,
        discount: 15,
        imageUrl: "https://picsum.photos/200/200?random=sofa",
        rating: 4.6,
        href: "/products/7"
      },
      {
        id: 8,
        name: "Yatak Takımı",
        price: 450,
        imageUrl: "https://picsum.photos/200/200?random=bedding",
        rating: 4.3,
        href: "/products/8"
      },
      {
        id: 9,
        name: "Mutfak Robotu",
        price: 1200,
        imageUrl: "https://picsum.photos/200/200?random=kitchen",
        rating: 4.8,
        href: "/products/9"
      }
    ]
  },

  "sports-outdoor": {
    columns: [
      {
        title: "Fitness & Spor",
        icon: Dumbbell,
        items: [
          { id: "fitness-equipment", name: "Fitness Ekipmanları", href: "/categories/spor/fitness", isPopular: true },
          { id: "gym-equipment", name: "Spor Aletleri", href: "/categories/spor/spor-aletleri" },
          { id: "yoga", name: "Yoga & Pilates", href: "/categories/spor/yoga" },
          { id: "cardio", name: "Kardiyo Ekipmanları", href: "/categories/spor/kardiyo" },
          { id: "strength", name: "Güç Ekipmanları", href: "/categories/spor/guc-ekipmanlari" },
        ]
      },
      {
        title: "Outdoor & Kamp",
        icon: Car,
        items: [
          { id: "camping", name: "Kamp Malzemeleri", href: "/categories/spor/kamp", isPopular: true },
          { id: "hiking", name: "Doğa Yürüyüşü", href: "/categories/spor/doga-yuruyusu" },
          { id: "climbing", name: "Tırmanış", href: "/categories/spor/tirmanis" },
          { id: "fishing", name: "Balık Tutma", href: "/categories/spor/balik-tutma" },
          { id: "cycling", name: "Bisiklet", href: "/categories/spor/bisiklet" },
        ]
      },
      {
        title: "Spor Giyim",
        icon: Shirt,
        items: [
          { id: "sportswear", name: "Spor Giyim", href: "/categories/spor/spor-giyim", isPopular: true },
          { id: "running", name: "Koşu Giyimi", href: "/categories/spor/kosu-giyimi" },
          { id: "football", name: "Futbol Giyimi", href: "/categories/spor/futbol-giyimi" },
          { id: "basketball", name: "Basketbol Giyimi", href: "/categories/spor/basketbol-giyimi" },
          { id: "swimming", name: "Yüzme Giyimi", href: "/categories/spor/yuzme-giyimi" },
        ]
      }
    ],
    featured: [
      {
        id: 10,
        name: "Koşu Ayakkabısı",
        price: 1200,
        imageUrl: "https://picsum.photos/200/200?random=running-shoes",
        rating: 4.7,
        href: "/products/10"
      },
      {
        id: 11,
        name: "Kamp Çadırı",
        price: 800,
        imageUrl: "https://picsum.photos/200/200?random=tent",
        rating: 4.5,
        href: "/products/11"
      },
      {
        id: 12,
        name: "Fitness Seti",
        price: 500,
        imageUrl: "https://picsum.photos/200/200?random=fitness",
        rating: 4.4,
        href: "/products/12"
      }
    ]
  },

  "baby-kids": {
    columns: [
      {
        title: "Bebek Giyim",
        icon: Baby,
        items: [
          { id: "baby-clothes", name: "Bebek Giyim", href: "/categories/anne-bebek/bebek-giyim", isPopular: true },
          { id: "baby-shoes", name: "Bebek Ayakkabısı", href: "/categories/anne-bebek/bebek-ayakkabisi" },
          { id: "baby-accessories", name: "Bebek Aksesuarları", href: "/categories/anne-bebek/bebek-aksesuarlari" },
        ]
      },
      {
        title: "Bebek Bakımı",
        icon: Heart,
        items: [
          { id: "baby-care", name: "Bebek Bakım Ürünleri", href: "/categories/anne-bebek/bebek-bakim", isPopular: true },
          { id: "diapers", name: "Bebek Bezi", href: "/categories/anne-bebek/bebek-bezi" },
          { id: "baby-food", name: "Bebek Maması", href: "/categories/anne-bebek/bebek-mamasi" },
          { id: "baby-bottles", name: "Biberon", href: "/categories/anne-bebek/biberon" },
        ]
      },
      {
        title: "Oyuncak & Oyun",
        icon: Gamepad2,
        items: [
          { id: "toys", name: "Oyuncaklar", href: "/categories/anne-bebek/oyuncaklar", isPopular: true },
          { id: "educational-toys", name: "Eğitici Oyuncaklar", href: "/categories/anne-bebek/egitici-oyuncaklar" },
          { id: "outdoor-toys", name: "Bahçe Oyuncakları", href: "/categories/anne-bebek/bahce-oyuncaklari" },
        ]
      }
    ],
    featured: [
      {
        id: 13,
        name: "Bebek Bezi",
        price: 150,
        imageUrl: "https://picsum.photos/200/200?random=baby-diaper",
        rating: 4.6,
        href: "/products/13"
      },
      {
        id: 14,
        name: "Bebek Arabası",
        price: 2500,
        imageUrl: "https://picsum.photos/200/200?random=baby-stroller",
        rating: 4.8,
        href: "/products/14"
      },
      {
        id: 15,
        name: "Eğitici Oyuncak",
        price: 200,
        imageUrl: "https://picsum.photos/200/200?random=educational-toy",
        rating: 4.5,
        href: "/products/15"
      }
    ]
  },

  "cosmetics": {
    columns: [
      {
        title: "Makyaj",
        icon: Palette,
        items: [
          { id: "makeup", name: "Makyaj Ürünleri", href: "/categories/kozmetik/makyaj", isPopular: true },
          { id: "lipstick", name: "Ruj", href: "/categories/kozmetik/ruj" },
          { id: "foundation", name: "Fondöten", href: "/categories/kozmetik/fondoten" },
          { id: "eyeshadow", name: "Göz Farı", href: "/categories/kozmetik/goz-fari" },
          { id: "mascara", name: "Maskara", href: "/categories/kozmetik/maskara" },
        ]
      },
      {
        title: "Cilt Bakımı",
        icon: Heart,
        items: [
          { id: "skincare", name: "Cilt Bakımı", href: "/categories/kozmetik/cilt-bakimi", isPopular: true },
          { id: "cleanser", name: "Temizleyici", href: "/categories/kozmetik/temizleyici" },
          { id: "moisturizer", name: "Nemlendirici", href: "/categories/kozmetik/nemlendirici" },
          { id: "serum", name: "Serum", href: "/categories/kozmetik/serum" },
        ]
      },
      {
        title: "Parfüm & Deodorant",
        icon: Heart,
        items: [
          { id: "perfume", name: "Parfüm", href: "/categories/kozmetik/parfum", isPopular: true },
          { id: "deodorant", name: "Deodorant", href: "/categories/kozmetik/deodorant" },
          { id: "body-spray", name: "Vücut Spreyi", href: "/categories/kozmetik/vucut-spreyi" },
        ]
      }
    ],
    featured: [
      {
        id: 16,
        name: "Premium Parfüm",
        price: 800,
        imageUrl: "https://picsum.photos/200/200?random=perfume",
        rating: 4.9,
        href: "/products/16"
      },
      {
        id: 17,
        name: "Cilt Bakım Seti",
        price: 450,
        imageUrl: "https://picsum.photos/200/200?random=skincare",
        rating: 4.7,
        href: "/products/17"
      },
      {
        id: 18,
        name: "Makyaj Seti",
        price: 300,
        imageUrl: "https://picsum.photos/200/200?random=makeup",
        rating: 4.5,
        href: "/products/18"
      }
    ]
  },

  "books-stationery": {
    columns: [
      {
        title: "Kitaplar",
        icon: BookOpen,
        items: [
          { id: "books", name: "Kitaplar", href: "/categories/kitap/kitaplar", isPopular: true },
          { id: "fiction", name: "Kurgu", href: "/categories/kitap/kurgu" },
          { id: "non-fiction", name: "Kurgu Dışı", href: "/categories/kitap/kurgu-disi" },
          { id: "children-books", name: "Çocuk Kitapları", href: "/categories/kitap/cocuk-kitaplari" },
          { id: "academic", name: "Akademik", href: "/categories/kitap/akademik" },
        ]
      },
      {
        title: "Müzik & Film",
        icon: Music,
        items: [
          { id: "music", name: "Müzik", href: "/categories/kitap/muzik", isPopular: true },
          { id: "cd", name: "CD", href: "/categories/kitap/cd" },
          { id: "vinyl", name: "Vinil", href: "/categories/kitap/vinil" },
          { id: "movies", name: "Film", href: "/categories/kitap/film" },
        ]
      },
      {
        title: "Kırtasiye",
        icon: Briefcase,
        items: [
          { id: "stationery", name: "Kırtasiye", href: "/categories/kitap/kirtasiye", isPopular: true },
          { id: "notebook", name: "Defter", href: "/categories/kitap/defter" },
          { id: "pen", name: "Kalem", href: "/categories/kitap/kalem" },
          { id: "art-supplies", name: "Sanat Malzemeleri", href: "/categories/kitap/sanat-malzemeleri" },
        ]
      }
    ],
    featured: [
      {
        id: 19,
        name: "Bestseller Kitap",
        price: 50,
        imageUrl: "https://picsum.photos/200/200?random=book",
        rating: 4.8,
        href: "/products/19"
      },
      {
        id: 20,
        name: "Müzik CD'si",
        price: 25,
        imageUrl: "https://picsum.photos/200/200?random=cd",
        rating: 4.6,
        href: "/products/20"
      },
      {
        id: 21,
        name: "Kırtasiye Seti",
        price: 80,
        imageUrl: "https://picsum.photos/200/200?random=stationery",
        rating: 4.4,
        href: "/products/21"
      }
    ]
  },

  "supermarket": {
    columns: [
      {
        title: "Araç Aksesuarları",
        icon: Car,
        items: [
          { id: "car-accessories", name: "Araç Aksesuarları", href: "/categories/oto/arac-aksesuarlari", isPopular: true },
          { id: "car-care", name: "Araç Bakımı", href: "/categories/oto/arac-bakimi" },
          { id: "car-electronics", name: "Araç Elektroniği", href: "/categories/oto/arac-elektronigi" },
          { id: "car-interior", name: "Araç İçi", href: "/categories/oto/arac-ici" },
        ]
      },
      {
        title: "Bahçe & Outdoor",
        icon: Wrench,
        items: [
          { id: "garden-tools", name: "Bahçe Aletleri", href: "/categories/oto/bahce-aletleri", isPopular: true },
          { id: "garden-furniture", name: "Bahçe Mobilyası", href: "/categories/oto/bahce-mobilyasi" },
          { id: "plants", name: "Bitki & Tohum", href: "/categories/oto/bitki-tohum" },
          { id: "garden-decor", name: "Bahçe Dekorasyonu", href: "/categories/oto/bahce-dekorasyonu" },
        ]
      }
    ],
    featured: [
      {
        id: 22,
        name: "Araç Temizlik Seti",
        price: 150,
        imageUrl: "https://picsum.photos/200/200?random=car-care",
        rating: 4.5,
        href: "/products/22"
      },
      {
        id: 23,
        name: "Bahçe Aletleri Seti",
        price: 300,
        imageUrl: "https://picsum.photos/200/200?random=garden-tools",
        rating: 4.3,
        href: "/products/23"
      },
      {
        id: 24,
        name: "Bahçe Mobilyası",
        price: 1200,
        imageUrl: "https://picsum.photos/200/200?random=garden-furniture",
        rating: 4.6,
        href: "/products/24"
      }
    ]
  }
};

// Kategori ikonları mapping
export const categoryIcons: { [key: string]: any } = {
  "Elektronik": Smartphone,
  "Moda": Shirt,
  "Ev & Yaşam": Home,
  "Spor & Outdoor": Dumbbell,
  "Anne & Bebek": Baby,
  "Kozmetik & Bakım": Heart,
  "Kitap & Müzik": BookOpen,
  "Oto & Bahçe": Car,
};

// Popüler kategoriler
export const popularCategories = [
  { name: "electronics", href: "/categories/electronics", icon: Smartphone },
  { name: "women", href: "/categories/women", icon: Shirt },
  { name: "home-furniture", href: "/categories/home-furniture", icon: Home },
  { name: "sports-outdoor", href: "/categories/sports-outdoor", icon: Dumbbell },
  { name: "baby-kids", href: "/categories/baby-kids", icon: Baby },
  { name: "cosmetics", href: "/categories/cosmetics", icon: Heart },
];

// Mega menü yardımcı fonksiyonları
export const getMegaMenuData = (categoryName: string): MegaMenuCategory | null => {
  return megaMenuData[categoryName] || null;
};

export const getCategoryIcon = (categoryName: string) => {
  return categoryIcons[categoryName] || Home;
};

export const getPopularCategories = () => {
  return popularCategories;
};

export const searchMegaMenuItems = (searchTerm: string): MegaMenuItem[] => {
  const results: MegaMenuItem[] = [];
  
  Object.values(megaMenuData).forEach(category => {
    category.columns.forEach(column => {
      column.items.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(item);
        }
      });
    });
  });
  
  return results.slice(0, 10); // İlk 10 sonucu döndür
};
