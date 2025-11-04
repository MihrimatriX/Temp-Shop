"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductService } from "@/services/product-service";
import { 
  CheckCircle, 
  Star, 
  Award, 
  Shield, 
  Truck, 
  RotateCcw,
  Package,
  Zap,
  Heart,
  Users,
  Clock,
  Globe,
  CreditCard,
  Banknote,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from "lucide-react";

interface ProductDescriptionProps {
  product: {
    id: number;
    productName: string;
    description?: string;
    category?: { categoryName: string };
    unitPrice: number;
    discount?: number;
    unitInStock: number;
    rating?: number;
  };
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const [descriptionData, setDescriptionData] = useState<{
    detailedDescription: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    usageSteps: string[];
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    installmentOptions: Array<{
      months: number;
      monthlyPayment: number;
      totalPrice: number;
      interest: number;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setLoading(true);
        const productService = new ProductService();
        const response = await productService.getProductDescription(product.id);
        
        if (response.success) {
          setDescriptionData(response.data);
        }
      } catch (error) {
        console.error("Error fetching product description:", error);
        // Fallback to default data
        setDescriptionData({
          detailedDescription: `Bu ${product.productName} hakkında detaylı bilgi için lütfen ürün sayfasını ziyaret edin.`,
          features: [
            {
              icon: "CheckCircle",
              title: "Kalite Garantisi",
              description: "2 yıl resmi garanti ile güvenli alışveriş"
            },
            {
              icon: "Star",
              title: "Premium Kalite",
              description: "En yüksek kalite standartlarında üretim"
            }
          ],
          usageSteps: [
            "Ürünü ambalajından çıkarın ve kontrol edin",
            "Kullanım kılavuzunu dikkatli bir şekilde okuyun"
          ],
          faqs: [
            {
              question: "Ürün ne kadar sürede teslim edilir?",
              answer: "Siparişiniz 1-3 iş günü içinde kargoya verilir."
            }
          ],
          installmentOptions: [
            { months: 2, monthlyPayment: Math.round(product.unitPrice / 2), totalPrice: product.unitPrice, interest: 0 },
            { months: 3, monthlyPayment: Math.round(product.unitPrice / 3), totalPrice: product.unitPrice, interest: 0 },
            { months: 6, monthlyPayment: Math.round(product.unitPrice / 6), totalPrice: product.unitPrice, interest: 0 },
            { months: 9, monthlyPayment: Math.round(product.unitPrice / 9), totalPrice: product.unitPrice, interest: 0 },
            { months: 12, monthlyPayment: Math.round(product.unitPrice / 12), totalPrice: product.unitPrice, interest: 0 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [product.id, product.unitPrice]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!descriptionData) {
    return null;
  }

  const { detailedDescription, features, usageSteps, faqs, installmentOptions } = descriptionData;

  // Icon mapping for features
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      CheckCircle,
      Star,
      Award,
      Shield,
      Truck,
      RotateCcw,
      Heart,
      Zap,
      Users,
      Clock,
      Globe
    };
    return iconMap[iconName] || CheckCircle;
  };

  return (
    <div className="space-y-8">
      {/* Detaylı Açıklama */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Ürün Açıklaması
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {detailedDescription.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < detailedDescription.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Özellikler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Ürün Özellikleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Kullanım Kılavuzu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Kullanım Kılavuzu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {usageSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Müşteri Memnuniyeti */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Müşteri Memnuniyeti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">50.000+ Mutlu Müşteri</h4>
              <p className="text-xs text-muted-foreground">Güvenilir hizmet anlayışımız</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Hızlı Teslimat</h4>
              <p className="text-xs text-muted-foreground">1-3 gün içinde kapınızda</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Türkiye Geneli</h4>
              <p className="text-xs text-muted-foreground">81 ile teslimat imkanı</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Taksit Seçenekleri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Taksit Seçenekleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Bu ürünü kredi kartınızla taksitli olarak satın alabilirsiniz. Tüm taksit seçenekleri faizsizdir.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {installmentOptions.map((option, index) => (
                <div key={index} className="border rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                  <div className="text-lg font-bold text-primary">
                    {option.months} Taksit
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Aylık
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    {option.monthlyPayment.toLocaleString("tr-TR")} ₺
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Toplam: {option.totalPrice.toLocaleString("tr-TR")} ₺
                  </div>
                  {option.interest === 0 && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Faizsiz
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Banknote className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Taksit Bilgileri</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Tüm kredi kartları ile taksitli ödeme</li>
                    <li>• Faizsiz taksit seçenekleri</li>
                    <li>• Anında onay ve hızlı teslimat</li>
                    <li>• Güvenli ödeme sistemi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sık Sorulan Sorular */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Sık Sorulan Sorular
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-semibold text-sm mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Garanti ve İade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Garanti ve İade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm mb-1">2 Yıl Garanti</h4>
                <p className="text-sm text-muted-foreground">
                  Ürünümüz 2 yıl resmi garanti kapsamındadır. 
                  Garanti kapsamındaki arızalar ücretsiz onarılır.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm mb-1">14 Gün İade</h4>
                <p className="text-sm text-muted-foreground">
                  Ürünü teslim aldığınız tarihten itibaren 14 gün içinde 
                  orijinal ambalajında iade edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
