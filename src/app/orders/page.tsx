"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTimeline, OrderStatus } from "@/components/order-timeline";
import { OrderCardSkeleton } from "@/components/ui/skeleton";
import { Package, Calendar, CreditCard, MapPin, Eye, Clock } from "lucide-react";
import { OrderService } from "@/services/order-service";
import { OrderDto, OrderItemDto, AddressDto, PaymentMethodDto } from "@/types";


export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const orderService = new OrderService();
      const response = await orderService.getUserOrders(token);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        console.error("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Beklemede";
      case "processing":
        return "İşleniyor";
      case "shipped":
        return "Kargoya Verildi";
      case "delivered":
        return "Teslim Edildi";
      case "cancelled":
        return "İptal Edildi";
      default:
        return status;
    }
  };

  // Mock status history generator
  const generateStatusHistory = (order: OrderDto): OrderStatus[] => {
    const history: OrderStatus[] = [];
    const orderDate = new Date(order.createdAt);
    
    // Always start with pending
    history.push({
      id: "1",
      status: "Pending",
      timestamp: orderDate,
      description: "Siparişiniz alındı ve onay bekliyor",
    });

    // Add processing if not pending
    if (order.status !== "Pending") {
      const processingDate = new Date(orderDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
      history.push({
        id: "2",
        status: "Processing",
        timestamp: processingDate,
        description: "Siparişiniz hazırlanıyor",
      });
    }

    // Add shipped if shipped or delivered
    if (order.status === "Shipped" || order.status === "Delivered") {
      const shippedDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000); // 1 day later
      history.push({
        id: "3",
        status: "Shipped",
        timestamp: shippedDate,
        description: "Siparişiniz kargoya verildi",
        location: "İstanbul Kargo Merkezi",
        trackingNumber: `TRK${order.id.toString().padStart(6, '0')}`,
      });
    }

    // Add delivered if delivered
    if (order.status === "Delivered") {
      const deliveredDate = new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days later
      history.push({
        id: "4",
        status: "Delivered",
        timestamp: deliveredDate,
        description: "Siparişiniz başarıyla teslim edildi",
        location: order.shippingAddress.city,
      });
    }

    // Add cancelled if cancelled
    if (order.status === "Cancelled") {
      const cancelledDate = new Date(orderDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour later
      history.push({
        id: "2",
        status: "Cancelled",
        timestamp: cancelledDate,
        description: "Siparişiniz iptal edildi",
      });
    }

    return history;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Siparişlerim
          </h1>
          <p className="text-gray-600">
            Siparişlerinizi görmek için giriş yapmanız gerekiyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            {orders.length} sipariş
          </Badge>
          {selectedOrder && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedOrder(null)}
            >
              <Clock className="w-4 h-4 mr-2" />
              Sipariş Listesi
            </Button>
          )}
        </div>
      </div>

      {selectedOrder ? (
        <OrderTimeline
          orderId={selectedOrder.orderNumber}
          status={selectedOrder.status as any}
          statusHistory={generateStatusHistory(selectedOrder)}
          trackingNumber={selectedOrder.status === "Shipped" || selectedOrder.status === "Delivered" 
            ? `TRK${selectedOrder.id.toString().padStart(6, '0')}` 
            : undefined}
          estimatedDelivery={selectedOrder.status === "Shipped" 
            ? new Date(new Date(selectedOrder.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000)
            : undefined}
          deliveryAddress={`${selectedOrder.shippingAddress.fullAddress}, ${selectedOrder.shippingAddress.district}, ${selectedOrder.shippingAddress.city}`}
          contactPhone={selectedOrder.shippingAddress.phoneNumber}
        />
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henüz siparişiniz yok
          </h3>
          <p className="text-gray-600 mb-6">
            İlk siparişinizi vermek için ürünlerimizi keşfedin.
          </p>
          <Button asChild>
            <a href="/products">Ürünleri Keşfet</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Sipariş #{order.orderNumber}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {order.items.length} ürün
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(order.status)} mb-2`}>
                      {getStatusText(order.status)}
                    </Badge>
                    <div className="text-lg font-semibold">
                      ₺{order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold mb-3">Sipariş Detayları</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={
                              item.productImageUrl || "/placeholder-product.jpg"
                            }
                            alt={item.productName}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">
                              {item.productName}
                            </h5>
                            <p className="text-xs text-gray-600">
                              Adet: {item.quantity} × ₺
                              {item.unitPrice.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-sm font-medium">
                            ₺{item.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="space-y-4">
                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Teslimat Adresi
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">
                          {order.shippingAddress.title}
                        </p>
                        <p>{order.shippingAddress.fullAddress}</p>
                        <p>
                          {order.shippingAddress.district},{" "}
                          {order.shippingAddress.city}{" "}
                          {order.shippingAddress.postalCode}
                        </p>
                        {order.shippingAddress.phoneNumber && (
                          <p>{order.shippingAddress.phoneNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Ödeme Yöntemi
                      </h4>
                      <div className="text-sm text-gray-600">
                        {order.paymentMethod.type === "credit_card" && (
                          <>
                            <p>Kredi Kartı</p>
                            <p>{order.paymentMethod.cardNumber}</p>
                            <p>{order.paymentMethod.cardHolderName}</p>
                          </>
                        )}
                        {order.paymentMethod.type === "debit_card" && (
                          <>
                            <p>Banka Kartı</p>
                            <p>{order.paymentMethod.cardNumber}</p>
                            <p>{order.paymentMethod.cardHolderName}</p>
                          </>
                        )}
                        {order.paymentMethod.type === "bank_transfer" && (
                          <>
                            <p>Havale/EFT</p>
                            <p>{order.paymentMethod.bankName}</p>
                            <p>{order.paymentMethod.accountNumber}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Sipariş Takibi
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
