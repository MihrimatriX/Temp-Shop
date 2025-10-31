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
import { megaMenuData, getMegaMenuData, getCategoryIcon, popularCategories, allCategoriesData } from "@/data/mega-menu-data";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  ChevronDown,
  MapPin,
  Star,
  TrendingUp,
  ArrowRight,
  X,
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
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [selectedAllCategory, setSelectedAllCategory] = useState<string | null>(null);
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

  const handleCategoryHover = (categoryName: string) => {
    setHoveredCategory(categoryName);
    // Hover ile kategoriyi aktif yap
    if (!activeCategory) {
      setActiveCategory(categoryName);
    }
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    // Hover bittiğinde active category'yi temizle (click ile açılan hariç)
    setTimeout(() => {
      if (!hoveredCategory) {
        setActiveCategory(null);
      }
    }, 100);
  };

  const handleAllCategoriesToggle = () => {
    setIsAllCategoriesOpen(!isAllCategoriesOpen);
    if (isAllCategoriesOpen) {
      setSelectedAllCategory(null);
    }
  };

  const handleAllCategorySelect = (categoryId: string) => {
    setSelectedAllCategory(categoryId);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
        setHoveredCategory(null);
        setIsAllCategoriesOpen(false);
        setSelectedAllCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Body scroll lock for overlay menu
  useEffect(() => {
    if (isAllCategoriesOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isAllCategoriesOpen]);

  const categories = popularCategories;


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
            <div className="relative" ref={megaMenuRef}>
              <Button
                variant="ghost"
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={handleAllCategoriesToggle}
              >
                <Menu className="w-4 h-4" />
                <span>Tüm Kategoriler</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  isAllCategoriesOpen ? "rotate-180" : ""
                }`} />
              </Button>

              {/* Tüm Kategoriler Mega Menu */}
              {isAllCategoriesOpen && (
                <div className="fixed inset-0 z-[100]">
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/40" onClick={() => setIsAllCategoriesOpen(false)} />
                  {/* Popup Panel */}
                  <div className="absolute left-0 right-0 top-[72px] bottom-0 overflow-y-auto">
                    <div className="container mx-auto px-4 py-6">
                      <div className="bg-white rounded-lg shadow-xl border animate-in fade-in duration-200">
                        {/* Header with close button */}
                        <div className="flex items-center justify-between p-4 border-b">
                          <h2 className="text-xl font-semibold text-gray-800">Tüm Kategoriler</h2>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsAllCategoriesOpen(false)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-6 gap-6 p-6">
                      {/* Sol Panel - Ana Kategoriler */}
                          <div className="col-span-2">
                            <div className="space-y-1">
                          {allCategoriesData.categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                              <button
                                key={category.id}
                                className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-all duration-200 ${
                                  selectedAllCategory === category.id
                                    ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                                onClick={() => handleAllCategorySelect(category.id)}
                              >
                                <IconComponent className="w-5 h-5" />
                                <span className="font-medium">{category.name}</span>
                                <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                                  selectedAllCategory === category.id ? "rotate-180" : ""
                                }`} />
                              </button>
                            );
                          })}
                            </div>
                          </div>

                      {/* Sağ Panel - Alt Kategoriler */}
                          <div className="col-span-4">
                            {selectedAllCategory ? (
                              <div className="space-y-6">
                                {allCategoriesData.categories
                                  .find(cat => cat.id === selectedAllCategory)
                                  ?.subCategories.map((subCategory, index) => (
                                    <div key={index}>
                                      <h3 className="font-bold text-orange-600 text-lg mb-3 pb-2 border-b border-gray-200">
                                        {subCategory.title}
                                      </h3>
                                      <div className="grid grid-cols-3 gap-2">
                                        {subCategory.items.map((item, itemIndex) => (
                                          <Link
                                            key={itemIndex}
                                            href={`/categories/${selectedAllCategory}/${item.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")}`}
                                            className="text-gray-700 hover:text-purple-600 transition-colors text-sm py-1 px-2 rounded-md hover:bg-purple-50"
                                          >
                                            {item}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-64 text-gray-500">
                                <div className="text-center">
                                  <Menu className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                  <p className="text-lg font-medium">Kategori Seçin</p>
                                  <p className="text-sm">Sol taraftan bir kategori seçerek alt kategorilerini görüntüleyin</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {categories.map((category) => {
              const megaMenuDataForCategory = getMegaMenuData(category.name);
              const IconComponent = category.icon;
              
              return (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => handleCategoryHover(category.name)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <Button
                    variant="ghost"
                    className={`text-sm whitespace-nowrap flex items-center gap-2 transition-all duration-200 ${
                      (hoveredCategory === category.name || activeCategory === category.name)
                        ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                        : "hover:text-purple-600 hover:bg-purple-50"
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <IconComponent className={`w-4 h-4 transition-colors duration-200 ${
                      (hoveredCategory === category.name || activeCategory === category.name)
                        ? "text-purple-600"
                        : "text-muted-foreground"
                    }`} />
                    {category.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      (hoveredCategory === category.name || activeCategory === category.name)
                        ? "rotate-180"
                        : ""
                    }`} />
                  </Button>

                  {/* Mega Menu */}
                  {(hoveredCategory === category.name || activeCategory === category.name) && megaMenuDataForCategory && (
                    <div 
                      className="absolute top-full left-0 w-screen bg-white border-t shadow-xl z-50 animate-in slide-in-from-top-2 duration-200"
                      onMouseEnter={() => setHoveredCategory(category.name)}
                      onMouseLeave={handleCategoryLeave}
                    >
                      <div className="container mx-auto px-4 py-6">
                        <div className="grid grid-cols-6 gap-6">
                          {/* Sol tarafta kategori sütunları */}
                          <div className="col-span-4">
                            <div className="grid grid-cols-2 gap-6">
                              {megaMenuDataForCategory.columns && megaMenuDataForCategory.columns.map((column, index) => {
                                const ColumnIcon = column.icon;
                                return (
                                  <div key={index} className="space-y-3">
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                                      <ColumnIcon className="w-5 h-5 text-purple-600" />
                                      <h3 className="font-bold text-purple-600 text-base">
                                        {column.title}
                                      </h3>
                                    </div>
                                    <ul className="space-y-2">
                                      {column.items && column.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                          <Link
                                            href={item.href}
                                            className="text-gray-700 hover:text-purple-600 transition-all duration-200 text-sm flex items-center gap-2 group py-1 px-2 rounded-md hover:bg-purple-50"
                                          >
                                            <span className="flex-1">{item.name}</span>
                                            {item.isPopular && (
                                              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-600">
                                                Popüler
                                              </Badge>
                                            )}
                                            {item.isNew && (
                                              <Badge variant="default" className="text-xs bg-green-500 text-white">
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
                            </div>
                          </div>
                          
                          {/* Sağ tarafta öne çıkan ürünler ve kampanyalar */}
                          <div className="col-span-2 space-y-6">
                            {/* Öne çıkan ürünler */}
                            {megaMenuDataForCategory.featured && megaMenuDataForCategory.featured.length > 0 && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                                  <TrendingUp className="w-5 h-5 text-purple-600" />
                                  <h3 className="font-bold text-purple-600 text-base">
                                    Öne Çıkan Ürünler
                                  </h3>
                                </div>
                                <div className="space-y-3">
                                  {megaMenuDataForCategory.featured.slice(0, 4).map((product) => (
                                    <Link
                                      key={product.id}
                                      href={product.href}
                                      className="block p-3 border rounded-lg hover:shadow-md transition-all duration-200 group bg-gray-50 hover:bg-white hover:border-purple-200"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="relative">
                                          <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-14 h-14 object-cover rounded-lg"
                                            sizes="56px"
                                          />
                                          {product.discount && (
                                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                                              %{product.discount}
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-medium text-sm text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-1">
                                            {product.name}
                                          </h4>
                                          <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                              <span className="text-xs text-gray-600">
                                                {product.rating}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2 mt-1">
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
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Kampanya banner'ı */}
                            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-4 text-white">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">Özel Kampanya</span>
                              </div>
                              <h4 className="font-bold text-lg mb-1">Büyük İndirimler</h4>
                              <p className="text-sm opacity-90 mb-3">Tüm elektronik ürünlerde %50'ye varan indirimler</p>
                              <Link 
                                href="/campaigns"
                                className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                              >
                                Kampanyaları Gör
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
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
