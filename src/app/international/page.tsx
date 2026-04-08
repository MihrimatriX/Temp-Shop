import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Truck,
  Shield,
  CreditCard,
  Clock,
  Package,
  CheckCircle,
  Info,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yurt Dışından Alışveriş - E-Ticaret Sitesi",
  description:
    "Yurt dışından ürün satın alın. Gümrük ve kargo bilgileri, güvenli ödeme seçenekleri.",
};

const internationalProducts = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    price: 45000,
    originalPrice: 50000,
    discount: 10,
    image: "https://picsum.photos/300/300?random=iphone",
    country: "ABD",
    shippingTime: "7-10 gün",
    rating: 4.8,
    reviews: 1250,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    price: 8500,
    originalPrice: 9500,
    discount: 11,
    image: "https://picsum.photos/300/300?random=sony",
    country: "Japonya",
    shippingTime: "10-14 gün",
    rating: 4.9,
    reviews: 890,
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 3200,
    originalPrice: 3800,
    discount: 16,
    image: "https://picsum.photos/300/300?random=nike",
    country: "ABD",
    shippingTime: "5-8 gün",
    rating: 4.7,
    reviews: 2100,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    price: 42000,
    originalPrice: 45000,
    discount: 7,
    image: "https://picsum.photos/300/300?random=samsung",
    country: "Güney Kore",
    shippingTime: "8-12 gün",
    rating: 4.8,
    reviews: 980,
  },
  {
    id: 5,
    name: "MacBook Pro M3",
    price: 65000,
    originalPrice: 70000,
    discount: 7,
    image: "https://picsum.photos/300/300?random=macbook",
    country: "ABD",
    shippingTime: "10-15 gün",
    rating: 4.9,
    reviews: 650,
  },
  {
    id: 6,
    name: "Adidas Ultraboost 22",
    price: 2800,
    originalPrice: 3200,
    discount: 13,
    image: "https://picsum.photos/300/300?random=adidas",
    country: "Almanya",
    shippingTime: "6-9 gün",
    rating: 4.6,
    reviews: 1800,
  },
];

const shippingInfo = [
  {
    country: "ABD",
    shippingTime: "5-10 gün",
    shippingCost: "₺150",
    customsDuty: "Gümrük vergisi dahil",
    icon: "🇺🇸",
  },
  {
    country: "Almanya",
    shippingTime: "6-9 gün",
    shippingCost: "₺120",
    customsDuty: "Gümrük vergisi dahil",
    icon: "🇩🇪",
  },
  {
    country: "Japonya",
    shippingTime: "10-14 gün",
    shippingCost: "₺200",
    customsDuty: "Gümrük vergisi dahil",
    icon: "🇯🇵",
  },
  {
    country: "Güney Kore",
    shippingTime: "8-12 gün",
    shippingCost: "₺180",
    customsDuty: "Gümrük vergisi dahil",
    icon: "🇰🇷",
  },
];

const benefits = [
  {
    icon: Globe,
    title: "Dünya Çapında Ürünler",
    description: "Dünyanın dört bir yanından en kaliteli ürünleri keşfedin",
  },
  {
    icon: Shield,
    title: "Güvenli Alışveriş",
    description: "256-bit SSL şifreleme ile güvenli ödeme garantisi",
  },
  {
    icon: Truck,
    title: "Hızlı Teslimat",
    description: "Express kargo ile hızlı ve güvenli teslimat",
  },
  {
    icon: CreditCard,
    title: "Kolay Ödeme",
    description: "Kredi kartı, banka kartı ve taksit seçenekleri",
  },
];

export default function InternationalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Yurt Dışından Alışveriş
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Dünyanın dört bir yanından en kaliteli ürünleri keşfedin. Gümrük ve
            kargo işlemleri bizim sorumluluğumuzda.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Avantajlar */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Neden Yurt Dışından Alışveriş?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Öne Çıkan Ürünler */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Öne Çıkan Uluslararası Ürünler
            </h2>
            <Button variant="outline" asChild>
              <Link href="/products">
                Tümünü Gör
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">
                      %{product.discount} İndirim
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      {product.country}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {product.name}
                  </CardTitle>
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
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₺{product.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₺{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      <span>{product.shippingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>Kargo dahil</span>
                    </div>
                  </div>

                  <Button className="w-full">Sepete Ekle</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Kargo Bilgileri */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Kargo ve Teslimat Bilgileri
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingInfo.map((info, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{info.country}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{info.shippingTime}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Truck className="w-4 h-4" />
                      <span>{info.shippingCost}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>{info.customsDuty}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Gümrük ve Vergi Bilgileri */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Gümrük ve Vergi Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Gümrük Vergisi</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Tüm gümrük vergileri fiyata dahildir
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Ek vergi ödemezsiniz
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Gümrük işlemleri bizim sorumluluğumuzda
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Teslimat Süreleri
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Express kargo ile hızlı teslimat
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Kargo takip numarası ile takip
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Güvenli paketleme garantisi
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SSS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Sık Sorulan Sorular</h2>

          <div className="space-y-4">
            {[
              {
                question:
                  "Yurt dışından alışveriş yaparken ek vergi öder miyim?",
                answer:
                  "Hayır, tüm gümrük vergileri ve ek vergiler fiyata dahildir. Siz sadece ürün fiyatını ödersiniz.",
              },
              {
                question: "Teslimat süresi ne kadar?",
                answer:
                  "Teslimat süresi ülkeye göre değişir. ABD'den 5-10 gün, Avrupa'dan 6-9 gün, Asya'dan 8-14 gün sürmektedir.",
              },
              {
                question: "Ürün hasarlı gelirse ne yapmalıyım?",
                answer:
                  "Ürün hasarlı gelirse 7 gün içinde müşteri hizmetlerimizle iletişime geçin. Ücretsiz değişim veya iade yapılır.",
              },
              {
                question: "Hangi ödeme yöntemlerini kullanabilirim?",
                answer:
                  "Kredi kartı, banka kartı, havale/EFT ve taksit seçenekleri ile ödeme yapabilirsiniz.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Hemen Alışverişe Başlayın</h2>
          <p className="text-xl opacity-90 mb-6">
            Dünyanın dört bir yanından en kaliteli ürünleri keşfedin
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">
              Ürünleri Keşfet
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
