import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  Truck,
  Shield,
  Heart,
  Globe,
  Target,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda - TempShop",
  description: "TempShop hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz. 2020'den beri müşteri memnuniyetini ön planda tutan e-ticaret platformu.",
  keywords: "hakkımızda, TempShop, misyon, vizyon, değerler, e-ticaret, müşteri memnuniyeti",
  robots: "index, follow",
  openGraph: {
    title: "Hakkımızda - TempShop",
    description: "TempShop hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/about",
  },
};

const stats = [
  { label: "Müşteri Sayısı", value: "1M+", icon: Users },
  { label: "Ürün Sayısı", value: "50K+", icon: Award },
  { label: "Günlük Teslimat", value: "10K+", icon: Truck },
  { label: "Güvenli Alışveriş", value: "99.9%", icon: Shield },
];

const values = [
  {
    icon: Heart,
    title: "Müşteri Memnuniyeti",
    description:
      "Müşterilerimizin memnuniyeti bizim önceliğimizdir. Her zaman en iyi hizmeti sunmaya çalışıyoruz.",
  },
  {
    icon: Globe,
    title: "Kaliteli Ürünler",
    description:
      "Sadece kaliteli ve güvenilir ürünleri sizlere sunuyoruz. Tüm ürünlerimiz titizlikle seçilmiştir.",
  },
  {
    icon: Target,
    title: "Hızlı Teslimat",
    description:
      "Siparişlerinizi en kısa sürede kapınıza getiriyoruz. Hızlı ve güvenli teslimat garantisi.",
  },
  {
    icon: Lightbulb,
    title: "İnovasyon",
    description:
      "Sürekli gelişim ve yenilik anlayışıyla e-ticaret deneyimini daha da iyileştiriyoruz.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Türkiye'nin en güvenilir e-ticaret platformu olarak, müşterilerimize
            en kaliteli ürünleri en uygun fiyatlarla sunuyoruz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                2020 yılında kurulan şirketimiz, e-ticaret sektöründe müşteri
                memnuniyetini ön planda tutan bir anlayışla faaliyet
                göstermektedir.
              </p>
              <p>
                Başlangıçta küçük bir ekip olarak başladığımız yolculuğumuzda,
                bugün binlerce müşteriye hizmet veren büyük bir platform haline
                geldik.
              </p>
              <p>
                Teknoloji ve insan odaklı yaklaşımımızla, e-ticaret deneyimini
                daha da iyileştirmeye devam ediyoruz.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
            <p className="text-muted-foreground mb-6">
              Müşterilerimize en kaliteli ürünleri, en uygun fiyatlarla, en
              hızlı şekilde ulaştırmak ve mükemmel bir alışveriş deneyimi
              yaşatmak.
            </p>
            <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
            <p className="text-muted-foreground">
              Türkiye'nin en güvenilir ve tercih edilen e-ticaret platformu
              olmak, teknoloji ve inovasyonla sektöre yön vermek.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Awards Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Ödüllerimiz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2">
                  En İyi E-Ticaret Sitesi
                </h3>
                <Badge variant="secondary">2023</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">
                  Güvenli Alışveriş Ödülü
                </h3>
                <Badge variant="secondary">2023</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">
                  Hızlı Teslimat Ödülü
                </h3>
                <Badge variant="secondary">2023</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
