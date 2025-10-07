'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  Baby, 
  Sparkles, 
  ShoppingCart, 
  Book, 
  Car, 
  PenTool 
} from 'lucide-react'

const categories = [
  {
    id: 1,
    slug: 'elektronik',
    name: 'Elektronik',
    description: 'Telefon, bilgisayar, tablet',
    icon: Smartphone,
    color: 'bg-blue-500',
    productCount: 1250
  },
  {
    id: 2,
    slug: 'moda',
    name: 'Moda',
    description: 'Giyim, ayakkabı, çanta',
    icon: Shirt,
    color: 'bg-pink-500',
    productCount: 890
  },
  {
    id: 3,
    slug: 'ev-yasam',
    name: 'Ev & Yaşam',
    description: 'Dekorasyon, mutfak, banyo',
    icon: Home,
    color: 'bg-green-500',
    productCount: 2100
  },
  {
    id: 4,
    slug: 'spor',
    name: 'Spor & Outdoor',
    description: 'Fitness, kamp, outdoor',
    icon: Dumbbell,
    color: 'bg-orange-500',
    productCount: 650
  },
  {
    id: 5,
    slug: 'anne-bebek',
    name: 'Anne & Bebek',
    description: 'Bebek giyim, oyuncak',
    icon: Baby,
    color: 'bg-purple-500',
    productCount: 420
  },
  {
    id: 6,
    slug: 'kozmetik',
    name: 'Kozmetik & Bakım',
    description: 'Makyaj, cilt bakımı',
    icon: Sparkles,
    color: 'bg-rose-500',
    productCount: 780
  },
  {
    id: 7,
    slug: 'süpermarket',
    name: 'Süpermarket',
    description: 'Gıda, temizlik',
    icon: ShoppingCart,
    color: 'bg-yellow-500',
    productCount: 3200
  },
  {
    id: 8,
    slug: 'kitap',
    name: 'Kitap & Müzik',
    description: 'Kitaplar, müzik, film',
    icon: Book,
    color: 'bg-indigo-500',
    productCount: 1500
  },
  {
    id: 9,
    slug: 'oto',
    name: 'Oto & Bahçe',
    description: 'Araç, bahçe malzemeleri',
    icon: Car,
    color: 'bg-gray-500',
    productCount: 320
  },
  {
    id: 10,
    slug: 'kirtasiye',
    name: 'Kırtasiye & Ofis',
    description: 'Ofis, kırtasiye',
    icon: PenTool,
    color: 'bg-teal-500',
    productCount: 680
  }
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((category) => {
        const IconComponent = category.icon
        return (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {category.productCount} ürün
                </Badge>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
