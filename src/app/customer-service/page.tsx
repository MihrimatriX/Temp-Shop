import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Headphones, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Search,
  HelpCircle,
  FileText,
  Truck,
  CreditCard,
  Shield,
  ArrowRight,
  Send
} from "lucide-react";

export const metadata: Metadata = {
  title: "Müşteri Hizmetleri - E-Ticaret Sitesi",
  description:
    "7/24 müşteri desteği, canlı destek, SSS ve iletişim bilgileri. Size nasıl yardımcı olabiliriz?",
};

const faqCategories = [
  {
    id: 1,
    name: "Sipariş ve Teslimat",
    icon: Truck,
    questions: [
      {
        question: "Siparişim ne zaman teslim edilir?",
        answer: "Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir. Teslimat süresi bölgenize göre 1-5 iş günü arasında değişir."
      },
      {
        question: "Siparişimi nasıl takip edebilirim?",
        answer: "Sipariş takip numaranızı e-posta ile alacaksınız. Bu numarayı kargo firmasının web sitesinde sorgulayabilirsiniz."
      },
      {
        question: "Ücretsiz kargo limiti nedir?",
        answer: "150 TL ve üzeri alışverişlerde ücretsiz kargo hizmeti sunuyoruz."
      }
    ]
  },
  {
    id: 2,
    name: "Ödeme ve Fatura",
    icon: CreditCard,
    questions: [
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz."
      },
      {
        question: "Faturamı nasıl alabilirim?",
        answer: "E-fatura sistemimiz üzerinden faturanızı e-posta adresinize gönderebiliriz."
      },
      {
        question: "Taksit seçenekleri nelerdir?",
        answer: "2-12 taksit arası seçeneklerimiz bulunmaktadır. Taksit sayısı kartınıza göre değişir."
      }
    ]
  },
  {
    id: 3,
    name: "İade ve Değişim",
    icon: Shield,
    questions: [
      {
        question: "Ürünü nasıl iade edebilirim?",
        answer: "14 gün içinde ürünü orijinal ambalajında iade edebilirsiniz. İade formu ile birlikte kargo ile gönderebilirsiniz."
      },
      {
        question: "İade ücreti kim karşılar?",
        answer: "Ürün hatası varsa iade ücretini biz karşılarız. Müşteri kaynaklı iadelerde kargo ücreti müşteriye aittir."
      },
      {
        question: "İade süreci ne kadar sürer?",
        answer: "İade edilen ürün kontrol edildikten sonra 3-5 iş günü içinde ödeme işleminiz gerçekleştirilir."
      }
    ]
  }
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Canlı Destek",
    description: "7/24 canlı destek hattımız",
    availability: "Şu anda aktif",
    action: "Sohbete Başla",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Phone,
    title: "Telefon Desteği",
    description: "0850 123 45 67",
    availability: "Pazartesi-Cuma 09:00-18:00",
    action: "Ara",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Mail,
    title: "E-posta Desteği",
    description: "destek@eticaret.com",
    availability: "24 saat içinde yanıt",
    action: "E-posta Gönder",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Headphones,
    title: "WhatsApp Desteği",
    description: "+90 555 123 45 67",
    availability: "7/24 WhatsApp desteği",
    action: "WhatsApp'tan Yaz",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

const quickLinks = [
  {
    title: "Sipariş Takibi",
    description: "Siparişinizin durumunu öğrenin",
    icon: Truck,
    href: "/orders",
  },
  {
    title: "İade Talebi",
    description: "Ürün iade işlemi başlatın",
    icon: Shield,
    href: "/returns",
  },
  {
    title: "Hesap Ayarları",
    description: "Profil bilgilerinizi güncelleyin",
    icon: FileText,
    href: "/settings",
  },
  {
    title: "Adres Yönetimi",
    description: "Teslimat adreslerinizi yönetin",
    icon: Truck,
    href: "/addresses",
  },
];

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Müşteri Hizmetleri</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Size nasıl yardımcı olabiliriz? 7/24 müşteri desteği ile yanınızdayız.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* İletişim Yöntemleri */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Bizimle İletişime Geçin</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${method.bgColor} flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${method.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <Badge variant="secondary" className="mb-4">{method.availability}</Badge>
                    <Button className="w-full" variant="outline">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Hızlı Linkler */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hızlı İşlemler</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                    <Button variant="outline" className="w-full">
                      Git
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* SSS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Sık Sorulan Sorular</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Sorunuzu arayın..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            {faqCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <h4 className="font-semibold mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* İletişim Formu */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Bize Mesaj Gönderin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ad Soyad</label>
                    <Input placeholder="Adınız ve soyadınız" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">E-posta</label>
                    <Input type="email" placeholder="ornek@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Konu</label>
                  <Input placeholder="Mesajınızın konusu" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Mesaj</label>
                  <Textarea 
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Mesaj Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Çalışma Saatleri */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Çalışma Saatleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Müşteri Hizmetleri</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pazartesi - Cuma:</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cumartesi:</span>
                      <span>10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pazar:</span>
                      <span>Kapalı</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Canlı Destek</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Hafta İçi:</span>
                      <span>24 Saat</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hafta Sonu:</span>
                      <span>24 Saat</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resmi Tatiller:</span>
                      <span>24 Saat</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Garantiler */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Garantilerimiz</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Güvenli Alışveriş</h3>
                <p className="text-sm text-muted-foreground">
                  256-bit SSL şifreleme ile güvenli ödeme garantisi
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Kalite Garantisi</h3>
                <p className="text-sm text-muted-foreground">
                  Tüm ürünlerimiz kalite kontrolünden geçer
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">Hızlı Teslimat</h3>
                <p className="text-sm text-muted-foreground">
                  Siparişleriniz 1-3 iş günü içinde kargoya verilir
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
