import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Award,
  Heart,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shopping: [
      { label: "Tüm Kategoriler", href: "/categories" },
      { label: "Kampanyalar", href: "/campaigns" },
      { label: "Yeni Ürünler", href: "/products?sort=newest" },
      { label: "İndirimli Ürünler", href: "/products?sort=discount" },
      { label: "Premium Üyelik", href: "/premium" },
    ],
    customer: [
      { label: "Müşteri Hizmetleri", href: "/customer-service" },
      { label: "Sıkça Sorulan Sorular", href: "/help" },
      { label: "İade ve Değişim", href: "/help#returns" },
      { label: "Kargo Takibi", href: "/orders" },
      { label: "Size Özel", href: "/favorites" },
    ],
    company: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Kariyer", href: "/careers" },
      { label: "Basın", href: "/press" },
      { label: "Satıcı Ol", href: "/seller" },
      { label: "Girişimci Kadınlar", href: "/entrepreneur-women" },
    ],
    legal: [
      { label: "Gizlilik Politikası", href: "/privacy" },
      { label: "Kullanım Şartları", href: "/terms" },
      { label: "Çerez Politikası", href: "/cookies" },
      { label: "KVKK", href: "/kvkk" },
      { label: "İletişim", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  const paymentMethods = [
    { icon: CreditCard, label: "Kredi Kartı" },
    { icon: CreditCard, label: "Banka Kartı" },
    { icon: CreditCard, label: "Kapıda Ödeme" },
    { icon: CreditCard, label: "Havale/EFT" },
  ];

  const features = [
    { icon: Truck, label: "Ücretsiz Kargo", description: "150₺ ve üzeri alışverişlerde" },
    { icon: Shield, label: "Güvenli Alışveriş", description: "256-bit SSL şifreleme" },
    { icon: Award, label: "Kalite Garantisi", description: "Tüm ürünlerde kalite garantisi" },
    { icon: Heart, label: "Müşteri Memnuniyeti", description: "7/24 müşteri desteği" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-purple-600 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Kampanyalardan Haberdar Olun</h3>
            <p className="text-purple-100 mb-6">
              E-bültenimize abone olun, özel indirimler ve yeni ürünlerden ilk siz haberdar olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Abone Ol
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shopping Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Alışveriş</h4>
            <ul className="space-y-2">
              {footerLinks.shopping.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              {footerLinks.customer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Şirket</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Yasal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <IconComponent className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm">{feature.label}</h5>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Contact & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">444 0 123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">destek@tempshop.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">
                  İstanbul, Türkiye
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Sosyal Medya</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ödeme Yöntemleri</h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-md"
                  >
                    <IconComponent className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-300">{method.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} TempShop. Tüm hakları saklıdır.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Gizlilik
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Şartlar
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
              Çerezler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
