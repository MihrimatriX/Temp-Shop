"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Edit, Trash2, Shield, Check } from "lucide-react";

interface PaymentMethod {
  id: number;
  type: "credit_card" | "debit_card" | "bank_transfer";
  cardNumber?: string;
  cardHolderName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
}

export default function PaymentMethodsPage() {
  const { user } = useAuthStore();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(
    null
  );

  const [formData, setFormData] = useState({
    type: "credit_card" as "credit_card" | "debit_card" | "bank_transfer",
    cardNumber: "",
    cardHolderName: "",
    expiryMonth: 1,
    expiryYear: 2024,
    isDefault: false,
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockMethods: PaymentMethod[] = [
        {
          id: 1,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
        },
        {
          id: 2,
          type: "debit_card",
          cardNumber: "**** **** **** 5678",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 8,
          expiryYear: 2025,
          isDefault: false,
        },
        {
          id: 3,
          type: "bank_transfer",
          bankName: "Ziraat Bankası",
          accountNumber: "****1234",
          accountHolderName: "Ahmet Yılmaz",
          isDefault: false,
        },
      ];

      setPaymentMethods(mockMethods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMethod) {
        // Update existing method
        setPaymentMethods(
          paymentMethods.map((method) =>
            method.id === editingMethod.id
              ? { ...formData, id: editingMethod.id }
              : method
          )
        );
      } else {
        // Add new method
        const newMethod: PaymentMethod = {
          ...formData,
          id: Date.now(), // Mock ID
        };
        setPaymentMethods([...paymentMethods, newMethod]);
      }

      setShowAddForm(false);
      setEditingMethod(null);
      resetForm();
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      cardNumber: method.cardNumber || "",
      cardHolderName: method.cardHolderName || "",
      expiryMonth: method.expiryMonth || 1,
      expiryYear: method.expiryYear || new Date().getFullYear(),
      isDefault: method.isDefault,
      bankName: method.bankName || "",
      accountNumber: method.accountNumber || "",
      accountHolderName: method.accountHolderName || "",
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Bu ödeme yöntemini silmek istediğinizden emin misiniz?")
    ) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    }
  };

  const handleSetDefault = async (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const resetForm = () => {
    setFormData({
      type: "credit_card",
      cardNumber: "",
      cardHolderName: "",
      expiryMonth: 1,
      expiryYear: 2024,
      isDefault: false,
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "credit_card":
        return "Kredi Kartı";
      case "debit_card":
        return "Banka Kartı";
      case "bank_transfer":
        return "Havale/EFT";
      default:
        return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "credit_card":
      case "debit_card":
        return <CreditCard className="w-5 h-5" />;
      case "bank_transfer":
        return <Shield className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <CreditCard className="mx-auto h-24 w-24" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapın</h2>
          <p className="text-gray-600 mb-6">
            Ödeme yöntemlerinizi yönetmek için giriş yapmanız gerekiyor.
          </p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Ödeme Yöntemlerim
          </h1>
          <p className="text-gray-600 mt-2">
            Ödeme yöntemlerinizi buradan yönetebilirsiniz.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add/Edit Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingMethod
                      ? "Ödeme Yöntemini Düzenle"
                      : "Yeni Ödeme Yöntemi Ekle"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ödeme Yöntemi Türü
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        title="Ödeme yöntemi türü"
                        aria-label="Ödeme yöntemi türü"
                      >
                        <option value="credit_card">Kredi Kartı</option>
                        <option value="debit_card">Banka Kartı</option>
                        <option value="bank_transfer">Havale/EFT</option>
                      </select>
                    </div>

                    {formData.type === "bank_transfer" ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Banka Adı
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.bankName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bankName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Ziraat Bankası"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hesap Sahibi Adı
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.accountHolderName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accountHolderName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Ahmet Yılmaz"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hesap Numarası
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.accountNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accountNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="1234567890"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kart Numarası
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kart Sahibi Adı
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cardHolderName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardHolderName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="AHMET YILMAZ"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Son Kullanma Ayı
                            </label>
                            <select
                              value={formData.expiryMonth}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  expiryMonth: parseInt(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              title="Son kullanma ayı"
                              aria-label="Son kullanma ayı"
                            >
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {String(i + 1).padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Son Kullanma Yılı
                            </label>
                            <select
                              value={formData.expiryYear}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  expiryYear: parseInt(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              title="Son kullanma yılı"
                              aria-label="Son kullanma yılı"
                            >
                              {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={2024 + i}>
                                  {2024 + i}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={formData.isDefault}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isDefault: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isDefault"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Varsayılan ödeme yöntemi olarak ayarla
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingMethod(null);
                          resetForm();
                        }}
                      >
                        İptal
                      </Button>
                      <Button type="submit">
                        {editingMethod ? "Güncelle" : "Kaydet"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods List */}
            {paymentMethods.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CreditCard className="mx-auto h-24 w-24" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Henüz ödeme yöntemi eklenmemiş
                </h3>
                <p className="text-gray-600 mb-6">
                  İlk ödeme yönteminizi ekleyerek alışverişe başlayın!
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ödeme Yöntemi Ekle
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Kayıtlı Ödeme Yöntemleri
                  </h2>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Ekle
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className="relative">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(method.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {getTypeLabel(method.type)}
                              </h3>
                              {method.isDefault && (
                                <Badge className="mt-1 bg-purple-100 text-purple-800">
                                  Varsayılan
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(method)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(method.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          {method.type === "bank_transfer" ? (
                            <>
                              <p>
                                <strong>Banka:</strong> {method.bankName}
                              </p>
                              <p>
                                <strong>Hesap Sahibi:</strong>{" "}
                                {method.accountHolderName}
                              </p>
                              <p>
                                <strong>Hesap No:</strong>{" "}
                                {method.accountNumber}
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                <strong>Kart Numarası:</strong>{" "}
                                {method.cardNumber}
                              </p>
                              <p>
                                <strong>Kart Sahibi:</strong>{" "}
                                {method.cardHolderName}
                              </p>
                              <p>
                                <strong>Son Kullanma:</strong>{" "}
                                {String(method.expiryMonth).padStart(2, "0")}/
                                {method.expiryYear}
                              </p>
                            </>
                          )}
                        </div>

                        {!method.isDefault && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefault(method.id)}
                              className="w-full"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Varsayılan Yap
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
