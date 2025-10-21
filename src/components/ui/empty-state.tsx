import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  className?: string;
}

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className = "" 
}: EmptyStateProps) => {
  return (
    <Card className={`text-center ${className}`}>
      <CardContent className="p-12">
        <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
        {action && (
          <Button 
            onClick={action.onClick}
            asChild={!!action.href}
          >
            {action.href ? (
              <a href={action.href}>{action.label}</a>
            ) : (
              action.label
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Predefined empty states for common use cases
export const EmptyProducts = ({ onRefresh }: { onRefresh?: () => void }) => (
  <EmptyState
    icon={require("lucide-react").Package}
    title="Ürün Bulunamadı"
    description="Arama kriterlerinize uygun ürün bulunamadı. Farklı filtreler deneyebilir veya arama teriminizi değiştirebilirsiniz."
    action={onRefresh ? {
      label: "Filtreleri Temizle",
      onClick: onRefresh
    } : undefined}
  />
);

export const EmptyCart = () => (
  <EmptyState
    icon={require("lucide-react").ShoppingCart}
    title="Sepetiniz Boş"
    description="Henüz sepetinize ürün eklemediniz. Ürünleri keşfetmek için alışverişe başlayın."
    action={{
      label: "Alışverişe Başla",
      onClick: () => window.location.href = "/products",
      href: "/products"
    }}
  />
);

export const EmptyOrders = () => (
  <EmptyState
    icon={require("lucide-react").Package}
    title="Henüz Siparişiniz Yok"
    description="İlk siparişinizi vermek için ürünlerimizi keşfedin ve alışverişe başlayın."
    action={{
      label: "Ürünleri Keşfet",
      onClick: () => window.location.href = "/products",
      href: "/products"
    }}
  />
);

export const EmptyFavorites = () => (
  <EmptyState
    icon={require("lucide-react").Heart}
    title="Favori Ürününüz Yok"
    description="Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz."
    action={{
      label: "Ürünleri Keşfet",
      onClick: () => window.location.href = "/products",
      href: "/products"
    }}
  />
);

export const EmptyReviews = ({ onWriteReview }: { onWriteReview?: () => void }) => (
  <EmptyState
    icon={require("lucide-react").Star}
    title="Henüz Değerlendirme Yok"
    description="Bu ürün için ilk değerlendirmeyi siz yazın ve diğer müşterilere yardımcı olun."
    action={onWriteReview ? {
      label: "İlk Değerlendirmeyi Yaz",
      onClick: onWriteReview
    } : undefined}
  />
);

export const EmptySearch = ({ searchTerm }: { searchTerm: string }) => (
  <EmptyState
    icon={require("lucide-react").Search}
    title={`"${searchTerm}" için sonuç bulunamadı`}
    description="Arama kriterlerinize uygun ürün bulunamadı. Farklı anahtar kelimeler deneyin veya kategorilere göz atın."
    action={{
      label: "Tüm Ürünleri Gör",
      onClick: () => window.location.href = "/products",
      href: "/products"
    }}
  />
);

export const EmptyCategories = () => (
  <EmptyState
    icon={require("lucide-react").Grid3X3}
    title="Kategori Bulunamadı"
    description="Henüz hiç kategori eklenmemiş. Yönetici panelinden kategorileri yönetebilirsiniz."
  />
);

export const EmptyNotifications = () => (
  <EmptyState
    icon={require("lucide-react").Bell}
    title="Bildiriminiz Yok"
    description="Henüz hiç bildiriminiz yok. Yeni siparişler, kampanyalar ve önemli güncellemeler hakkında bildirim alacaksınız."
  />
);

export const EmptyAddresses = () => (
  <EmptyState
    icon={require("lucide-react").MapPin}
    title="Adresiniz Yok"
    description="Teslimat için bir adres eklemeniz gerekiyor. İlk adresinizi ekleyerek alışverişe başlayın."
    action={{
      label: "Adres Ekle",
      onClick: () => window.location.href = "/addresses",
      href: "/addresses"
    }}
  />
);

export const EmptyPaymentMethods = () => (
  <EmptyState
    icon={require("lucide-react").CreditCard}
    title="Ödeme Yönteminiz Yok"
    description="Hızlı ödeme için kayıtlı ödeme yöntemlerinizi ekleyebilirsiniz."
    action={{
      label: "Ödeme Yöntemi Ekle",
      onClick: () => window.location.href = "/payment-methods",
      href: "/payment-methods"
    }}
  />
);
