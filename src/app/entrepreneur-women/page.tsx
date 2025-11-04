import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Star, 
  Users, 
  Award, 
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  Quote,
  CheckCircle,
  Target
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Girişimci Kadınlar - E-Ticaret Sitesi",
  description:
    "Kadın girişimcilere ait ürünleri keşfedin. Kadın girişimci hikayeleri ve özel kampanyalar.",
};

const entrepreneurProducts = [
  {
    id: 1,
    name: "El Yapımı Seramik Vazo",
    price: 450,
    originalPrice: 600,
    discount: 25,
    image: "https://picsum.photos/300/300?random=ceramic",
    entrepreneur: "Ayşe Demir",
    business: "Demir Seramik",
    rating: 4.9,
    reviews: 156,
    description: "Geleneksel tekniklerle el yapımı seramik vazo",
  },
  {
    id: 2,
    name: "Organik Sabun Seti",
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: "https://picsum.photos/300/300?random=soap",
    entrepreneur: "Fatma Özkan",
    business: "Doğal Sabun",
    rating: 4.8,
    reviews: 234,
    description: "Doğal malzemelerle üretilmiş organik sabun seti",
  },
  {
    id: 3,
    name: "El Örgüsü Atkı",
    price: 180,
    originalPrice: 220,
    discount: 18,
    image: "https://picsum.photos/300/300?random=scarf",
    entrepreneur: "Zeynep Arslan",
    business: "Zeynep Örgü",
    rating: 4.7,
    reviews: 189,
    description: "Yün iplikle el örgüsü yapılmış sıcak atkı",
  },
  {
    id: 4,
    name: "Ev Yapımı Reçel",
    price: 85,
    originalPrice: 100,
    discount: 15,
    image: "https://picsum.photos/300/300?random=jam",
    entrepreneur: "Elif Yıldız",
    business: "Elif'in Mutfağı",
    rating: 4.9,
    reviews: 312,
    description: "Geleneksel tariflerle hazırlanmış ev yapımı reçel",
  },
  {
    id: 5,
    name: "El Yapımı Takı",
    price: 250,
    originalPrice: 300,
    discount: 17,
    image: "https://picsum.photos/300/300?random=jewelry",
    entrepreneur: "Selin Aydın",
    business: "Selin Takı",
    rating: 4.8,
    reviews: 198,
    description: "Özel tasarım el yapımı gümüş takı",
  },
  {
    id: 6,
    name: "Organik Kozmetik",
    price: 320,
    originalPrice: 380,
    discount: 16,
    image: "https://picsum.photos/300/300?random=cosmetics",
    entrepreneur: "Gamze Kılıç",
    business: "Doğal Güzellik",
    rating: 4.9,
    reviews: 267,
    description: "Doğal malzemelerle üretilmiş organik kozmetik ürünleri",
  },
];

const entrepreneurStories = [
  {
    id: 1,
    name: "Ayşe Demir",
    business: "Demir Seramik",
    image: "https://picsum.photos/200/200?random=ayse",
    story: "5 yıl önce küçük bir atölyede başladığım seramik yolculuğum, bugün 50'den fazla kadına istihdam sağlıyor. Geleneksel teknikleri modern tasarımla buluşturarak, her parçada bir hikaye anlatıyoruz.",
    achievements: ["50+ kadın istihdamı", "3 uluslararası ödül", "15 ülkeye ihracat"],
    products: 45,
    customers: 2500,
  },
  {
    id: 2,
    name: "Fatma Özkan",
    business: "Doğal Sabun",
    image: "https://picsum.photos/200/200?random=fatma",
    story: "Çocuklarımın hassas cildi için başladığım doğal sabun üretimi, bugün binlerce ailenin tercihi haline geldi. Kimyasal içermeyen, tamamen doğal ürünler üretiyoruz.",
    achievements: ["100% doğal ürün", "Çevre dostu ambalaj", "Sosyal sorumluluk projeleri"],
    products: 28,
    customers: 1800,
  },
  {
    id: 3,
    name: "Zeynep Arslan",
    business: "Zeynep Örgü",
    image: "https://picsum.photos/200/200?random=zeynep",
    story: "Büyükannemden öğrendiğim örgü tekniklerini modern tasarımlarla buluşturarak, her mevsim şık ve sıcak ürünler üretiyorum. Her parça sevgiyle örülüyor.",
    achievements: ["Geleneksel teknik korunuyor", "Sürdürülebilir moda", "Yerel işçilik"],
    products: 62,
    customers: 3200,
  },
];

const specialCampaigns = [
  {
    id: 1,
    title: "Kadın Girişimci Desteği",
    subtitle: "Tüm kadın girişimci ürünlerinde %20 indirim",
    description: "Kadın girişimcileri desteklemek için özel kampanya",
    discount: 20,
    image: "https://picsum.photos/600/300?random=women-support",
    timeLeft: "15 gün kaldı",
  },
  {
    id: 2,
    title: "El Yapımı Ürünler",
    subtitle: "El yapımı ürünlerde %25 indirim",
    description: "Geleneksel el sanatlarını destekleyin",
    discount: 25,
    image: "https://picsum.photos/600/300?random=handmade",
    timeLeft: "10 gün kaldı",
  },
  {
    id: 3,
    title: "Organik Ürünler",
    subtitle: "Organik ve doğal ürünlerde %30 indirim",
    description: "Sağlıklı yaşam için organik ürünler",
    discount: 30,
    image: "https://picsum.photos/600/300?random=organic",
    timeLeft: "12 gün kaldı",
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Kadın Dayanışması",
    description: "Kadın girişimcileri destekleyerek toplumsal dayanışmayı güçlendiriyoruz",
  },
  {
    icon: Award,
    title: "Kaliteli Ürünler",
    description: "El yapımı ve doğal ürünlerle kaliteli alışveriş deneyimi",
  },
  {
    icon: Users,
    title: "Toplumsal Etki",
    description: "Kadın istihdamını artırarak toplumsal kalkınmaya katkı sağlıyoruz",
  },
  {
    icon: TrendingUp,
    title: "Sürdürülebilir Büyüme",
    description: "Çevre dostu ve sürdürülebilir üretim modellerini destekliyoruz",
  },
];

export default function EntrepreneurWomenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Girişimci Kadınlar</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Kadın girişimcilerin hikayelerini keşfedin, el yapımı ürünleri satın alın. 
            Kadın dayanışması ile güçlü bir toplum inşa ediyoruz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Avantajlar */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Neden Kadın Girişimcileri Destekliyoruz?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Girişimci Hikayeleri */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Girişimci Hikayeleri</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {entrepreneurStories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{story.business}</p>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {story.story}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {story.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{story.products} ürün</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{story.customers} müşteri</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Öne Çıkan Ürünler */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Kadın Girişimci Ürünleri</h2>
            <Button variant="outline" asChild>
              <Link href="/products">
                Tümünü Gör
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entrepreneurProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-pink-500 text-white">
                      %{product.discount} İndirim
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Kadın Girişimci
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.entrepreneur} - {product.business}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} değerlendirme)
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₺{product.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₺{product.originalPrice}
                    </span>
                  </div>
                  
                  <Button className="w-full">
                    Sepete Ekle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Özel Kampanyalar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Özel Kampanyalar</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {specialCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    width={600}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-pink-500 text-white">
                      %{campaign.discount} İndirim
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">
                      {campaign.timeLeft}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{campaign.subtitle}</p>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {campaign.description}
                  </p>
                  
                  <Button className="w-full">
                    Kampanyayı Gör
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* İstatistikler */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Kadın Girişimci İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Kadın Girişimci</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">2,500+</div>
                  <div className="text-sm text-muted-foreground">Ürün Çeşidi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">50,000+</div>
                  <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">₺2.5M+</div>
                  <div className="text-sm text-muted-foreground">Toplam Satış</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Kadın Girişimcileri Destekleyin</h2>
          <p className="text-xl opacity-90 mb-6">
            El yapımı, doğal ve kaliteli ürünlerle kadın dayanışmasını güçlendirin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">
                Ürünleri Keşfet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-pink-600" asChild>
              <Link href="/seller">
                Satıcı Ol
                <Target className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
