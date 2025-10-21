import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Star,
  ShoppingBag,
  Truck,
  Gift,
  AlertCircle,
  Settings,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Archive
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bildirimler - E-Ticaret Sitesi",
  description:
    "Bildirimlerinizi yönetin. Sipariş durumları, kampanyalar ve özel fırsatlar hakkında güncel kalın.",
};

const notifications = [
  {
    id: 1,
    title: "Siparişiniz Kargoya Verildi",
    message: "ORD-123456 numaralı siparişiniz kargoya verildi. Takip numarası: 1234567890",
    type: "shipping",
    icon: Truck,
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
    priority: "high"
  },
  {
    id: 2,
    title: "Yeni Kampanya Başladı",
    message: "Elektronik ürünlerde %30'a varan indirimler başladı. Hemen keşfedin!",
    type: "campaign",
    icon: Gift,
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 saat önce
    priority: "medium"
  },
  {
    id: 3,
    title: "Favori Ürününüz İndirimde",
    message: "Favorilerinizdeki 'iPhone 15 Pro Max' ürünü %15 indirimle satışta!",
    type: "favorite",
    icon: Star,
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 saat önce
    priority: "low"
  },
  {
    id: 4,
    title: "Siparişiniz Teslim Edildi",
    message: "ORD-123455 numaralı siparişiniz başarıyla teslim edildi. Değerlendirmenizi bekliyoruz.",
    type: "delivery",
    icon: CheckCircle,
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 gün önce
    priority: "high"
  },
  {
    id: 5,
    title: "Sepetinizde Ürün Kaldı",
    message: "Sepetinizde 3 ürün bekliyor. Siparişinizi tamamlamayı unutmayın!",
    type: "cart",
    icon: ShoppingBag,
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
    priority: "medium"
  },
  {
    id: 6,
    title: "Hesap Güvenliği",
    message: "Hesabınızda yeni bir cihazdan giriş yapıldı. Eğer bu siz değilseniz, şifrenizi değiştirin.",
    type: "security",
    icon: AlertCircle,
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 gün önce
    priority: "high"
  },
  {
    id: 7,
    title: "Premium Üyelik Avantajları",
    message: "Premium üyelik avantajlarından yararlanın. Ücretsiz kargo ve özel indirimler sizi bekliyor.",
    type: "premium",
    icon: Star,
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 gün önce
    priority: "low"
  },
  {
    id: 8,
    title: "Yeni Ürün Önerisi",
    message: "Beğenebileceğiniz yeni ürünler keşfedin. Kişiselleştirilmiş önerilerimizi inceleyin.",
    type: "recommendation",
    icon: Gift,
    isRead: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 hafta önce
    priority: "low"
  }
];

const notificationTypes = [
  { id: "all", label: "Tümü", count: notifications.length },
  { id: "unread", label: "Okunmamış", count: notifications.filter(n => !n.isRead).length },
  { id: "shipping", label: "Kargo", count: notifications.filter(n => n.type === "shipping").length },
  { id: "campaign", label: "Kampanya", count: notifications.filter(n => n.type === "campaign").length },
  { id: "security", label: "Güvenlik", count: notifications.filter(n => n.type === "security").length }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "shipping":
      return Truck;
    case "campaign":
      return Gift;
    case "favorite":
      return Star;
    case "delivery":
      return CheckCircle;
    case "cart":
      return ShoppingBag;
    case "security":
      return AlertCircle;
    case "premium":
      return Star;
    case "recommendation":
      return Gift;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "shipping":
      return "text-blue-600";
    case "campaign":
      return "text-purple-600";
    case "favorite":
      return "text-yellow-600";
    case "delivery":
      return "text-green-600";
    case "cart":
      return "text-orange-600";
    case "security":
      return "text-red-600";
    case "premium":
      return "text-pink-600";
    case "recommendation":
      return "text-indigo-600";
    default:
      return "text-gray-600";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "Az önce";
  } else if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} gün önce`;
  }
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bildirimler</h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount} okunmamış bildirim
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Ayarlar
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
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
                  {notificationTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="ghost"
                      className="w-full justify-between"
                    >
                      <span>{type.label}</span>
                      <Badge variant="secondary">{type.count}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Tümünü Okundu İşaretle
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Archive className="w-4 h-4 mr-2" />
                    Eski Bildirimleri Arşivle
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Tümünü Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                const priorityColor = getPriorityColor(notification.priority);

                return (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow ${
                      !notification.isRead ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${iconColor}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h3>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                                <Badge className={priorityColor} variant="secondary">
                                  {notification.priority === 'high' ? 'Yüksek' : 
                                   notification.priority === 'medium' ? 'Orta' : 'Düşük'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTimeAgo(notification.createdAt)}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Daha Fazla Yükle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
