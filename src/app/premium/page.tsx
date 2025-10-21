import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Star, 
  Truck, 
  Shield, 
  Gift,
  Zap,
  Heart,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Clock
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Premium Üyelik - E-Ticaret Sitesi",
  description:
    "Premium üyelik avantajları, özel indirimler, hızlı teslimat ve daha fazlası. Premium olun, farkı yaşayın.",
};

const premiumPlans = [
  {
    id: 1,
    name: "Premium",
    price: 99,
    period: "aylık",
    originalPrice: 149,
    discount: 33,
    description: "Temel premium avantajları",
    features: [
      "Ücretsiz kargo (tüm siparişlerde)",
      "Özel indirimler (%10-20)",
      "Hızlı teslimat (1-2 gün)",
      "Öncelikli müşteri desteği",
      "Premium ürün erişimi",
      "Doğum günü hediyesi"
    ],
    popular: false,
    color: "border-blue-500",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: 2,
    name: "Premium Plus",
    price: 199,
    period: "aylık",
    originalPrice: 299,
    discount: 33,
    description: "Gelişmiş premium deneyim",
    features: [
      "Ücretsiz kargo (tüm siparişlerde)",
      "Özel indirimler (%15-25)",
      "Aynı gün teslimat",
      "7/24 öncelikli destek",
      "Premium ürün erişimi",
      "Doğum günü hediyesi",
      "Özel etkinlik davetleri",
      "Kişisel alışveriş danışmanı"
    ],
    popular: true,
    color: "border-purple-500",
    buttonColor: "bg-purple-600 hover:bg-purple-700"
  },
  {
    id: 3,
    name: "Premium Elite",
    price: 399,
    period: "aylık",
    originalPrice: 599,
    discount: 33,
    description: "En üst düzey premium deneyim",
    features: [
      "Ücretsiz kargo (tüm siparişlerde)",
      "Özel indirimler (%20-30)",
      "Aynı gün teslimat",
      "7/24 VIP destek",
      "Premium ürün erişimi",
      "Doğum günü hediyesi",
      "Özel etkinlik davetleri",
      "Kişisel alışveriş danışmanı",
      "Sınırsız iade hakkı",
      "Özel ürün lansmanları",
      "Yıllık hediye paketi"
    ],
    popular: false,
    color: "border-gold-500",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700"
  }
];

const premiumBenefits = [
  {
    icon: Truck,
    title: "Ücretsiz Kargo",
    description: "Tüm siparişlerinizde ücretsiz kargo avantajı",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Zap,
    title: "Hızlı Teslimat",
    description: "Premium üyeler için öncelikli teslimat",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Star,
    title: "Özel İndirimler",
    description: "Sadece premium üyelere özel indirimler",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Shield,
    title: "Güvenli Alışveriş",
    description: "Gelişmiş güvenlik ve koruma",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Gift,
    title: "Özel Hediyeler",
    description: "Doğum günü ve özel gün hediyeleri",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Heart,
    title: "VIP Destek",
    description: "7/24 öncelikli müşteri desteği",
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

const premiumStats = [
  {
    number: "50,000+",
    label: "Premium Üye",
    icon: Users
  },
  {
    number: "₺2.5M+",
    label: "Tasarruf Edildi",
    icon: Award
  },
  {
    number: "4.9/5",
    label: "Müşteri Memnuniyeti",
    icon: Star
  },
  {
    number: "24/7",
    label: "Destek Hizmeti",
    icon: Clock
  }
];

const testimonials = [
  {
    id: 1,
    name: "Ayşe Demir",
    plan: "Premium Plus",
    rating: 5,
    comment: "Premium üyelik gerçekten fark yaratıyor. Hızlı teslimat ve özel indirimler harika!",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    plan: "Premium Elite",
    rating: 5,
    comment: "VIP destek hizmeti mükemmel. Her sorunumu anında çözüyorlar.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Fatma Özkan",
    plan: "Premium",
    rating: 5,
    comment: "Ücretsiz kargo ve özel indirimler sayesinde çok tasarruf ediyorum.",
    avatar: "https://picsum.photos/100/100?random=3"
  }
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Crown className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Üyelik</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Premium olun, farkı yaşayın. Özel indirimler, hızlı teslimat ve VIP destek ile alışveriş deneyiminizi üst seviyeye taşıyın.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Premium Avantajları */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Premium Avantajları</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumBenefits.map((benefit, index) => {
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

        {/* Premium Planları */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Premium Planları</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {premiumPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative hover:shadow-xl transition-shadow ${plan.color} ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      En Popüler
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold">₺{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-lg text-muted-foreground line-through">₺{plan.originalPrice}</span>
                      <Badge variant="destructive">%{plan.discount} İndirim</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full ${plan.buttonColor} text-white`}>
                    {plan.name} Ol
                    <ArrowRight className="w-4 h-4 ml-2" />
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
              <CardTitle className="text-center">Premium Üyelik İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {premiumStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index}>
                      <IconComponent className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                      <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Müşteri Yorumları */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Premium Üyelerimiz Ne Diyor?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.plan}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Sık Sorulan Sorular</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Premium üyelik nasıl iptal edilir?",
                answer: "Premium üyeliğinizi istediğiniz zaman hesap ayarlarınızdan iptal edebilirsiniz. İptal işlemi sonrası üyelik süreniz bitene kadar avantajlardan yararlanmaya devam edersiniz."
              },
              {
                question: "Premium üyelik avantajları ne zaman aktif olur?",
                answer: "Premium üyelik satın aldığınız anda tüm avantajlar aktif hale gelir. Özel indirimler, ücretsiz kargo ve diğer avantajlardan hemen yararlanabilirsiniz."
              },
              {
                question: "Premium üyelik otomatik yenilenir mi?",
                answer: "Evet, premium üyelik otomatik olarak yenilenir. İptal etmek istemiyorsanız hiçbir işlem yapmanıza gerek yoktur."
              },
              {
                question: "Premium üyelik avantajları tüm ürünlerde geçerli mi?",
                answer: "Premium üyelik avantajları çoğu üründe geçerlidir. Bazı özel kampanyalar ve indirimli ürünlerde ek indirim uygulanmayabilir."
              }
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
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Premium Olmaya Hazır mısınız?</h2>
          <p className="text-xl opacity-90 mb-6">
            Özel avantajlardan yararlanmaya hemen başlayın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="#plans">
                Premium Planları Gör
                <Crown className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" asChild>
              <Link href="/customer-service">
                Daha Fazla Bilgi
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
