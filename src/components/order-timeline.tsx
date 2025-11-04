"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  Calendar,
  User
} from "lucide-react";

export interface OrderStatus {
  id: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  timestamp: Date;
  description: string;
  location?: string;
  trackingNumber?: string;
}

export interface OrderTimelineProps {
  orderId: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  statusHistory: OrderStatus[];
  trackingNumber?: string;
  estimatedDelivery?: Date;
  deliveryAddress?: string;
  contactPhone?: string;
}

const statusConfig = {
  Pending: {
    color: "bg-yellow-500",
    icon: Clock,
    label: "Beklemede",
    description: "Siparişiniz alındı ve onay bekliyor"
  },
  Processing: {
    color: "bg-blue-500", 
    icon: Package,
    label: "Hazırlanıyor",
    description: "Siparişiniz hazırlanıyor"
  },
  Shipped: {
    color: "bg-purple-500",
    icon: Truck,
    label: "Kargoya Verildi",
    description: "Siparişiniz kargoya verildi"
  },
  Delivered: {
    color: "bg-green-500",
    icon: CheckCircle,
    label: "Teslim Edildi",
    description: "Siparişiniz başarıyla teslim edildi"
  },
  Cancelled: {
    color: "bg-red-500",
    icon: Clock,
    label: "İptal Edildi",
    description: "Siparişiniz iptal edildi"
  }
};

export const OrderTimeline = ({
  orderId,
  status,
  statusHistory,
  trackingNumber,
  estimatedDelivery,
  deliveryAddress,
  contactPhone
}: OrderTimelineProps) => {
  const currentStatusConfig = statusConfig[status];
  const CurrentStatusIcon = currentStatusConfig.icon;

  const getStatusIcon = (statusType: string) => {
    const config = statusConfig[statusType as keyof typeof statusConfig];
    return config.icon;
  };

  const getStatusColor = (statusType: string, isCompleted: boolean) => {
    const config = statusConfig[statusType as keyof typeof statusConfig];
    if (isCompleted) return "bg-green-500";
    if (statusType === status) return config.color;
    return "bg-gray-300";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getEstimatedDeliveryText = () => {
    if (!estimatedDelivery) return null;
    
    const now = new Date();
    const diffTime = estimatedDelivery.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Teslimat süresi geçti";
    if (diffDays === 0) return "Bugün teslim edilecek";
    if (diffDays === 1) return "Yarın teslim edilecek";
    return `${diffDays} gün içinde teslim edilecek`;
  };

  return (
    <div className="space-y-6">
      {/* Sipariş Durumu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${currentStatusConfig.color} text-white`}>
              <CurrentStatusIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-semibold">{currentStatusConfig.label}</div>
              <div className="text-sm text-muted-foreground">
                Sipariş #{orderId}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">{currentStatusConfig.description}</p>
            
            {trackingNumber && (
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Takip No: </span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {trackingNumber}
                </code>
              </div>
            )}

            {estimatedDelivery && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Tahmini Teslimat: {formatDate(estimatedDelivery)}
                </span>
                <Badge variant="outline" className="ml-2">
                  {getEstimatedDeliveryText()}
                </Badge>
              </div>
            )}

            {deliveryAddress && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Teslimat Adresi:</span>
                  <p className="text-sm text-muted-foreground">{deliveryAddress}</p>
                </div>
              </div>
            )}

            {contactPhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">İletişim: {contactPhone}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Durum Geçmişi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Sipariş Geçmişi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusHistory.map((statusItem, index) => {
              const StatusIcon = getStatusIcon(statusItem.status);
              const isCompleted = index < statusHistory.length - 1 || statusItem.status === status;
              const isCurrent = statusItem.status === status;
              
              return (
                <div key={statusItem.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : isCurrent ? statusConfig[statusItem.status].color : 'bg-gray-300'
                    } text-white`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    {index < statusHistory.length - 1 && (
                      <div className={`w-0.5 h-8 mt-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>

                  {/* Status Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{statusConfig[statusItem.status].label}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(statusItem.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {statusItem.description}
                    </p>
                    {statusItem.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {statusItem.location}
                      </div>
                    )}
                    {statusItem.trackingNumber && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Package className="w-3 h-3" />
                        Takip No: {statusItem.trackingNumber}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Eylemler */}
      <Card>
        <CardHeader>
          <CardTitle>Eylemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {status === "Shipped" && trackingNumber && (
              <Button variant="outline" size="sm">
                <Truck className="w-4 h-4 mr-2" />
                Kargo Takibi
              </Button>
            )}
            {status === "Delivered" && (
              <Button variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Teslimat Onayı
              </Button>
            )}
            {status === "Pending" && (
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Siparişi İptal Et
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Destek İletişim
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sipariş Detayları
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
