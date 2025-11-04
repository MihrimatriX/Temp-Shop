"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-green-600">
            Siparişiniz Alındı!
          </h1>
          <p className="text-lg text-muted-foreground">
            Siparişiniz başarıyla oluşturuldu ve işleme alındı.
          </p>
          {orderNumber && (
            <p className="text-sm text-muted-foreground">
              Sipariş Numarası:{" "}
              <span className="font-mono font-semibold">{orderNumber}</span>
            </p>
          )}
        </div>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              Sipariş Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Sipariş Onaylandı</p>
                  <p className="text-sm text-muted-foreground">
                    Siparişiniz alındı ve işleme alındı
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Hazırlanıyor</p>
                  <p className="text-sm text-muted-foreground">
                    Ürünleriniz hazırlanıyor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-muted-foreground">
                    Kargoya Verildi
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kargo bilgileri e-posta ile gönderilecek
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sırada Ne Var?</h2>
          <div className="text-left space-y-2 text-muted-foreground">
            <p>• Sipariş detayları e-posta adresinize gönderildi</p>
            <p>• Ürünleriniz 1-2 iş günü içinde hazırlanacak</p>
            <p>• Kargo bilgileri hazırlık tamamlandığında gönderilecek</p>
            <p>
              • Siparişinizi takip etmek için sipariş numaranızı
              kullanabilirsiniz
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Alışverişe Devam Et
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
        </div>

        {/* Support */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Sorularınız için{" "}
            <Link href="/contact" className="text-primary hover:underline">
              müşteri hizmetlerimiz
            </Link>{" "}
            ile iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
