"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { CartModal } from "@/components/cart-modal";
import { AccountModal } from "@/components/account-modal";
import { BackendSwitch } from "@/components/backend-switch";
import { LocationModal } from "@/components/location-modal";
import { SearchPopup } from "@/components/search-popup";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SubCategoryService } from "@/services/subcategory-service";
import { SubCategory } from "@/types";
import { megaMenuData, getMegaMenuData, getCategoryIcon, popularCategories } from "@/data/mega-menu-data";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  ChevronDown,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react";

export function Navigation() {
  const router = useRouter();
  const { totalItems } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("İstanbul");
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // SubCategory'leri yükle
  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        setLoading(true);
        const subCategoryService = new SubCategoryService();
        const response = await subCategoryService.getSubCategories();
        if (response.data.success) {
          setSubCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error loading subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleSearchInputFocus = () => {
    setIsSearchOpen(true);
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location.fullAddress);
    setIsLocationOpen(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
        setHoveredCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = popularCategories;

  // Mega menu data'yı al
  const getMegaMenuDataForCategory = (categoryName: string) => {
    return getMegaMenuData(categoryName);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gray-100 text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/orders" className="hover:text-primary">
                Siparişlerim
              </Link>
              <Link href="/addresses" className="hover:text-primary">
                Adreslerim
              </Link>
              <Link href="/payment-methods" className="hover:text-primary">
                Ödeme Yöntemlerim
              </Link>
              <Link href="/campaigns" className="hover:text-primary">
                Süper Fiyat, Süper Teklif
              </Link>
              <Link href="/international" className="hover:text-primary">
                Yurt Dışından
              </Link>
              <Link href="/campaigns" className="hover:text-primary">
                Kampanyalar
              </Link>
              <Link href="/api-test" className="hover:text-primary">
                API Test
              </Link>
              <Link href="/entrepreneur-women" className="hover:text-primary">
                Girişimci Kadınlar
              </Link>
              <Link href="/customer-service" className="hover:text-primary">
                Müşteri Hizmetleri
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/premium" className="hover:text-primary">
                Hepsiburada Premium
              </Link>
              <Link href="/seller" className="hover:text-primary">
                Hepsiburada'da Satıcı Ol
              </Link>
            </div>
          </div>
        </div>
      </div>

             {/* Main Header */}
             <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
               <div className="container mx-auto px-4">
                 <div className="flex h-16 items-center justify-between">
                   {/* Mobile Menu & Logo */}
                   <div className="flex items-center gap-4">
                     <MobileNavigation
                       selectedLocation={selectedLocation}
                       onLocationClick={() => setIsLocationOpen(true)}
                       searchTerm={searchTerm}
                       onSearchTermChange={setSearchTerm}
                       onSearchSubmit={handleSearch}
                       onSearchFocus={handleSearchInputFocus}
                     />
                     <Link href="/" className="flex items-center space-x-2">
                       <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                         <span className="text-white font-bold text-sm">E</span>
                       </div>
                       <div>
                         <span className="font-bold text-xl text-purple-600">
                           E-Ticaret
                         </span>
                         <div className="text-xs text-muted-foreground">
                           Premium'u keşfet
                         </div>
                       </div>
                     </Link>
                   </div>

                   {/* Search Bar - Hidden on mobile */}
                   <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                     <form onSubmit={handleSearch} className="relative w-full">
                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                       <Input
                         type="text"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         onFocus={handleSearchInputFocus}
                         placeholder="Ürün, kategori veya marka ara"
                         className="w-full pl-10 pr-4 py-3"
                       />
                     </form>
                   </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden lg:block">
                <BackendSwitch />
              </div>

              <Button 
                variant="ghost" 
                className="hidden md:flex items-center gap-2"
                onClick={() => setIsLocationOpen(true)}
              >
                <MapPin className="w-4 h-4" />
                <span>{selectedLocation}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>

              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2"
                onClick={() => setIsAccountOpen(true)}
              >
                <User className="w-4 h-4" />
                <span>
                  {isAuthenticated ? `Hesabım ${user?.firstName}` : "Hesabım"}
                </span>
                <ChevronDown className="w-3 h-3" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation - Hidden on mobile */}
      <nav className="hidden md:block bg-white border-b relative" ref={megaMenuRef}>
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">
            <Button
              variant="ghost"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Menu className="w-4 h-4" />
              <span>Kategoriler</span>
            </Button>

            {categories.map((category) => {
              const megaMenuData = getMegaMenuDataForCategory(category.name);
              const IconComponent = category.icon;
              
              return (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredCategory(category.name);
                    // Eğer başka bir kategori aktifse, hover ile değiştir
                    if (activeCategory && activeCategory !== category.name) {
                      setActiveCategory(category.name);
                    }
                  }}
                  onMouseLeave={() => {
                    // Sadece hover'ı temizle, active category'yi koru
                    setHoveredCategory(null);
                  }}
                >
                  <Button
                    variant="ghost"
                    className={`text-sm whitespace-nowrap flex items-center gap-2 ${
                      (hoveredCategory === category.name || activeCategory === category.name)
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                    <ChevronDown className="w-3 h-3" />
                  </Button>

                  {/* Mega Menu */}
                  {(hoveredCategory === category.name || activeCategory === category.name) && megaMenuData && (
                    <div className="absolute top-full left-0 w-screen bg-white border-t shadow-xl z-50">
                      <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-5 gap-8">
                          {/* Kategori sütunları */}
                          {megaMenuData.columns.map((column, index) => {
                            const ColumnIcon = column.icon;
                            return (
                              <div key={index} className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <ColumnIcon className="w-5 h-5 text-purple-600" />
                                  <h3 className="font-bold text-purple-600 text-lg">
                                    {column.title}
                                  </h3>
                                </div>
                                <ul className="space-y-2">
                                  {column.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                      <Link
                                        href={item.href}
                                        className="text-gray-700 hover:text-purple-600 transition-colors text-sm flex items-center gap-2 group"
                                      >
                                        {item.name}
                                        {item.isPopular && (
                                          <Badge variant="secondary" className="text-xs">
                                            Popüler
                                          </Badge>
                                        )}
                                        {item.isNew && (
                                          <Badge variant="default" className="text-xs bg-green-500">
                                            Yeni
                                          </Badge>
                                        )}
                                        {item.isSale && (
                                          <Badge variant="destructive" className="text-xs">
                                            İndirim
                                          </Badge>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                          
                          {/* Öne çıkan ürünler sütunu */}
                          {megaMenuData.featured && megaMenuData.featured.length > 0 && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                                <h3 className="font-bold text-purple-600 text-lg">
                                  Öne Çıkan Ürünler
                                </h3>
                              </div>
                              <div className="space-y-3">
                                {megaMenuData.featured.map((product) => (
                                  <Link
                                    key={product.id}
                                    href={product.href}
                                    className="block p-3 border rounded-lg hover:shadow-md transition-shadow group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                        sizes="48px"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                                          {product.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                          <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-xs text-gray-600">
                                              {product.rating}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <span className="text-sm font-bold text-purple-600">
                                              {product.price.toLocaleString("tr-TR")} ₺
                                            </span>
                                            {product.originalPrice && (
                                              <span className="text-xs text-gray-500 line-through">
                                                {product.originalPrice.toLocaleString("tr-TR")} ₺
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        {product.discount && (
                                          <Badge variant="destructive" className="text-xs mt-1">
                                            %{product.discount} İndirim
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

             {/* Modals */}
             <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
             <AccountModal
               isOpen={isAccountOpen}
               onClose={() => setIsAccountOpen(false)}
             />
             <LocationModal
               isOpen={isLocationOpen}
               onClose={() => setIsLocationOpen(false)}
               onLocationSelect={handleLocationSelect}
             />
             <SearchPopup
               isOpen={isSearchOpen}
               onClose={() => setIsSearchOpen(false)}
               searchTerm={searchTerm}
               onSearchTermChange={setSearchTerm}
             />
    </>
  );
}
