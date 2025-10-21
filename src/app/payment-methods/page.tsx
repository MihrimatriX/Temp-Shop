"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, CreditCard, Star } from "lucide-react";
import { PaymentMethodService } from "@/services/payment-method-service";

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
  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(
    null
  );
  const [formData, setFormData] = useState({
    type: "credit_card" as "credit_card" | "debit_card" | "bank_transfer",
    cardNumber: "",
    cardHolderName: "",
    expiryMonth: "",
    expiryYear: "",
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
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const paymentMethodService = new PaymentMethodService();
      const response = await paymentMethodService.getUserPaymentMethods(token);

      if (response.data.success) {
        setPaymentMethods(response.data.data);
      } else {
        console.error("Error fetching payment methods:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const paymentMethodService = new PaymentMethodService();

      if (editingMethod) {
        // Update existing payment method
        const updateData = {
          ...formData,
          expiryMonth: formData.expiryMonth
            ? parseInt(formData.expiryMonth)
            : undefined,
          expiryYear: formData.expiryYear
            ? parseInt(formData.expiryYear)
            : undefined,
        };
        const response = await paymentMethodService.updatePaymentMethod(
          editingMethod.id,
          updateData,
          token
        );

        if (response.data.success) {
          setPaymentMethods(
            paymentMethods.map((method) =>
              method.id === editingMethod.id ? response.data.data : method
            )
          );
        }
      } else {
        // Create new payment method
        const createData = {
          ...formData,
          expiryMonth: formData.expiryMonth
            ? parseInt(formData.expiryMonth)
            : undefined,
          expiryYear: formData.expiryYear
            ? parseInt(formData.expiryYear)
            : undefined,
        };
        const response = await paymentMethodService.createPaymentMethod(
          createData,
          token
        );

        if (response.data.success) {
          setPaymentMethods([...paymentMethods, response.data.data]);
        }
      }

      setShowForm(false);
      setEditingMethod(null);
      setFormData({
        type: "credit_card",
        cardNumber: "",
        cardHolderName: "",
        expiryMonth: "",
        expiryYear: "",
        isDefault: false,
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
      });
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
      expiryMonth: method.expiryMonth?.toString() || "",
      expiryYear: method.expiryYear?.toString() || "",
      isDefault: method.isDefault,
      bankName: method.bankName || "",
      accountNumber: method.accountNumber || "",
      accountHolderName: method.accountHolderName || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu ödeme yöntemini silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const paymentMethodService = new PaymentMethodService();
      const response = await paymentMethodService.deletePaymentMethod(
        id,
        token
      );

      if (response.data.success) {
        setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
      }
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const paymentMethodService = new PaymentMethodService();
      const response = await paymentMethodService.setDefaultPaymentMethod(
        id,
        token
      );

      if (response.data.success) {
        setPaymentMethods(
          paymentMethods.map((method) => ({
            ...method,
            isDefault: method.id === id,
          }))
        );
      }
    } catch (error) {
      console.error("Error setting default payment method:", error);
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case "credit_card":
        return "💳";
      case "debit_card":
        return "💳";
      case "bank_transfer":
        return "🏦";
      default:
        return "💳";
    }
  };

  const getPaymentMethodName = (type: string) => {
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ödeme yöntemleri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Ödeme Yöntemleri
          </h1>
          <p className="text-gray-600">
            Ödeme yöntemlerinizi görmek için giriş yapmanız gerekiyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ödeme Yöntemleri</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Ödeme Yöntemi
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
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
                <Label htmlFor="type">Ödeme Yöntemi Türü</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ödeme yöntemi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Kredi Kartı</SelectItem>
                    <SelectItem value="debit_card">Banka Kartı</SelectItem>
                    <SelectItem value="bank_transfer">Havale/EFT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type === "bank_transfer" ? (
                <>
                  <div>
                    <Label htmlFor="bankName">Banka Adı</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) =>
                        setFormData({ ...formData, bankName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Hesap Numarası</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountHolderName">Hesap Sahibi Adı</Label>
                    <Input
                      id="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountHolderName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="cardNumber">Kart Numarası</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: e.target.value })
                      }
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardHolderName">Kart Sahibi Adı</Label>
                    <Input
                      id="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cardHolderName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryMonth">Son Kullanma Ayı</Label>
                      <Input
                        id="expiryMonth"
                        type="number"
                        min="1"
                        max="12"
                        value={formData.expiryMonth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiryMonth: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryYear">Son Kullanma Yılı</Label>
                      <Input
                        id="expiryYear"
                        type="number"
                        min={new Date().getFullYear()}
                        value={formData.expiryYear}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiryYear: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData({ ...formData, isDefault: e.target.checked })
                  }
                  className="rounded"
                  title="Varsayılan ödeme yöntemi"
                />
                <Label htmlFor="isDefault">
                  Varsayılan ödeme yöntemi olarak ayarla
                </Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingMethod ? "Güncelle" : "Ekle"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMethod(null);
                    setFormData({
                      type: "credit_card",
                      cardNumber: "",
                      cardHolderName: "",
                      expiryMonth: "",
                      expiryYear: "",
                      isDefault: false,
                      bankName: "",
                      accountNumber: "",
                      accountHolderName: "",
                    });
                  }}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {paymentMethods.length === 0 ? (
        <div className="text-center py-12">
          <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henüz ödeme yönteminiz yok
          </h3>
          <p className="text-gray-600 mb-6">
            Hızlı ödeme için ödeme yöntemi ekleyin.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ödeme Yöntemi Ekle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {getPaymentMethodIcon(method.type)}
                    </span>
                    <div>
                      <CardTitle className="text-lg">
                        {getPaymentMethodName(method.type)}
                      </CardTitle>
                      {method.isDefault && (
                        <div className="flex items-center text-yellow-600 text-sm">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Varsayılan
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(method)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {method.type === "bank_transfer" ? (
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Banka:</strong> {method.bankName}
                    </p>
                    <p>
                      <strong>Hesap:</strong> {method.accountNumber}
                    </p>
                    <p>
                      <strong>Sahibi:</strong> {method.accountHolderName}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Kart:</strong> {method.cardNumber}
                    </p>
                    <p>
                      <strong>Sahibi:</strong> {method.cardHolderName}
                    </p>
                    <p>
                      <strong>Son Kullanma:</strong> {method.expiryMonth}/
                      {method.expiryYear}
                    </p>
                  </div>
                )}

                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Varsayılan Yap
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
