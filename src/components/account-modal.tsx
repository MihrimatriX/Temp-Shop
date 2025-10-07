'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn?: boolean
  userName?: string
}

export function AccountModal({ isOpen, onClose, isLoggedIn = false, userName = 'Kullanıcı' }: AccountModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic here
    onClose()
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Register logic here
    onClose()
  }

  if (!isLoggedIn) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isLoginMode ? 'Giriş Yap' : 'Üye Ol'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Login/Register Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={isLoginMode ? 'default' : 'ghost'}
                className="flex-1"
                onClick={() => setIsLoginMode(true)}
              >
                Giriş Yap
              </Button>
              <Button
                variant={!isLoginMode ? 'default' : 'ghost'}
                className="flex-1"
                onClick={() => setIsLoginMode(false)}
              >
                Üye Ol
              </Button>
            </div>

            {/* Login Form */}
            {isLoginMode ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Şifreniz"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Giriş Yap
                </Button>
                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Şifremi Unuttum
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Ad Soyad"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Şifreniz"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Şifre Tekrar"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Üye Ol
                </Button>
              </form>
            )}

            <Separator />

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Google ile Giriş Yap
              </Button>
              <Button variant="outline" className="w-full">
                Facebook ile Giriş Yap
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
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
                  <h3 className="font-semibold">{userName}</h3>
                  <p className="text-sm text-muted-foreground">Premium Üye</p>
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

          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
