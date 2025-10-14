"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  addedAt: string;
}

export default function FavoritesPage() {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "price" | "name">("date");

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const mockFavorites: FavoriteProduct[] = [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          price: 299.99,
          originalPrice: 399.99,
          discount: 25,
          imageUrl: "/placeholder-product.jpg",
          rating: 4.5,
          reviewCount: 128,
          inStock: true,
          category: "Elektronik",
          addedAt: "2024-10-01T10:30:00Z",
        },
        {
          id: 2,
          name: "Smart Watch Series 8",
          price: 1299.99,
          originalPrice: 1499.99,
          discount: 13,
          imageUrl: "/placeholder-product.jpg",
          rating: 4.8,
          reviewCount: 256,
          inStock: true,
          category: "Elektronik",
          addedAt: "2024-10-02T14:20:00Z",
        },
        {
          id: 3,
          name: "Ergonomic Office Chair",
          price: 899.99,
          imageUrl: "/placeholder-product.jpg",
          rating: 4.2,
          reviewCount: 89,
          inStock: false,
          category: "Ev & Yaşam",
          addedAt: "2024-10-03T09:15:00Z",
        },
        {
          id: 4,
          name: "Running Shoes - Nike Air Max",
          price: 599.99,
          originalPrice: 699.99,
          discount: 14,
          imageUrl: "/placeholder-product.jpg",
          rating: 4.6,
          reviewCount: 342,
          inStock: true,
          category: "Spor & Outdoor",
          addedAt: "2024-10-04T16:45:00Z",
        },
      ];

      setFavorites(mockFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId: number) => {
    if (
      window.confirm(
        "Bu ürünü favorilerden çıkarmak istediğinizden emin misiniz?"
      )
    ) {
      setFavorites(favorites.filter((fav) => fav.id !== productId));
    }
  };

  const handleAddToCart = (product: FavoriteProduct) => {
    // Convert FavoriteProduct to Product format
    const productToAdd = {
      id: product.id,
      productName: product.name,
      unitPrice: product.price,
      unitInStock: product.inStock ? 100 : 0,
      quantityPerUnit: '1 adet',
      description: '',
      imageUrl: product.imageUrl,
      discount: product.discount || 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    addItem(productToAdd, 1);
  };

  const handleSort = (sortType: "date" | "price" | "name") => {
    setSortBy(sortType);
    const sorted = [...favorites].sort((a, b) => {
      switch (sortType) {
        case "date":
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case "price":
          return a.price - b.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    setFavorites(sorted);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Heart className="mx-auto h-24 w-24" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapın</h2>
          <p className="text-gray-600 mb-6">
            Favori ürünlerinizi görüntülemek için giriş yapmanız gerekiyor.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
          <p className="text-gray-600 mt-2">
            Beğendiğiniz ürünleri buradan takip edebilirsiniz.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Heart className="mx-auto h-24 w-24" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz favori ürününüz yok
            </h3>
            <p className="text-gray-600 mb-6">
              Beğendiğiniz ürünleri favorilere ekleyerek buradan takip
              edebilirsiniz!
            </p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <>
            {/* Sort and Filter Options */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sırala:</span>
                <div className="flex space-x-2">
                  <Button
                    variant={sortBy === "date" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("date")}
                  >
                    Tarihe Göre
                  </Button>
                  <Button
                    variant={sortBy === "price" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("price")}
                  >
                    Fiyata Göre
                  </Button>
                  <Button
                    variant={sortBy === "name" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("name")}
                  >
                    İsme Göre
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {favorites.length} ürün
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        %{product.discount} İndirim
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Stokta Yok
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleRemoveFavorite(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Favorilerden çıkar"
                      aria-label="Favorilerden çıkar"
                    >
                      <Heart className="w-5 h-5 fill-current text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₺{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₺{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Sepete Ekle
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFavorite(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Favorilere eklendi:{" "}
                      {new Date(product.addedAt).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            {favorites.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mr-4">
                  Tümünü Sepete Ekle
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  Tümünü Temizle
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
