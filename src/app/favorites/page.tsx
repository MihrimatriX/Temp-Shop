"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { FavoriteService } from "@/services/favorite-service";
import { FavoriteDto } from "@/types";

export default function FavoritesPage() {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [favorites, setFavorites] = useState<FavoriteDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const favoriteService = new FavoriteService();
      const response = await favoriteService.getUserFavorites(token);

      if (response.data.success) {
        setFavorites(response.data.data);
      } else {
        console.error("Error fetching favorites:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const favoriteService = new FavoriteService();
      const response = await favoriteService.removeFromFavorites(
        productId,
        token
      );

      if (response.data.success) {
        setFavorites(favorites.filter((fav) => fav.productId !== productId));
      } else {
        console.error("Error removing from favorites:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleAddToCart = (product: FavoriteDto) => {
    addItem(
      {
        id: product.productId,
        productName: product.productName,
        unitPrice: product.productPrice,
        imageUrl: product.productImageUrl || "/placeholder-product.jpg",
        category: {
          id: 1,
          categoryName: product.productCategory || "Genel",
          isActive: true,
        },
        unitInStock: product.productInStock ? 100 : 0,
        quantityPerUnit: "1 adet",
        isActive: true,
        description: "",
        discount: product.productDiscount,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      1
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Favoriler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Favoriler</h1>
          <p className="text-gray-600">
            Favorilerinizi görmek için giriş yapmanız gerekiyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
        <Badge variant="secondary" className="text-sm">
          {favorites.length} ürün
        </Badge>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henüz favori ürününüz yok
          </h3>
          <p className="text-gray-600 mb-6">
            Beğendiğiniz ürünleri favorilere ekleyerek burada görebilirsiniz.
          </p>
          <Button asChild>
            <a href="/products">Ürünleri Keşfet</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.productImageUrl || "/placeholder-product.jpg"}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveFromFavorites(product.productId)}
                >
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </Button>
                {product.productDiscount && product.productDiscount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    %{product.productDiscount} İndirim
                  </Badge>
                )}
                {!product.productInStock && (
                  <Badge
                    variant="destructive"
                    className="absolute bottom-2 left-2"
                  >
                    Stokta Yok
                  </Badge>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.productName}
                </h3>

                {product.productCategory && (
                  <p className="text-sm text-gray-500 mb-2">
                    {product.productCategory}
                  </p>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₺{product.productPrice.toFixed(2)}
                    </span>
                    {product.productDiscount && product.productDiscount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₺
                        {(
                          product.productPrice /
                          (1 - product.productDiscount / 100)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.productInStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Sepete Ekle
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromFavorites(product.productId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
