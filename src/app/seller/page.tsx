import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Store, 
  TrendingUp, 
  Users, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Truck,
  CreditCard,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Target,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "Satıcı Ol - E-Ticaret Sitesi",
  description:
    "E-ticaret platformumuzda satıcı olun. Düşük komisyon, geniş müşteri kitlesi ve profesyonel destek.",
};

const sellerBenefits = [
  {
    icon: TrendingUp,
    title: "Hızlı Büyüme",
    description: "Milyonlarca müşteriye ulaşın ve satışlarınızı artırın",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: DollarSign,
    title: "Düşük Komisyon",
    description: "Sektörün en düşük komisyon oranları ile daha fazla kazanın",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Shield,
    title: "Güvenli Ödeme",
    description: "Güvenli ödeme sistemi ile risk almadan satış yapın",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Truck,
    title: "Kargo Desteği",
    description: "Anlaşmalı kargo firmaları ile uygun fiyatlı teslimat",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Users,
    title: "Müşteri Desteği",
    description: "7/24 müşteri hizmetleri ile satış sonrası destek",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Zap,
    title: "Hızlı Onay",
    description: "Başvurunuz 24 saat içinde değerlendirilir",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
];

const commissionRates = [
  {
    category: "Elektronik",
    rate: "8%",
    description: "Telefon, bilgisayar, tablet ve aksesuarlar"
  },
  {
    category: "Moda",
    rate: "12%",
    description: "Giyim, ayakkabı, çanta ve aksesuar"
  },
  {
    category: "Ev & Yaşam",
    rate: "10%",
    description: "Mobilya, dekorasyon, ev tekstili"
  },
  {
    category: "Spor & Outdoor",
    rate: "9%",
    description: "Spor giyim, fitness, outdoor ürünleri"
  },
  {
    category: "Anne & Bebek",
    rate: "11%",
    description: "Bebek giyim, oyuncak, bakım ürünleri"
  },
  {
    category: "Kozmetik",
    rate: "13%",
    description: "Makyaj, cilt bakımı, kişisel bakım"
  }
];

const successStories = [
  {
    id: 1,
    name: "Ayşe Demir",
    business: "Demir Seramik",
    category: "Ev & Yaşam",
    revenue: "₺150,000",
    period: "aylık",
    story: "Platform sayesinde satışlarım 5 kat arttı. Müşteri kitlesi genişledi ve işim büyüdü.",
    avatar: "https://picsum.photos/100/100?random=1",
    rating: 5
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    business: "Kaya Elektronik",
    category: "Elektronik",
    revenue: "₺300,000",
    period: "aylık",
    story: "Düşük komisyon oranları sayesinde daha fazla kar elde ediyorum. Platform çok profesyonel.",
    avatar: "https://picsum.photos/100/100?random=2",
    rating: 5
  },
  {
    id: 3,
    name: "Fatma Özkan",
    business: "Özkan Moda",
    category: "Moda",
    revenue: "₺200,000",
    period: "aylık",
    story: "Müşteri desteği harika. Satış sonrası sorunları hızlıca çözüyorlar.",
    avatar: "https://picsum.photos/100/100?random=3",
    rating: 5
  }
];

const requirements = [
  {
    title: "Kimlik Belgesi",
    description: "TC kimlik kartı veya pasaport",
    icon: FileText
  },
  {
    title: "Vergi Levhası",
    description: "Geçerli vergi levhası veya vergi numarası",
    icon: FileText
  },
  {
    title: "İletişim Bilgileri",
    description: "Telefon, e-posta ve adres bilgileri",
    icon: Phone
  },
  {
    title: "Banka Hesabı",
    description: "Türkiye'deki bir bankada hesap",
    icon: CreditCard
  }
];

export default function SellerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Store className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Satıcı Ol</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            E-ticaret platformumuzda satıcı olun. Milyonlarca müşteriye ulaşın, 
            düşük komisyon oranları ile daha fazla kazanın.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Satıcı Avantajları */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Neden Bizimle Satış Yapmalısınız?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${benefit.bgColor} flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Komisyon Oranları */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Komisyon Oranları</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commissionRates.map((rate, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{rate.category}</span>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {rate.rate}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{rate.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Başarı Hikayeleri */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Başarı Hikayeleri</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.business}</p>
                      <Badge variant="outline" className="text-xs">{story.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600">{story.revenue}</div>
                    <div className="text-sm text-muted-foreground">{story.period} ciro</div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < story.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground italic">
                    "{story.story}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Başvuru Formu */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Satıcı Başvuru Formu</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ad Soyad *</label>
                    <Input placeholder="Adınız ve soyadınız" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">E-posta *</label>
                    <Input type="email" placeholder="ornek@email.com" required />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Telefon *</label>
                    <Input placeholder="0555 123 45 67" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Şirket Adı</label>
                    <Input placeholder="Şirket adınız" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Adres *</label>
                  <Textarea placeholder="Tam adresiniz" rows={3} required />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vergi Numarası *</label>
                    <Input placeholder="Vergi numaranız" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ana Kategori *</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elektronik">Elektronik</SelectItem>
                        <SelectItem value="moda">Moda</SelectItem>
                        <SelectItem value="ev-yasam">Ev & Yaşam</SelectItem>
                        <SelectItem value="spor">Spor & Outdoor</SelectItem>
                        <SelectItem value="anne-bebek">Anne & Bebek</SelectItem>
                        <SelectItem value="kozmetik">Kozmetik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Satış Deneyimi</label>
                  <Textarea 
                    placeholder="Daha önce e-ticaret deneyiminiz var mı? Hangi platformlarda satış yaptınız?" 
                    rows={3} 
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms" className="text-sm">
                    <a href="/terms" className="text-blue-600 hover:underline">Kullanım şartlarını</a> ve 
                    <a href="/privacy" className="text-blue-600 hover:underline"> gizlilik politikasını</a> kabul ediyorum.
                  </label>
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  <Store className="w-5 h-5 mr-2" />
                  Başvuru Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Gereksinimler */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Başvuru Gereksinimleri</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => {
              const IconComponent = req.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold mb-2">{req.title}</h3>
                    <p className="text-sm text-muted-foreground">{req.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* İstatistikler */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Platform İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                  <div className="text-sm text-muted-foreground">Aktif Satıcı</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">2M+</div>
                  <div className="text-sm text-muted-foreground">Ürün Çeşidi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">₺500M+</div>
                  <div className="text-sm text-muted-foreground">Aylık Ciro</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
                  <div className="text-sm text-muted-foreground">Satıcı Memnuniyeti</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Hemen Satıcı Olmaya Başlayın</h2>
          <p className="text-xl opacity-90 mb-6">
            Milyonlarca müşteriye ulaşın ve işinizi büyütün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="#application">
                <Store className="w-5 h-5 mr-2" />
                Başvuru Yap
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600" asChild>
              <a href="/customer-service">
                <Phone className="w-5 h-5 mr-2" />
                Bilgi Al
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
