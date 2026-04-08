"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
import { ThemeToggle } from "@/components/theme-toggle";
import { SubCategoryService } from "@/services/subcategory-service";
import { SubCategory } from "@/types";
import {
  getMegaMenuData,
  getCategoryNavLabel,
  popularCategories,
  allCategoriesData,
  slugifyCategoryItemForHref,
} from "@/data/mega-menu-data";
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
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [selectedAllCategory, setSelectedAllCategory] = useState<string | null>(
    null,
  );
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("İstanbul");
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledCategoryClose = () => {
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const scheduleCloseCategoryMenu = () => {
    cancelScheduledCategoryClose();
    leaveTimerRef.current = setTimeout(() => {
      setOpenCategory(null);
      leaveTimerRef.current = null;
    }, 200);
  };

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

  const handleCategoryButtonEnter = (categoryId: string) => {
    cancelScheduledCategoryClose();
    setIsAllCategoriesOpen(false);
    setOpenCategory(categoryId);
  };

  const handleCategoryButtonClick = (categoryId: string) => {
    cancelScheduledCategoryClose();
    setIsAllCategoriesOpen(false);
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleAllCategoriesToggle = () => {
    setOpenCategory(null);
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
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(null);
        setIsAllCategoriesOpen(false);
        setSelectedAllCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current !== null) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };
  }, []);

  const categories = popularCategories;

  const openMegaData = useMemo(
    () => (openCategory ? getMegaMenuData(openCategory) : null),
    [openCategory],
  );

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-muted/60 border-b border-border text-sm py-2 text-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-0.5 md:pb-0 min-w-0">
              <Link
                href="/orders"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Siparişlerim
              </Link>
              <Link
                href="/addresses"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Adreslerim
              </Link>
              <Link
                href="/payment-methods"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Ödeme Yöntemlerim
              </Link>
              <Link
                href="/campaigns"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Süper Fiyat, Süper Teklif
              </Link>
              <Link
                href="/international"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Yurt Dışından
              </Link>
              <Link
                href="/campaigns"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Kampanyalar
              </Link>
              <Link
                href="/api-test"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                API Test
              </Link>
              <Link
                href="/entrepreneur-women"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Girişimci Kadınlar
              </Link>
              <Link
                href="/customer-service"
                className="hover:text-primary whitespace-nowrap shrink-0"
              >
                Müşteri Hizmetleri
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <Link href="/premium" className="hover:text-primary whitespace-nowrap">
                Premium Üyelik
              </Link>
              <Link href="/seller" className="hover:text-primary whitespace-nowrap">
                Satıcı Ol
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
              <ThemeToggle />
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

      {/* Category Navigation — mega panel overflow dışında, mobilde de görünür */}
      <nav className="bg-background border-b border-border">
        <div
          ref={megaMenuRef}
          className="container mx-auto px-2 sm:px-4 relative"
          onMouseEnter={cancelScheduledCategoryClose}
          onMouseLeave={scheduleCloseCategoryMenu}
        >
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 py-2 sm:py-3 overflow-x-auto scrollbar-hide">
            <div className="relative shrink-0">
              <Button
                variant="ghost"
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={handleAllCategoriesToggle}
              >
                <Menu className="w-4 h-4" />
                <span>Tüm Kategoriler</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isAllCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* Tüm Kategoriler Mega Menu */}
              {isAllCategoriesOpen && (
                <div className="fixed inset-0 z-[100]">
                  {/* Backdrop */}
                  <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setIsAllCategoriesOpen(false)}
                  />
                  {/* Popup Panel */}
                  <div className="absolute left-0 right-0 top-[72px] bottom-0 overflow-y-auto">
                    <div className="container mx-auto px-4 py-6">
                      <div className="bg-card rounded-lg shadow-xl border border-border animate-in fade-in duration-200">
                        {/* Header with close button */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                          <h2 className="text-xl font-semibold text-foreground">
                            Tüm Kategoriler
                          </h2>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsAllCategoriesOpen(false)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 p-4 sm:p-6">
                          {/* Sol Panel - Ana Kategoriler */}
                          <div className="md:col-span-2 min-w-0">
                            <div className="space-y-1">
                              {allCategoriesData.categories.map((category) => {
                                const IconComponent = category.icon;
                                return (
                                  <button
                                    key={category.id}
                                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-all duration-200 ${
                                      selectedAllCategory === category.id
                                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                                        : "hover:bg-muted/80 text-foreground"
                                    }`}
                                    onClick={() =>
                                      handleAllCategorySelect(category.id)
                                    }
                                  >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="font-medium">
                                      {category.name}
                                    </span>
                                    <ChevronDown
                                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                                        selectedAllCategory === category.id
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sağ Panel - Alt Kategoriler */}
                          <div className="md:col-span-4 min-w-0">
                            {selectedAllCategory ? (
                              <div className="space-y-6">
                                {allCategoriesData.categories
                                  .find((cat) => cat.id === selectedAllCategory)
                                  ?.subCategories.map((subCategory, index) => (
                                    <div key={index}>
                                      <h3 className="font-bold text-orange-600 text-base sm:text-lg mb-3 pb-2 border-b border-border">
                                        {subCategory.title}
                                      </h3>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {subCategory.items.map(
                                          (item, itemIndex) => (
                                            <Link
                                              key={itemIndex}
                                              href={`/categories/${selectedAllCategory}/${slugifyCategoryItemForHref(item)}`}
                                              className="text-foreground hover:text-primary transition-colors text-sm py-1 px-2 rounded-md hover:bg-primary/10 break-words"
                                            >
                                              {item}
                                            </Link>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-64 text-muted-foreground">
                                <div className="text-center">
                                  <Menu className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                                  <p className="text-lg font-medium">
                                    Kategori Seçin
                                  </p>
                                  <p className="text-sm">
                                    Sol taraftan bir kategori seçerek alt
                                    kategorilerini görüntüleyin
                                  </p>
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
              const IconComponent = category.icon;
              const isActive = openCategory === category.name;
              return (
                <div key={category.name} className="shrink-0">
                  <Button
                    variant="ghost"
                    className={`h-auto py-1.5 text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ${
                      isActive
                        ? "text-primary border-b-2 border-primary bg-primary/10"
                        : "hover:text-primary hover:bg-primary/10"
                    }`}
                    onMouseEnter={() => handleCategoryButtonEnter(category.name)}
                    onClick={() => handleCategoryButtonClick(category.name)}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span className="max-w-[7rem] sm:max-w-none truncate sm:truncate-none">
                      {getCategoryNavLabel(category.name)}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
              );
            })}
          </div>

          {openCategory && openMegaData && (
            <div className="absolute left-0 right-0 top-full z-[60] border-t border-border bg-card shadow-lg animate-in slide-in-from-top-2 duration-200 max-h-[min(75vh,640px)] overflow-y-auto overscroll-contain">
              <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-6">
                  <div className="lg:col-span-4 min-w-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      {openMegaData.columns.map((column, index) => {
                        const ColumnIcon = column.icon;
                        return (
                          <div key={index} className="space-y-3 min-w-0">
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                              <ColumnIcon className="w-5 h-5 text-primary shrink-0" />
                              <h3 className="font-bold text-primary text-sm sm:text-base">
                                {column.title}
                              </h3>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {column.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    href={item.href}
                                    className="text-foreground hover:text-primary transition-all duration-200 text-sm flex flex-wrap items-center gap-2 py-1 px-2 rounded-md hover:bg-primary/10"
                                    onClick={() => setOpenCategory(null)}
                                  >
                                    <span className="flex-1 min-w-0 break-words">
                                      {item.name}
                                    </span>
                                    {item.isPopular && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300"
                                      >
                                        Popüler
                                      </Badge>
                                    )}
                                    {item.isNew && (
                                      <Badge
                                        variant="default"
                                        className="text-xs bg-green-500 text-white"
                                      >
                                        Yeni
                                      </Badge>
                                    )}
                                    {item.isSale && (
                                      <Badge
                                        variant="destructive"
                                        className="text-xs"
                                      >
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

                  <div className="lg:col-span-2 space-y-4 lg:space-y-6 min-w-0">
                    {openMegaData.featured.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <h3 className="font-bold text-primary text-sm sm:text-base">
                            Öne Çıkan Ürünler
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {openMegaData.featured.slice(0, 4).map((product) => (
                            <Link
                              key={product.id}
                              href={product.href}
                              className="block p-3 border border-border rounded-lg hover:shadow-md transition-all duration-200 group bg-muted/50 hover:bg-card hover:border-primary/30"
                              onClick={() => setOpenCategory(null)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative shrink-0">
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
                                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                    {product.name}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-muted-foreground">
                                        {product.rating}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-bold text-primary">
                                      {product.price.toLocaleString("tr-TR")} ₺
                                    </span>
                                    {product.originalPrice && (
                                      <span className="text-xs text-muted-foreground line-through">
                                        {product.originalPrice.toLocaleString(
                                          "tr-TR",
                                        )}{" "}
                                        ₺
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

                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">
                          Özel Kampanya
                        </span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">
                        Büyük İndirimler
                      </h4>
                      <p className="text-sm opacity-90 mb-3">
                        Seçili ürünlerde %50&apos;ye varan indirimler
                      </p>
                      <Link
                        href="/campaigns"
                        className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        onClick={() => setOpenCategory(null)}
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
