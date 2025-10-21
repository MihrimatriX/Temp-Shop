"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Truck, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: "credit" | "debit" | "bank" | "cod";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Türkiye",
    paymentMethod: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Sepetiniz boş");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order
      const order = {
        orderNumber: `ORD-${Date.now()}`,
        items,
        totalAmount: totalPrice,
        totalQuantity: totalItems,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        createdAt: new Date(),
      };

      console.log("Order created:", order);

      // Clear cart
      clearCart();

      toast.success("Siparişiniz başarıyla oluşturuldu!");
      router.push(`/order-success?orderNumber=${order.orderNumber}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Sipariş oluşturulurken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">Sepetiniz Boş</h1>
          <p className="text-muted-foreground">
            Ödeme yapmak için önce sepetinize ürün ekleyin.
          </p>
          <Button asChild>
            <Link href="/products">Ürünleri Görüntüle</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sepete Dön
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Ödeme</h1>
        <p className="text-muted-foreground">
          Siparişinizi tamamlamak için bilgilerinizi girin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Teslimat Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ad *</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Soyad *
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    E-posta *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Telefon *
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Adres *
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Şehir *
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    İlçe *
                  </label>
                  <Input
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Posta Kodu *
                  </label>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Ödeme Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ödeme Yöntemi *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "credit", label: "Kredi Kartı" },
                    { value: "debit", label: "Banka Kartı" },
                    { value: "bank", label: "Havale/EFT" },
                    { value: "cod", label: "Kapıda Ödeme" },
                  ].map((method) => (
                    <Button
                      key={method.value}
                      type="button"
                      variant={
                        formData.paymentMethod === method.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        handleInputChange("paymentMethod", method.value)
                      }
                      className="justify-start"
                    >
                      {method.label}
                    </Button>
                  ))}
                </div>
              </div>

              {(formData.paymentMethod === "credit" ||
                formData.paymentMethod === "debit") && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Kart Üzerindeki İsim *
                    </label>
                    <Input
                      value={formData.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Kart Numarası *
                    </label>
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Son Kullanma Tarihi *
                      </label>
                      <Input
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        CVV *
                      </label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={
                          item.product.imageUrl || "/placeholder-product.jpg"
                        }
                        alt={item.product.productName}
                        fill
                        sizes="60px"
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Adet: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.product.unitPrice * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ürünler ({totalItems} adet)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span className="text-green-600">Ücretsiz</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Toplam</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "İşleniyor..." : "Siparişi Tamamla"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Güvenli ödeme ile korunuyorsunuz
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
