import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Monitor,
  Smartphone as PhoneIcon,
  Tablet,
  LogOut,
  RefreshCw
} from "lucide-react";

export const metadata: Metadata = {
  title: "Güvenlik - E-Ticaret Sitesi",
  description:
    "Hesap güvenliğinizi yönetin. Şifre değiştirme, iki faktörlü doğrulama ve güvenlik ayarları.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "Güçlü Şifre",
    description: "Hesabınızı korumak için güçlü bir şifre kullanın",
    status: "active",
    action: "Değiştir"
  },
  {
    icon: Smartphone,
    title: "İki Faktörlü Doğrulama",
    description: "Hesabınıza ek güvenlik katmanı ekleyin",
    status: "inactive",
    action: "Etkinleştir"
  },
  {
    icon: Mail,
    title: "E-posta Doğrulama",
    description: "E-posta adresiniz doğrulanmış",
    status: "active",
    action: "Değiştir"
  },
  {
    icon: PhoneIcon,
    title: "Telefon Doğrulama",
    description: "Telefon numaranızı doğrulayın",
    status: "inactive",
    action: "Doğrula"
  }
];

const loginHistory = [
  {
    id: 1,
    device: "Chrome - Windows",
    location: "İstanbul, Türkiye",
    ip: "192.168.1.1",
    time: "2 saat önce",
    status: "current",
    icon: Monitor
  },
  {
    id: 2,
    device: "Safari - iPhone",
    location: "Ankara, Türkiye",
    ip: "192.168.1.2",
    time: "1 gün önce",
    status: "active",
    icon: PhoneIcon
  },
  {
    id: 3,
    device: "Chrome - Android",
    location: "İzmir, Türkiye",
    ip: "192.168.1.3",
    time: "3 gün önce",
    status: "active",
    icon: PhoneIcon
  },
  {
    id: 4,
    device: "Firefox - Mac",
    location: "Bursa, Türkiye",
    ip: "192.168.1.4",
    time: "1 hafta önce",
    status: "inactive",
    icon: Monitor
  }
];

const securityTips = [
  {
    title: "Güçlü Şifre Kullanın",
    description: "En az 8 karakter, büyük-küçük harf, sayı ve özel karakter içeren şifreler kullanın.",
    icon: Lock
  },
  {
    title: "İki Faktörlü Doğrulama",
    description: "Hesabınıza ek güvenlik katmanı eklemek için 2FA'yı etkinleştirin.",
    icon: Smartphone
  },
  {
    title: "Şüpheli Aktivite",
    description: "Tanımadığınız cihazlardan giriş yapıldığında hemen şifrenizi değiştirin.",
    icon: AlertTriangle
  },
  {
    title: "Güvenli Bağlantı",
    description: "Hesabınıza sadece güvenli internet bağlantılarından erişin.",
    icon: Shield
  }
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">Güvenlik</h1>
              <p className="text-muted-foreground mt-1">
                Hesap güvenliğinizi yönetin ve koruyun
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Güvenlik Özellikleri */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Güvenlik Ayarları</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{feature.title}</h3>
                              <Badge 
                                variant={feature.status === 'active' ? 'default' : 'secondary'}
                                className={feature.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {feature.status === 'active' ? 'Aktif' : 'Pasif'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {feature.description}
                            </p>
                            <Button variant="outline" size="sm">
                              {feature.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Şifre Değiştirme */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Şifre Değiştir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mevcut Şifre</label>
                      <div className="relative">
                        <Input type="password" placeholder="Mevcut şifrenizi girin" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Yeni Şifre</label>
                      <div className="relative">
                        <Input type="password" placeholder="Yeni şifrenizi girin" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Yeni Şifre Tekrar</label>
                      <div className="relative">
                        <Input type="password" placeholder="Yeni şifrenizi tekrar girin" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Şifreyi Güncelle
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* Giriş Geçmişi */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Giriş Geçmişi
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Yenile
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loginHistory.map((login) => {
                      const IconComponent = login.icon;
                      return (
                        <div key={login.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{login.device}</h4>
                              {login.status === 'current' && (
                                <Badge className="bg-blue-100 text-blue-800">Mevcut</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {login.location}
                              </div>
                              <div>IP: {login.ip}</div>
                              <div>{login.time}</div>
                            </div>
                          </div>
                          
                          {login.status !== 'current' && (
                            <Button variant="outline" size="sm">
                              <LogOut className="w-4 h-4 mr-2" />
                              Çıkış Yap
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      Tüm Cihazlardan Çıkış Yap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Güvenlik Durumu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Güvenlik Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Güçlü şifre</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">İki faktörlü doğrulama</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">E-posta doğrulama</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Telefon doğrulama</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Güvenlik Skoru</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">50/100 - Orta</div>
                </div>
              </CardContent>
            </Card>

            {/* Güvenlik İpuçları */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Güvenlik İpuçları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityTips.map((tip, index) => {
                    const IconComponent = tip.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Hızlı İşlemler */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone className="w-4 h-4 mr-2" />
                    2FA Etkinleştir
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    E-posta Değiştir
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Telefon Ekle
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <LogOut className="w-4 h-4 mr-2" />
                    Tüm Cihazlardan Çıkış
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
