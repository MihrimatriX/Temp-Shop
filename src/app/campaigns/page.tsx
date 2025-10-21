import { Metadata } from "next";
import { CampaignGrid } from "@/components/campaign-grid";
import { HeroSection } from "@/components/hero-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kampanyalar - TempShop",
  description: "TempShop'ta tüm aktif kampanyaları keşfedin. Black Friday, elektronik fırsatları, moda sezonu ve daha fazlası. Büyük indirimler ve özel fırsatlar sizi bekliyor.",
  keywords: "kampanyalar, indirim, black friday, elektronik fırsatları, moda sezonu, TempShop",
  robots: "index, follow",
  openGraph: {
    title: "Kampanyalar - TempShop",
    description: "TempShop'ta tüm aktif kampanyaları keşfedin. Büyük indirimler ve özel fırsatlar sizi bekliyor.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/campaigns",
  },
};

// Mock campaign data
const featuredCampaigns = [
  {
    id: 1,
    title: "Black Friday",
    subtitle: "Yılın en büyük indirimi",
    description: "Tüm kategorilerde %50'ye varan indirimler. Sınırlı süre!",
    discount: 50,
    imageUrl: "https://picsum.photos/800/400?random=blackfriday",
    timeLeft: "3 gün kaldı",
    buttonText: "Hemen Keşfet",
    buttonHref: "/products",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "Elektronik Fırsatları",
    subtitle: "Teknoloji ürünlerinde büyük indirimler",
    description: "Telefon, laptop, tablet ve diğer elektronik ürünlerde %30'a varan indirimler.",
    discount: 30,
    imageUrl: "https://picsum.photos/800/400?random=electronics",
    timeLeft: "7 gün kaldı",
    buttonText: "Elektronik Ürünler",
    buttonHref: "/categories/elektronik",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "Moda Sezonu",
    subtitle: "Yeni sezon koleksiyonları",
    description: "Kadın, erkek ve çocuk giyimde yeni sezon ürünleri özel fiyatlarla.",
    discount: 25,
    imageUrl: "https://picsum.photos/800/400?random=fashion",
    timeLeft: "10 gün kaldı",
    buttonText: "Moda Ürünleri",
    buttonHref: "/categories/moda",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  },
];

const upcomingCampaigns = [
  {
    id: 4,
    title: "Yeni Yıl",
    subtitle: "Yeni yıla özel indirimler",
    description: "Yeni yıla girerken tüm ürünlerde özel indirimler.",
    discount: 25,
    imageUrl: "https://picsum.photos/600/300?random=newyear",
    timeLeft: "20 gün kaldı",
    isActive: true,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    title: "Sevgililer Günü",
    subtitle: "Sevgiliniz için özel hediyeler",
    description: "Sevgililer günü için özel hediye seçenekleri ve indirimler.",
    discount: 30,
    imageUrl: "https://picsum.photos/600/300?random=valentine",
    timeLeft: "18 gün kaldı",
    isActive: true,
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
  },
  {
    id: 6,
    title: "Anneler Günü",
    subtitle: "Anneler için özel ürünler",
    description: "Anneler günü için özel ürünler ve indirimler.",
    discount: 35,
    imageUrl: "https://picsum.photos/600/300?random=mothersday",
    timeLeft: "25 gün kaldı",
    isActive: true,
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
  },
];

export default function CampaignsPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Kampanyalar"
        subtitle="Büyük indirimler ve özel fırsatlar sizi bekliyor"
        showSearch={false}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Aktif Kampanyalar */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Aktif Kampanyalar</h2>
            <Badge variant="destructive" className="text-sm">
              Sınırlı Süre
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">
                      %{campaign.discount} İndirim
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
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
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {campaign.startDate.toLocaleDateString("tr-TR")} - {campaign.endDate.toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    
                    <Button asChild size="sm">
                      <Link href={campaign.buttonHref}>
                        {campaign.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Yaklaşan Kampanyalar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Yaklaşan Kampanyalar</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90">
                      %{campaign.discount} İndirim
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
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
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {campaign.startDate.toLocaleDateString("tr-TR")} - {campaign.endDate.toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Kampanya Kategorileri */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Kampanya Kategorileri</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Elektronik", href: "/categories/elektronik", icon: "📱" },
              { name: "Moda", href: "/categories/moda", icon: "👗" },
              { name: "Ev & Yaşam", href: "/categories/ev-yasam", icon: "🏠" },
              { name: "Spor", href: "/categories/spor", icon: "⚽" },
              { name: "Anne & Bebek", href: "/categories/anne-bebek", icon: "👶" },
              { name: "Kozmetik", href: "/categories/kozmetik", icon: "💄" },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <p className="text-sm font-medium">{category.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Kampanya Bilgilendirme */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Kampanya Hakkında</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Kampanya Kuralları</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kampanyalar sınırlı süre için geçerlidir</li>
                <li>• İndirimler stok durumuna göre değişebilir</li>
                <li>• Kampanyalar birleştirilemez</li>
                <li>• E-ticaret sitesi kampanya kurallarını değiştirme hakkını saklı tutar</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Kampanya Avantajları</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Büyük indirimler ve özel fiyatlar</li>
                <li>• Hızlı ve güvenli teslimat</li>
                <li>• Kolay iade ve değişim</li>
                <li>• 7/24 müşteri desteği</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
