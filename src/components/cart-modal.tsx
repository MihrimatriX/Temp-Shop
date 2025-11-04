"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore, CartItem } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
    totalItems,
  } = useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Sepetim ({totalItems} ürün)
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sepetiniz boş</h3>
              <p className="text-muted-foreground mb-6">
                Alışverişe başlamak için ürünleri sepete ekleyin
              </p>
              <Button asChild>
                <Link href="/products" onClick={onClose}>
                  Alışverişe Başla
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={
                          item.product.imageUrl || "/placeholder-product.jpg"
                        }
                        alt={item.product.productName}
                        fill
                        sizes="80px"
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                        {item.product.productName}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.quantityPerUnit}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-sm">
                            {formatPrice(
                              item.product.unitPrice * item.quantity
                            )}
                          </div>
                          {item.product.discount &&
                            item.product.discount > 0 && (
                              <div className="text-xs text-muted-foreground line-through">
                                {formatPrice(
                                  item.product.unitPrice *
                                    (1 + item.product.discount / 100) *
                                    item.quantity
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Cart Summary */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Toplam:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                {totalAmount > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Kargo ücretsiz! (500 TL ve üzeri alışverişlerde)
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleClearCart}
                    disabled={items.length === 0}
                  >
                    Sepeti Temizle
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/cart" onClick={onClose}>
                      Sepete Git
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout" onClick={onClose}>
                    Güvenli Ödeme
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
