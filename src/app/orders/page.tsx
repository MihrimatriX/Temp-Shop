'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
}

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockOrders: Order[] = [
        {
          id: 1,
          orderNumber: 'ORD-2024-001',
          status: 'Delivered',
          totalAmount: 299.99,
          createdAt: '2024-10-01T10:30:00Z',
          items: [
            {
              id: 1,
              productName: 'Wireless Headphones',
              quantity: 1,
              unitPrice: 299.99,
              imageUrl: '/placeholder-product.jpg'
            }
          ]
        },
        {
          id: 2,
          orderNumber: 'ORD-2024-002',
          status: 'Shipped',
          totalAmount: 149.50,
          createdAt: '2024-10-05T14:20:00Z',
          items: [
            {
              id: 2,
              productName: 'Smart Watch',
              quantity: 1,
              unitPrice: 149.50,
              imageUrl: '/placeholder-product.jpg'
            }
          ]
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'Teslim Edildi';
      case 'shipped':
        return 'Kargoya Verildi';
      case 'processing':
        return 'Hazırlanıyor';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapın</h2>
          <p className="text-gray-600 mb-6">Siparişlerinizi görüntülemek için giriş yapmanız gerekiyor.</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
          <p className="text-gray-600 mt-2">Tüm siparişlerinizi buradan takip edebilirsiniz.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz siparişiniz yok</h3>
            <p className="text-gray-600 mb-6">İlk siparişinizi vermek için alışverişe başlayın!</p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Sipariş #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </div>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ₺{order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl || '/placeholder-product.jpg'}
                            alt={item.productName}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Adet: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₺{(item.unitPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      Sipariş Detayı
                    </button>
                    {order.status.toLowerCase() === 'delivered' && (
                      <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-300 rounded-md hover:bg-purple-200">
                        Tekrar Sipariş Ver
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
