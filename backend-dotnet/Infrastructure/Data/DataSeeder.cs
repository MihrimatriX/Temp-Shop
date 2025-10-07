using EcommerceBackend.Domain.Entities;
using EcommerceBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Infrastructure.Data
{
    public class DataSeeder
    {
        private readonly ApplicationDbContext _context;
        private readonly Random _random = new();

        public DataSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            if (!await _context.Categories.AnyAsync())
            {
                await SeedCategoriesAsync();
            }

            if (!await _context.Products.AnyAsync())
            {
                await SeedProductsAsync();
            }

            if (!await _context.Campaigns.AnyAsync())
            {
                await SeedCampaignsAsync();
            }
        }

        private async Task SeedCategoriesAsync()
        {
            var categories = new List<Category>
            {
                new() { CategoryName = "Elektronik", Description = "Elektronik ürünler ve aksesuarlar", ImageUrl = "https://picsum.photos/200/200?random=1" },
                new() { CategoryName = "Giyim", Description = "Kadın, erkek ve çocuk giyim ürünleri", ImageUrl = "https://picsum.photos/200/200?random=2" },
                new() { CategoryName = "Ev & Yaşam", Description = "Ev dekorasyonu ve yaşam ürünleri", ImageUrl = "https://picsum.photos/200/200?random=3" },
                new() { CategoryName = "Spor", Description = "Spor malzemeleri ve fitness ürünleri", ImageUrl = "https://picsum.photos/200/200?random=4" },
                new() { CategoryName = "Kitap", Description = "Kitap, dergi ve eğitim materyalleri", ImageUrl = "https://picsum.photos/200/200?random=5" },
                new() { CategoryName = "Kozmetik", Description = "Güzellik ve kişisel bakım ürünleri", ImageUrl = "https://picsum.photos/200/200?random=6" },
                new() { CategoryName = "Otomotiv", Description = "Araç aksesuarları ve yedek parçalar", ImageUrl = "https://picsum.photos/200/200?random=7" },
                new() { CategoryName = "Oyuncak", Description = "Çocuk oyuncakları ve eğitici materyaller", ImageUrl = "https://picsum.photos/200/200?random=8" },
                new() { CategoryName = "Müzik", Description = "Müzik aletleri ve aksesuarları", ImageUrl = "https://picsum.photos/200/200?random=9" },
                new() { CategoryName = "Bahçe", Description = "Bahçe malzemeleri ve bitki bakımı", ImageUrl = "https://picsum.photos/200/200?random=10" },
                new() { CategoryName = "Ofis", Description = "Ofis malzemeleri ve kırtasiye", ImageUrl = "https://picsum.photos/200/200?random=11" },
                new() { CategoryName = "Seyahat", Description = "Seyahat aksesuarları ve valiz", ImageUrl = "https://picsum.photos/200/200?random=12" },
                new() { CategoryName = "Sağlık", Description = "Sağlık ürünleri ve medikal malzemeler", ImageUrl = "https://picsum.photos/200/200?random=13" },
                new() { CategoryName = "Pet Shop", Description = "Evcil hayvan ürünleri", ImageUrl = "https://picsum.photos/200/200?random=14" },
                new() { CategoryName = "Hobi", Description = "Hobi malzemeleri ve el sanatları", ImageUrl = "https://picsum.photos/200/200?random=15" }
            };

            await _context.Categories.AddRangeAsync(categories);
            await _context.SaveChangesAsync();
        }

        private async Task SeedProductsAsync()
        {
            var categories = await _context.Categories.ToListAsync();
            var products = new List<Product>();

            // Elektronik ürünleri
            var electronics = new[]
            {
                "iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "MacBook Pro M3", "Dell XPS 13", "iPad Air",
                "Sony WH-1000XM5", "AirPods Pro", "Samsung 4K TV", "PlayStation 5", "Xbox Series X",
                "Nintendo Switch", "Canon EOS R5", "Sony A7 IV", "DJI Mavic 3", "Apple Watch Series 9",
                "Samsung Galaxy Watch", "Fitbit Versa 4", "Garmin Fenix 7", "GoPro Hero 12", "Insta360 X3"
            };

            // Giyim ürünleri
            var clothing = new[]
            {
                "Nike Air Max 270", "Adidas Ultraboost 22", "Levi's 501 Jeans", "Zara Blazer", "H&M T-Shirt",
                "Uniqlo Hoodie", "Converse Chuck Taylor", "Vans Old Skool", "Puma Suede", "New Balance 574",
                "Tommy Hilfiger Polo", "Calvin Klein Underwear", "Champion Sweatshirt", "The North Face Jacket",
                "Columbia Hiking Boots", "Timberland Boots", "Ray-Ban Sunglasses", "Oakley Glasses", "Gucci Belt",
                "Louis Vuitton Bag"
            };

            // Ev & Yaşam ürünleri
            var home = new[]
            {
                "IKEA Sofa", "Zara Home Bedding", "West Elm Coffee Table", "Crate & Barrel Dining Set",
                "Pottery Barn Lamp", "Anthropologie Mirror", "Urban Outfitters Rug", "CB2 Vase",
                "Design Within Reach Chair", "Restoration Hardware Pillow", "Williams Sonoma Cookware",
                "Le Creuset Dutch Oven", "KitchenAid Mixer", "Vitamix Blender", "Breville Espresso Machine",
                "Dyson Vacuum", "Shark Steam Mop", "Roomba Robot Vacuum", "Philips Hue Bulbs", "Nest Thermostat"
            };

            // Spor ürünleri
            var sports = new[]
            {
                "Nike Basketball", "Adidas Football", "Wilson Tennis Racket", "Callaway Golf Clubs",
                "Under Armour Compression Shirt", "Lululemon Yoga Mat", "Peloton Bike", "Bowflex Dumbbells",
                "TRX Suspension Trainer", "Rogue Barbell", "Concept2 Rowing Machine", "NordicTrack Treadmill",
                "Garmin GPS Watch", "Polar Heart Rate Monitor", "Suunto Compass", "Black Diamond Headlamp",
                "Patagonia Backpack", "Arc'teryx Jacket", "Merrell Hiking Shoes", "Salomon Trail Running Shoes"
            };

            // Kitap ürünleri
            var books = new[]
            {
                "The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Catcher in the Rye",
                "Lord of the Flies", "The Hobbit", "Harry Potter Series", "The Chronicles of Narnia", "Dune",
                "Foundation Series", "The Martian", "Ready Player One", "The Handmaid's Tale", "Brave New World",
                "Fahrenheit 451", "Animal Farm", "The Lord of the Rings", "Game of Thrones", "The Witcher"
            };

            // Kozmetik ürünleri
            var cosmetics = new[]
            {
                "MAC Lipstick", "NARS Foundation", "Urban Decay Eyeshadow", "Too Faced Mascara", "Fenty Beauty Highlighter",
                "Glossier Cloud Paint", "Charlotte Tilbury Blush", "Pat McGrath Lipstick", "Huda Beauty Palette",
                "Anastasia Brow Wiz", "Benefit Mascara", "Tarte Concealer", "IT Cosmetics CC Cream", "BareMinerals Powder",
                "Clinique Moisturizer", "Estée Lauder Serum", "Lancôme Eye Cream", "Dior Perfume", "Chanel No. 5",
                "Tom Ford Fragrance"
            };

            var allProducts = new[] { electronics, clothing, home, sports, books, cosmetics };

            for (int i = 0; i < allProducts.Length && i < categories.Count; i++)
            {
                var category = categories[i];
                var productNames = allProducts[i];

                foreach (var productName in productNames)
                {
                    products.Add(new Product
                    {
                        ProductName = productName,
                        UnitPrice = GenerateRandomPrice(),
                        UnitInStock = _random.Next(1, 101),
                        QuantityPerUnit = "1 adet",
                        CategoryId = category.Id,
                        Description = GenerateDescription(productName),
                        ImageUrl = $"https://picsum.photos/400/400?random={_random.Next(1, 1001)}",
                        Discount = _random.Next(0, 50),
                        IsActive = true
                    });
                }
            }

            // Her kategoriden ek ürünler ekle
            foreach (var category in categories)
            {
                for (int i = 0; i < 20; i++)
                {
                    products.Add(new Product
                    {
                        ProductName = $"{category.CategoryName} Ürün {i + 1}",
                        UnitPrice = GenerateRandomPrice(),
                        UnitInStock = _random.Next(1, 101),
                        QuantityPerUnit = "1 adet",
                        CategoryId = category.Id,
                        Description = $"Yüksek kaliteli {category.CategoryName.ToLower()} ürünü",
                        ImageUrl = $"https://picsum.photos/400/400?random={_random.Next(1, 1001)}",
                        Discount = _random.Next(0, 50),
                        IsActive = true
                    });
                }
            }

            await _context.Products.AddRangeAsync(products);
            await _context.SaveChangesAsync();
        }

        private async Task SeedCampaignsAsync()
        {
            var campaigns = new List<Campaign>
            {
                new()
                {
                    Title = "Büyük İndirim Fırsatı",
                    Subtitle = "Tüm ürünlerde %50'ye varan indirimler",
                    Description = "Sınırlı süre için tüm kategorilerde büyük indirimler. Kaçırma!",
                    Discount = 50,
                    ImageUrl = "https://picsum.photos/800/400?random=1001",
                    BackgroundColor = "#FF6B6B",
                    TimeLeft = "3 gün kaldı",
                    ButtonText = "Alışverişe Başla",
                    ButtonHref = "/products",
                    StartDate = DateTime.UtcNow.AddDays(-1),
                    EndDate = DateTime.UtcNow.AddDays(3),
                    IsActive = true
                },
                new()
                {
                    Title = "Elektronik Günleri",
                    Subtitle = "Teknoloji ürünlerinde özel fiyatlar",
                    Description = "Telefon, laptop, tablet ve aksesuarlarda özel kampanya fiyatları",
                    Discount = 30,
                    ImageUrl = "https://picsum.photos/800/400?random=1002",
                    BackgroundColor = "#4ECDC4",
                    TimeLeft = "1 hafta kaldı",
                    ButtonText = "Elektronik Ürünleri Gör",
                    ButtonHref = "/categories/1",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(7),
                    IsActive = true
                },
                new()
                {
                    Title = "Yaz Koleksiyonu",
                    Subtitle = "Yeni sezon giyim ürünleri",
                    Description = "Yaz ayları için hazırlanan yeni koleksiyon ürünleri",
                    Discount = 25,
                    ImageUrl = "https://picsum.photos/800/400?random=1003",
                    BackgroundColor = "#45B7D1",
                    TimeLeft = "2 hafta kaldı",
                    ButtonText = "Koleksiyonu İncele",
                    ButtonHref = "/categories/2",
                    StartDate = DateTime.UtcNow.AddDays(-2),
                    EndDate = DateTime.UtcNow.AddDays(12),
                    IsActive = true
                },
                new()
                {
                    Title = "Ev Dekorasyonu",
                    Subtitle = "Evinizi yenileyin",
                    Description = "Ev dekorasyonu ve yaşam ürünlerinde özel indirimler",
                    Discount = 40,
                    ImageUrl = "https://picsum.photos/800/400?random=1004",
                    BackgroundColor = "#96CEB4",
                    TimeLeft = "5 gün kaldı",
                    ButtonText = "Ev Ürünlerini Gör",
                    ButtonHref = "/categories/3",
                    StartDate = DateTime.UtcNow.AddDays(-1),
                    EndDate = DateTime.UtcNow.AddDays(4),
                    IsActive = true
                },
                new()
                {
                    Title = "Spor Malzemeleri",
                    Subtitle = "Sağlıklı yaşam için",
                    Description = "Fitness ve spor malzemelerinde büyük indirimler",
                    Discount = 35,
                    ImageUrl = "https://picsum.photos/800/400?random=1005",
                    BackgroundColor = "#FFEAA7",
                    TimeLeft = "1 hafta kaldı",
                    ButtonText = "Spor Ürünleri",
                    ButtonHref = "/categories/4",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(7),
                    IsActive = true
                }
            };

            await _context.Campaigns.AddRangeAsync(campaigns);
            await _context.SaveChangesAsync();
        }

        private decimal GenerateRandomPrice()
        {
            return Math.Round((decimal)(10 + _random.NextDouble() * 990), 2);
        }

        private string GenerateDescription(string productName)
        {
            var descriptions = new[]
            {
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
            };

            return $"{descriptions[_random.Next(descriptions.Length)]} {productName.ToLower()}.";
        }
    }
}
