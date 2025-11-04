"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBackendStore } from "@/store/backend-store";
import { useAuthStore } from "@/store/auth-store";
import toast from "react-hot-toast";
import { 
  Settings, 
  User, 
  Mail, 
  Phone,
  MapPin,
  Bell,
  Eye,
  EyeOff,
  Save,
  Camera,
  Shield,
  Globe,
  Moon,
  Sun,
  Monitor,
  CheckCircle,
  AlertCircle,
  Server,
  Code,
  Wifi
} from "lucide-react";

// Metadata is removed since this is now a client component

const settingCategories = [
  {
    id: "profile",
    title: "Profil Bilgileri",
    description: "Kişisel bilgilerinizi güncelleyin",
    icon: User
  },
  {
    id: "notifications",
    title: "Bildirimler",
    description: "Bildirim tercihlerinizi ayarlayın",
    icon: Bell
  },
  {
    id: "privacy",
    title: "Gizlilik",
    description: "Gizlilik ve güvenlik ayarları",
    icon: Shield
  },
  {
    id: "appearance",
    title: "Görünüm",
    description: "Tema ve görünüm ayarları",
    icon: Monitor
  }
];

const notificationSettings = [
  {
    id: "email",
    title: "E-posta Bildirimleri",
    description: "Sipariş durumu, kampanyalar ve önemli güncellemeler",
    enabled: true
  },
  {
    id: "sms",
    title: "SMS Bildirimleri",
    description: "Kritik güvenlik uyarıları ve sipariş güncellemeleri",
    enabled: false
  },
  {
    id: "push",
    title: "Push Bildirimleri",
    description: "Tarayıcı push bildirimleri",
    enabled: true
  },
  {
    id: "marketing",
    title: "Pazarlama Bildirimleri",
    description: "Kampanyalar, indirimler ve özel teklifler",
    enabled: true
  },
  {
    id: "security",
    title: "Güvenlik Bildirimleri",
    description: "Hesap güvenliği ve şüpheli aktivite uyarıları",
    enabled: true
  }
];

const privacySettings = [
  {
    id: "profile_visibility",
    title: "Profil Görünürlüğü",
    description: "Profil bilgilerinizi diğer kullanıcılara göster",
    enabled: false
  },
  {
    id: "activity_status",
    title: "Aktivite Durumu",
    description: "Çevrimiçi durumunuzu göster",
    enabled: true
  },
  {
    id: "data_collection",
    title: "Veri Toplama",
    description: "Kişiselleştirme için veri toplama izni",
    enabled: true
  },
  {
    id: "analytics",
    title: "Analitik Veriler",
    description: "Site kullanım analitiklerine katkıda bulun",
    enabled: false
  }
];

export default function SettingsPage() {
  const { config, setBackendType, setDotnetUrl, setSpringUrl, getCurrentApiUrl } = useBackendStore();
  const { user, updateUser } = useAuthStore();
  const [dotnetUrl, setLocalDotnetUrl] = useState(config.dotnetUrl);
  const [springUrl, setLocalSpringUrl] = useState(config.springUrl);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  
  // Profile management states
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    avatar: user?.avatar || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveBackendConfig = () => {
    setDotnetUrl(dotnetUrl);
    setSpringUrl(springUrl);
    toast.success("Backend ayarları kaydedildi!");
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      const currentUrl = getCurrentApiUrl();
      if (!currentUrl) {
        toast.error("Mock data modu aktif. Backend bağlantısı test edilemez.");
        return;
      }
      const response = await fetch(`${currentUrl}/health`);
      if (response.ok) {
        toast.success("Bağlantı başarılı!");
      } else {
        toast.error(`Bağlantı başarısız! Durum: ${response.status}`);
      }
    } catch (error) {
      toast.error("Bağlantı test edilemedi!");
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Profile management functions
  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setIsUpdatingProfile(true);
    try {
      const updatedUser = {
        ...user,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        avatar: profileData.avatar,
      };
      
      updateUser(updatedUser);
      toast.success("Profil bilgileri güncellendi!");
    } catch (error) {
      toast.error("Profil güncellenirken hata oluştu!");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user) return;
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalıdır!");
      return;
    }
    
    setIsChangingPassword(true);
    try {
      // Mock password change - in real app, this would call API
      const updatedUser = {
        ...user,
        password: passwordData.newPassword, // In real app, this would be hashed
      };
      
      updateUser(updatedUser);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Şifre başarıyla değiştirildi!");
    } catch (error) {
      toast.error("Şifre değiştirilirken hata oluştu!");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Dosya boyutu 5MB'dan büyük olamaz!");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      toast.error("Sadece resim dosyaları yüklenebilir!");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileData(prev => ({ ...prev, avatar: result }));
      toast.success("Profil fotoğrafı yüklendi!");
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">Ayarlar</h1>
              <p className="text-muted-foreground mt-1">
                Hesap ayarlarınızı yönetin ve kişiselleştirin
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kategoriler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {settingCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {category.title}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profil Bilgileri */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profil Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Profil Fotoğrafı */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          {profileData.avatar ? (
                            <img 
                              src={profileData.avatar} 
                              alt="Profil" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10 text-gray-400" />
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                          onClick={handleAvatarClick}
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                          aria-label="Profil fotoğrafı yükle"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">Profil Fotoğrafı</h3>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG veya GIF formatında, maksimum 5MB
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={handleAvatarClick}
                        >
                          Fotoğraf Yükle
                        </Button>
                      </div>
                    </div>

                    {/* Kişisel Bilgiler */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ad</label>
                        <Input 
                          placeholder="Adınız" 
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Soyad</label>
                        <Input 
                          placeholder="Soyadınız" 
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">E-posta</label>
                      <Input 
                        type="email" 
                        placeholder="ornek@email.com" 
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Telefon</label>
                      <Input 
                        placeholder="0555 123 45 67" 
                        value={profileData.phoneNumber}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      />
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleProfileUpdate}
                      disabled={isUpdatingProfile}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isUpdatingProfile ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Bildirim Ayarları */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Bildirim Tercihleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notificationSettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{setting.title}</h4>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={setting.enabled ? "default" : "secondary"}>
                            {setting.enabled ? "Açık" : "Kapalı"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {setting.enabled ? "Kapat" : "Aç"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Gizlilik Ayarları */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Gizlilik Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {privacySettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{setting.title}</h4>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={setting.enabled ? "default" : "secondary"}>
                            {setting.enabled ? "Açık" : "Kapalı"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {setting.enabled ? "Kapat" : "Aç"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Şifre Değiştirme */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Şifre Değiştirme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mevcut Şifre</label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Mevcut şifrenizi girin"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Yeni Şifre</label>
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Yeni şifrenizi girin"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Yeni Şifre (Tekrar)</label>
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Yeni şifrenizi tekrar girin"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Güvenlik İpuçları:</strong>
                      </p>
                      <ul className="text-xs text-blue-700 mt-1 space-y-1">
                        <li>• En az 6 karakter kullanın</li>
                        <li>• Büyük ve küçük harf karışımı kullanın</li>
                        <li>• Sayı ve özel karakter ekleyin</li>
                        <li>• Kişisel bilgilerinizi şifre olarak kullanmayın</li>
                      </ul>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handlePasswordChange}
                      disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {isChangingPassword ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Backend Konfigürasyonu */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Backend Konfigürasyonu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Backend Tipi */}
                    <div>
                      <h4 className="font-medium mb-3">Backend Tipi</h4>
                      <Select value={config.type} onValueChange={(value: any) => setBackendType(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Backend tipi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mock">
                            <div className="flex items-center gap-2">
                              <Code className="w-4 h-4" />
                              <span>Mock Data (Test)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dotnet">
                            <div className="flex items-center gap-2">
                              <Server className="w-4 h-4" />
                              <span>.NET Core Backend</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="spring">
                            <div className="flex items-center gap-2">
                              <Server className="w-4 h-4" />
                              <span>Spring Boot Backend</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        Aktif: {config.type === "mock" ? "Mock Data" : config.type === "dotnet" ? ".NET Core" : "Spring Boot"}
                      </p>
                    </div>

                    {/* .NET Core URL */}
                    <div>
                      <h4 className="font-medium mb-3">.NET Core API URL</h4>
                      <Input
                        value={dotnetUrl}
                        onChange={(e) => setLocalDotnetUrl(e.target.value)}
                        placeholder="http://localhost:5000/api"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        .NET Core backend URL'i
                      </p>
                    </div>

                    {/* Spring Boot URL */}
                    <div>
                      <h4 className="font-medium mb-3">Spring Boot API URL</h4>
                      <Input
                        value={springUrl}
                        onChange={(e) => setLocalSpringUrl(e.target.value)}
                        placeholder="http://localhost:8080/api"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Spring Boot backend URL'i
                      </p>
                    </div>

                    {/* Mevcut URL */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Wifi className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium">Aktif API URL</h4>
                      </div>
                      <p className="text-sm font-mono break-all">
                        {getCurrentApiUrl() || "Mock Data Kullanılıyor"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveBackendConfig} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Ayarları Kaydet
                      </Button>
                      <Button 
                        onClick={handleTestConnection} 
                        variant="outline" 
                        disabled={isTestingConnection || config.type === "mock"}
                        className="flex-1"
                      >
                        <Wifi className="w-4 h-4 mr-2" />
                        {isTestingConnection ? "Test Ediliyor..." : "Bağlantıyı Test Et"}
                      </Button>
                    </div>

                    {config.type === "mock" && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Not:</strong> Mock data modu aktif. Backend bağlantısı test edilemez.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Görünüm Ayarları */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Görünüm Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Tema Seçimi */}
                    <div>
                      <h4 className="font-medium mb-3">Tema</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                          <Sun className="w-5 h-5" />
                          <span className="text-sm">Açık</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                          <Moon className="w-5 h-5" />
                          <span className="text-sm">Koyu</span>
                        </Button>
                        <Button className="h-20 flex flex-col gap-2">
                          <Monitor className="w-5 h-5" />
                          <span className="text-sm">Sistem</span>
                        </Button>
                      </div>
                    </div>

                    {/* Dil Seçimi */}
                    <div>
                      <h4 className="font-medium mb-3">Dil</h4>
                      <Select defaultValue="tr">
                        <SelectTrigger>
                          <SelectValue placeholder="Dil seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tr">Türkçe</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Zaman Dilimi */}
                    <div>
                      <h4 className="font-medium mb-3">Zaman Dilimi</h4>
                      <Select defaultValue="Europe/Istanbul">
                        <SelectTrigger>
                          <SelectValue placeholder="Zaman dilimi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Istanbul">İstanbul (GMT+3)</SelectItem>
                          <SelectItem value="Europe/London">Londra (GMT+0)</SelectItem>
                          <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Görünüm Ayarlarını Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Hesap Yönetimi */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Hesap Yönetimi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">Hesabı Dondur</h4>
                      <p className="text-sm text-yellow-700 mb-3">
                        Hesabınızı geçici olarak dondurur. Daha sonra tekrar aktifleştirebilirsiniz.
                      </p>
                      <Button variant="outline" size="sm" className="text-yellow-800 border-yellow-300">
                        Hesabı Dondur
                      </Button>
                    </div>

                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Hesabı Sil</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Hesabınızı kalıcı olarak siler. Bu işlem geri alınamaz.
                      </p>
                      <Button variant="outline" size="sm" className="text-red-800 border-red-300">
                        Hesabı Sil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
