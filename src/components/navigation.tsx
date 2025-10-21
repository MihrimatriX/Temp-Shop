"use client";

import { useState, useEffect } from "react";
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
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  ChevronDown,
  MapPin,
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
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("İstanbul");

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

  const categories = [
    { name: "Elektronik", href: "/categories/elektronik" },
    { name: "Moda", href: "/categories/moda" },
    { name: "Ev & Yaşam", href: "/categories/ev-yasam" },
    { name: "Spor & Outdoor", href: "/categories/spor" },
    { name: "Anne & Bebek", href: "/categories/anne-bebek" },
    { name: "Kozmetik & Bakım", href: "/categories/kozmetik" },
    { name: "Süpermarket", href: "/categories/süpermarket" },
    { name: "Kitap & Müzik", href: "/categories/kitap" },
    { name: "Oto & Bahçe", href: "/categories/oto" },
    { name: "Kırtasiye & Ofis", href: "/categories/kirtasiye" },
  ];

  // Dinamik mega menu data oluştur
  const getMegaMenuData = (categoryName: string) => {
    const categorySubCategories = subCategories.filter(
      (sc) => sc.categoryName === categoryName
    );

    if (categorySubCategories.length === 0) return null;

    // SubCategory'leri 3 sütuna böl
    const columns = [];
    const itemsPerColumn = Math.ceil(categorySubCategories.length / 3);

    for (let i = 0; i < 3; i++) {
      const startIndex = i * itemsPerColumn;
      const endIndex = Math.min(
        startIndex + itemsPerColumn,
        categorySubCategories.length
      );
      const columnSubCategories = categorySubCategories.slice(
        startIndex,
        endIndex
      );

      if (columnSubCategories.length > 0) {
        columns.push({
          title: columnSubCategories[0].subCategoryName,
          items: columnSubCategories.map((sc) => sc.subCategoryName),
        });
      }
    }

    return { columns };
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
      <nav className="hidden md:block bg-white border-b relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">
            <Button
              variant="ghost"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Menu className="w-4 h-4" />
              <span>Kategoriler</span>
            </Button>

            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link href={category.href}>
                  <Button
                    variant="ghost"
                    className={`text-sm whitespace-nowrap ${
                      hoveredCategory === category.name
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : ""
                    }`}
                  >
                    {category.name}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </Link>

                {/* Mega Menu */}
                {hoveredCategory === category.name &&
                  getMegaMenuData(category.name) && (
                    <div className="absolute top-full left-0 w-screen bg-white border-t shadow-lg z-50">
                      <div className="container mx-auto px-4 py-6">
                        <div className="grid grid-cols-4 gap-8">
                          {getMegaMenuData(category.name)?.columns.map(
                            (column, index) => (
                              <div key={index} className="space-y-4">
                                <h3 className="font-bold text-orange-500 text-lg">
                                  {column.title}
                                </h3>
                                <ul className="space-y-2">
                                  {column.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                      <Link
                                        href={`/categories/${category.name.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-gray-700 hover:text-orange-500 transition-colors"
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
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
