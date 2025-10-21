"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { SubCategoryService } from "@/services/subcategory-service";
import { SubCategory } from "@/types";
import {
  Menu,
  Search,
  User,
  ShoppingCart,
  MapPin,
  ChevronRight,
  X,
  Home,
  Package,
  Tag,
  HelpCircle,
  Settings,
  Bell,
  Heart,
  Truck,
  CreditCard,
  Shield,
  Star,
  Globe,
  Users,
  Award,
} from "lucide-react";

interface MobileNavigationProps {
  selectedLocation: string;
  onLocationClick: () => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onSearchFocus: () => void;
}

export function MobileNavigation({
  selectedLocation,
  onLocationClick,
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  onSearchFocus,
}: MobileNavigationProps) {
  const router = useRouter();
  const { totalItems } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const categories = [
    { name: "Elektronik", href: "/categories/elektronik", icon: Package },
    { name: "Moda", href: "/categories/moda", icon: Tag },
    { name: "Ev & Yaşam", href: "/categories/ev-yasam", icon: Home },
    { name: "Spor & Outdoor", href: "/categories/spor", icon: Award },
    { name: "Anne & Bebek", href: "/categories/anne-bebek", icon: Users },
    { name: "Kozmetik & Bakım", href: "/categories/kozmetik", icon: Star },
    { name: "Süpermarket", href: "/categories/süpermarket", icon: Package },
    { name: "Kitap & Müzik", href: "/categories/kitap", icon: Globe },
    { name: "Oto & Bahçe", href: "/categories/oto", icon: Truck },
    { name: "Kırtasiye & Ofis", href: "/categories/kirtasiye", icon: Package },
  ];

  const quickLinks = [
    { name: "Kampanyalar", href: "/campaigns", icon: Tag },
    { name: "Premium", href: "/premium", icon: Star },
    { name: "Satıcı Ol", href: "/seller", icon: Users },
    { name: "Müşteri Hizmetleri", href: "/customer-service", icon: HelpCircle },
    { name: "Yardım", href: "/help", icon: HelpCircle },
  ];

  const userLinks = [
    { name: "Siparişlerim", href: "/orders", icon: Package },
    { name: "Favorilerim", href: "/favorites", icon: Heart },
    { name: "Adreslerim", href: "/addresses", icon: MapPin },
    { name: "Ödeme Yöntemlerim", href: "/payment-methods", icon: CreditCard },
    { name: "Bildirimler", href: "/notifications", icon: Bell },
    { name: "Güvenlik", href: "/security", icon: Shield },
    { name: "Ayarlar", href: "/settings", icon: Settings },
  ];

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 sm:w-96 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="font-bold text-purple-600">E-Ticaret</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            {isAuthenticated ? (
              <div className="p-4 border-b bg-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b">
                <Button className="w-full" onClick={handleLinkClick}>
                  <User className="w-4 h-4 mr-2" />
                  Giriş Yap / Kayıt Ol
                </Button>
              </div>
            )}

            {/* Search Bar */}
            <div className="p-4 border-b">
              <form onSubmit={onSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                  onFocus={onSearchFocus}
                  placeholder="Ürün, kategori veya marka ara"
                  className="pl-10"
                />
              </form>
            </div>

            {/* Location */}
            <div className="p-4 border-b">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  onLocationClick();
                  handleLinkClick();
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {selectedLocation}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => {
                    router.push("/cart");
                    handleLinkClick();
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sepet
                  {totalItems > 0 && (
                    <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => {
                    router.push("/favorites");
                    handleLinkClick();
                  }}
                >
                  <Heart className="w-4 h-4" />
                  Favoriler
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-3">Kategoriler</h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const categorySubCategories = subCategories.filter(
                    (sc) => sc.categoryName === category.name
                  );
                  const isExpanded = expandedCategories.has(category.name);

                  return (
                    <div key={category.name}>
                      <div className="flex items-center">
                        <Link
                          href={category.href}
                          className="flex-1 flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          onClick={handleLinkClick}
                        >
                          <IconComponent className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{category.name}</span>
                        </Link>
                        {categorySubCategories.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6"
                            onClick={() => toggleCategory(category.name)}
                          >
                            <ChevronRight
                              className={`w-3 h-3 transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                        )}
                      </div>
                      {isExpanded && categorySubCategories.length > 0 && (
                        <div className="ml-6 space-y-1">
                          {categorySubCategories.map((subCategory) => (
                            <Link
                              key={subCategory.id}
                              href={`/categories/${category.name.toLowerCase()}/${subCategory.subCategoryName.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-md transition-colors"
                              onClick={handleLinkClick}
                            >
                              {subCategory.subCategoryName}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-4 border-t">
              <h3 className="font-semibold text-sm mb-3">Hızlı Erişim</h3>
              <div className="space-y-1">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Links */}
            {isAuthenticated && (
              <div className="p-4 border-t">
                <h3 className="font-semibold text-sm mb-3">Hesabım</h3>
                <div className="space-y-1">
                  {userLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                        onClick={handleLinkClick}
                      >
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Additional Links */}
            <div className="p-4 border-t">
              <div className="space-y-1">
                <Link
                  href="/about"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={handleLinkClick}
                >
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Hakkımızda</span>
                </Link>
                <Link
                  href="/international"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={handleLinkClick}
                >
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Yurt Dışından</span>
                </Link>
                <Link
                  href="/entrepreneur-women"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={handleLinkClick}
                >
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Girişimci Kadınlar</span>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
