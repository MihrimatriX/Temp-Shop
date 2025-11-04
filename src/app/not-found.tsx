"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-purple-600 mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Lütfen URL'yi
            kontrol edin veya ana sayfaya dönün.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Ürünleri Görüntüle
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                const searchInput = document.querySelector(
                  'input[placeholder*="ara"]'
                ) as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus();
                }
              }}
            >
              <Search className="w-4 h-4 mr-2" />
              Arama Yap
            </Button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Popüler Sayfalar
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/categories"
              className="text-purple-600 hover:text-purple-700"
            >
              Kategoriler
            </Link>
            <Link
              href="/campaigns"
              className="text-purple-600 hover:text-purple-700"
            >
              Kampanyalar
            </Link>
            <Link
              href="/orders"
              className="text-purple-600 hover:text-purple-700"
            >
              Siparişlerim
            </Link>
            <Link
              href="/favorites"
              className="text-purple-600 hover:text-purple-700"
            >
              Favorilerim
            </Link>
            <Link
              href="/addresses"
              className="text-purple-600 hover:text-purple-700"
            >
              Adreslerim
            </Link>
            <Link
              href="/payment-methods"
              className="text-purple-600 hover:text-purple-700"
            >
              Ödeme Yöntemlerim
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
          <h4 className="text-sm font-medium text-purple-900 mb-2">
            Yardıma mı ihtiyacınız var?
          </h4>
          <p className="text-sm text-purple-700 mb-3">
            Sorunuzun cevabını bulamadıysanız müşteri hizmetlerimizle iletişime
            geçin.
          </p>
          <Link href="/customer-service">
            <Button
              variant="outline"
              size="sm"
              className="text-purple-700 border-purple-300 hover:bg-purple-100"
            >
              Müşteri Hizmetleri
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
