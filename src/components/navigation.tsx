'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { CartModal } from '@/components/cart-modal'
import { AccountModal } from '@/components/account-modal'
import { 
  ShoppingCart, 
  Search, 
  User, 
  Heart, 
  Menu,
  ChevronDown,
  MapPin
} from 'lucide-react'

export function Navigation() {
  const { totalItems } = useCartStore()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('Ahmet Faruk')

  const categories = [
    { name: 'Elektronik', href: '/categories/elektronik' },
    { name: 'Moda', href: '/categories/moda' },
    { name: 'Ev & Yaşam', href: '/categories/ev-yasam' },
    { name: 'Spor & Outdoor', href: '/categories/spor' },
    { name: 'Anne & Bebek', href: '/categories/anne-bebek' },
    { name: 'Kozmetik & Bakım', href: '/categories/kozmetik' },
    { name: 'Süpermarket', href: '/categories/süpermarket' },
    { name: 'Kitap & Müzik', href: '/categories/kitap' },
    { name: 'Oto & Bahçe', href: '/categories/oto' },
    { name: 'Kırtasiye & Ofis', href: '/categories/kirtasiye' }
  ]

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gray-100 text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/orders" className="hover:text-primary">Siparişlerim</Link>
              <Link href="/campaigns" className="hover:text-primary">Süper Fiyat, Süper Teklif</Link>
              <Link href="/international" className="hover:text-primary">Yurt Dışından</Link>
              <Link href="/campaigns" className="hover:text-primary">Kampanyalar</Link>
              <Link href="/entrepreneur-women" className="hover:text-primary">Girişimci Kadınlar</Link>
              <Link href="/customer-service" className="hover:text-primary">Müşteri Hizmetleri</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/premium" className="hover:text-primary">Hepsiburada Premium</Link>
              <Link href="/seller" className="hover:text-primary">Hepsiburada'da Satıcı Ol</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <span className="font-bold text-xl text-purple-600">E-Ticaret</span>
                <div className="text-xs text-muted-foreground">Premium'u keşfet</div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Ürün, kategori veya marka ara"
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="hidden md:inline">Konum</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={() => setIsAccountOpen(true)}
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">
                  {isLoggedIn ? `Hesabım ${userName}` : 'Hesabım'}
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

      {/* Category Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">
            <Button variant="ghost" className="flex items-center gap-2 whitespace-nowrap">
              <Menu className="w-4 h-4" />
              <span>Kategoriler</span>
            </Button>
            
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Button variant="ghost" className="text-sm whitespace-nowrap">
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AccountModal 
        isOpen={isAccountOpen} 
        onClose={() => setIsAccountOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    </>
  )
}