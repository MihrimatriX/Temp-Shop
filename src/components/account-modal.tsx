"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthForm } from "@/components/auth-form";
import { useAuthStore } from "@/store/auth-store";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <AuthForm onSuccess={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Hesabım
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items */}
          <div className="space-y-2">
            <Link href="/orders" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Package className="w-4 h-4 mr-3" />
                Siparişlerim
              </Button>
            </Link>

            <Link href="/favorites" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-3" />
                Favorilerim
              </Button>
            </Link>

            <Link href="/addresses" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-3" />
                Adreslerim
              </Button>
            </Link>

            <Link href="/payment-methods" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-3" />
                Ödeme Yöntemlerim
              </Button>
            </Link>

            <Link href="/notifications" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-3" />
                Bildirimler
              </Button>
            </Link>

            <Link href="/security" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-3" />
                Güvenlik
              </Button>
            </Link>

            <Link href="/settings" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-3" />
                Ayarlar
              </Button>
            </Link>

            <Link href="/help" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 mr-3" />
                Yardım & Destek
              </Button>
            </Link>
          </div>

          <Separator />

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
