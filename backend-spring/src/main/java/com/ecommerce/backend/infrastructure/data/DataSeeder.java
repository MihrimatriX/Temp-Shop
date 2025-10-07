package com.ecommerce.backend.infrastructure.data;

import com.ecommerce.backend.domain.entity.Category;
import com.ecommerce.backend.domain.entity.Product;
import com.ecommerce.backend.domain.entity.Campaign;
import com.ecommerce.backend.infrastructure.repository.CategoryRepository;
import com.ecommerce.backend.infrastructure.repository.ProductRepository;
import com.ecommerce.backend.infrastructure.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CampaignRepository campaignRepository;
    
    private final Random random = new Random();
    
    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            seedCategories();
        }
        if (productRepository.count() == 0) {
            seedProducts();
        }
        if (campaignRepository.count() == 0) {
            seedCampaigns();
        }
    }
    
    private void seedCategories() {
        List<Category> categories = Arrays.asList(
            new Category("Elektronik", "Elektronik ürünler ve aksesuarlar", "https://picsum.photos/200/200?random=1"),
            new Category("Giyim", "Kadın, erkek ve çocuk giyim ürünleri", "https://picsum.photos/200/200?random=2"),
            new Category("Ev & Yaşam", "Ev dekorasyonu ve yaşam ürünleri", "https://picsum.photos/200/200?random=3"),
            new Category("Spor", "Spor malzemeleri ve fitness ürünleri", "https://picsum.photos/200/200?random=4"),
            new Category("Kitap", "Kitap, dergi ve eğitim materyalleri", "https://picsum.photos/200/200?random=5"),
            new Category("Kozmetik", "Güzellik ve kişisel bakım ürünleri", "https://picsum.photos/200/200?random=6"),
            new Category("Otomotiv", "Araç aksesuarları ve yedek parçalar", "https://picsum.photos/200/200?random=7"),
            new Category("Oyuncak", "Çocuk oyuncakları ve eğitici materyaller", "https://picsum.photos/200/200?random=8"),
            new Category("Müzik", "Müzik aletleri ve aksesuarları", "https://picsum.photos/200/200?random=9"),
            new Category("Bahçe", "Bahçe malzemeleri ve bitki bakımı", "https://picsum.photos/200/200?random=10"),
            new Category("Ofis", "Ofis malzemeleri ve kırtasiye", "https://picsum.photos/200/200?random=11"),
            new Category("Seyahat", "Seyahat aksesuarları ve valiz", "https://picsum.photos/200/200?random=12"),
            new Category("Sağlık", "Sağlık ürünleri ve medikal malzemeler", "https://picsum.photos/200/200?random=13"),
            new Category("Pet Shop", "Evcil hayvan ürünleri", "https://picsum.photos/200/200?random=14"),
            new Category("Hobi", "Hobi malzemeleri ve el sanatları", "https://picsum.photos/200/200?random=15")
        );
        
        categoryRepository.saveAll(categories);
    }
    
    private void seedProducts() {
        List<Category> categories = categoryRepository.findAll();
        
        // Elektronik ürünleri
        List<String> electronics = Arrays.asList(
            "iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "MacBook Pro M3", "Dell XPS 13", "iPad Air",
            "Sony WH-1000XM5", "AirPods Pro", "Samsung 4K TV", "PlayStation 5", "Xbox Series X",
            "Nintendo Switch", "Canon EOS R5", "Sony A7 IV", "DJI Mavic 3", "Apple Watch Series 9",
            "Samsung Galaxy Watch", "Fitbit Versa 4", "Garmin Fenix 7", "GoPro Hero 12", "Insta360 X3"
        );
        
        // Giyim ürünleri
        List<String> clothing = Arrays.asList(
            "Nike Air Max 270", "Adidas Ultraboost 22", "Levi's 501 Jeans", "Zara Blazer", "H&M T-Shirt",
            "Uniqlo Hoodie", "Converse Chuck Taylor", "Vans Old Skool", "Puma Suede", "New Balance 574",
            "Tommy Hilfiger Polo", "Calvin Klein Underwear", "Champion Sweatshirt", "The North Face Jacket",
            "Columbia Hiking Boots", "Timberland Boots", "Ray-Ban Sunglasses", "Oakley Glasses", "Gucci Belt",
            "Louis Vuitton Bag"
        );
        
        // Ev & Yaşam ürünleri
        List<String> home = Arrays.asList(
            "IKEA Sofa", "Zara Home Bedding", "West Elm Coffee Table", "Crate & Barrel Dining Set",
            "Pottery Barn Lamp", "Anthropologie Mirror", "Urban Outfitters Rug", "CB2 Vase",
            "Design Within Reach Chair", "Restoration Hardware Pillow", "Williams Sonoma Cookware",
            "Le Creuset Dutch Oven", "KitchenAid Mixer", "Vitamix Blender", "Breville Espresso Machine",
            "Dyson Vacuum", "Shark Steam Mop", "Roomba Robot Vacuum", "Philips Hue Bulbs", "Nest Thermostat"
        );
        
        // Spor ürünleri
        List<String> sports = Arrays.asList(
            "Nike Basketball", "Adidas Football", "Wilson Tennis Racket", "Callaway Golf Clubs",
            "Under Armour Compression Shirt", "Lululemon Yoga Mat", "Peloton Bike", "Bowflex Dumbbells",
            "TRX Suspension Trainer", "Rogue Barbell", "Concept2 Rowing Machine", "NordicTrack Treadmill",
            "Garmin GPS Watch", "Polar Heart Rate Monitor", "Suunto Compass", "Black Diamond Headlamp",
            "Patagonia Backpack", "Arc'teryx Jacket", "Merrell Hiking Shoes", "Salomon Trail Running Shoes"
        );
        
        // Kitap ürünleri
        List<String> books = Arrays.asList(
            "The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Catcher in the Rye",
            "Lord of the Flies", "The Hobbit", "Harry Potter Series", "The Chronicles of Narnia", "Dune",
            "Foundation Series", "The Martian", "Ready Player One", "The Handmaid's Tale", "Brave New World",
            "Fahrenheit 451", "Animal Farm", "The Lord of the Rings", "Game of Thrones", "The Witcher"
        );
        
        // Kozmetik ürünleri
        List<String> cosmetics = Arrays.asList(
            "MAC Lipstick", "NARS Foundation", "Urban Decay Eyeshadow", "Too Faced Mascara", "Fenty Beauty Highlighter",
            "Glossier Cloud Paint", "Charlotte Tilbury Blush", "Pat McGrath Lipstick", "Huda Beauty Palette",
            "Anastasia Brow Wiz", "Benefit Mascara", "Tarte Concealer", "IT Cosmetics CC Cream", "BareMinerals Powder",
            "Clinique Moisturizer", "Estée Lauder Serum", "Lancôme Eye Cream", "Dior Perfume", "Chanel No. 5",
            "Tom Ford Fragrance"
        );
        
        // Tüm ürün listesi
        List<List<String>> allProducts = Arrays.asList(electronics, clothing, home, sports, books, cosmetics);
        
        for (int i = 0; i < allProducts.size() && i < categories.size(); i++) {
            Category category = categories.get(i);
            List<String> productNames = allProducts.get(i);
            
            for (String productName : productNames) {
                Product product = new Product();
                product.setProductName(productName);
                product.setUnitPrice(generateRandomPrice());
                product.setUnitInStock(random.nextInt(100) + 1);
                product.setQuantityPerUnit("1 adet");
                product.setCategory(category);
                product.setDescription(generateDescription(productName));
                product.setImageUrl("https://picsum.photos/400/400?random=" + (random.nextInt(1000) + 1));
                product.setDiscount(random.nextInt(50)); // 0-49% indirim
                product.setIsActive(true);
                
                productRepository.save(product);
            }
        }
        
        // Ek ürünler ekle (her kategoriden 20'şer tane daha)
        for (Category category : categories) {
            for (int i = 0; i < 20; i++) {
                Product product = new Product();
                product.setProductName(category.getCategoryName() + " Ürün " + (i + 1));
                product.setUnitPrice(generateRandomPrice());
                product.setUnitInStock(random.nextInt(100) + 1);
                product.setQuantityPerUnit("1 adet");
                product.setCategory(category);
                product.setDescription("Yüksek kaliteli " + category.getCategoryName().toLowerCase() + " ürünü");
                product.setImageUrl("https://picsum.photos/400/400?random=" + (random.nextInt(1000) + 1));
                product.setDiscount(random.nextInt(50));
                product.setIsActive(true);
                
                productRepository.save(product);
            }
        }
    }
    
    private void seedCampaigns() {
        List<Campaign> campaigns = Arrays.asList(
            new Campaign(
                "Büyük İndirim Fırsatı",
                "Tüm ürünlerde %50'ye varan indirimler",
                "Sınırlı süre için tüm kategorilerde büyük indirimler. Kaçırma!",
                50,
                "https://picsum.photos/800/400?random=1001",
                "#FF6B6B",
                "3 gün kaldı",
                "Alışverişe Başla",
                "/products",
                LocalDateTime.now().minusDays(1),
                LocalDateTime.now().plusDays(3)
            ),
            new Campaign(
                "Elektronik Günleri",
                "Teknoloji ürünlerinde özel fiyatlar",
                "Telefon, laptop, tablet ve aksesuarlarda özel kampanya fiyatları",
                30,
                "https://picsum.photos/800/400?random=1002",
                "#4ECDC4",
                "1 hafta kaldı",
                "Elektronik Ürünleri Gör",
                "/categories/1",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(7)
            ),
            new Campaign(
                "Yaz Koleksiyonu",
                "Yeni sezon giyim ürünleri",
                "Yaz ayları için hazırlanan yeni koleksiyon ürünleri",
                25,
                "https://picsum.photos/800/400?random=1003",
                "#45B7D1",
                "2 hafta kaldı",
                "Koleksiyonu İncele",
                "/categories/2",
                LocalDateTime.now().minusDays(2),
                LocalDateTime.now().plusDays(12)
            ),
            new Campaign(
                "Ev Dekorasyonu",
                "Evinizi yenileyin",
                "Ev dekorasyonu ve yaşam ürünlerinde özel indirimler",
                40,
                "https://picsum.photos/800/400?random=1004",
                "#96CEB4",
                "5 gün kaldı",
                "Ev Ürünlerini Gör",
                "/categories/3",
                LocalDateTime.now().minusDays(1),
                LocalDateTime.now().plusDays(4)
            ),
            new Campaign(
                "Spor Malzemeleri",
                "Sağlıklı yaşam için",
                "Fitness ve spor malzemelerinde büyük indirimler",
                35,
                "https://picsum.photos/800/400?random=1005",
                "#FFEAA7",
                "1 hafta kaldı",
                "Spor Ürünleri",
                "/categories/4",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(7)
            )
        );
        
        campaignRepository.saveAll(campaigns);
    }
    
    private BigDecimal generateRandomPrice() {
        double price = 10 + (random.nextDouble() * 990); // 10-1000 TL arası
        return BigDecimal.valueOf(Math.round(price * 100.0) / 100.0);
    }
    
    private String generateDescription(String productName) {
        List<String> descriptions = Arrays.asList(
            "Yüksek kaliteli ve dayanıklı ürün",
            "Modern tasarım ve kullanıcı dostu",
            "Profesyonel kalite standartlarında",
            "Uzun ömürlü ve güvenilir",
            "İnovatif teknoloji ile üretilmiş",
            "Çevre dostu malzemelerden yapılmış",
            "Kolay kullanım ve bakım",
            "Premium kalite ve performans",
            "Trend tasarım ve stil",
            "Müşteri memnuniyeti odaklı"
        );
        
        return descriptions.get(random.nextInt(descriptions.size())) + " " + productName.toLowerCase() + ".";
    }
}
