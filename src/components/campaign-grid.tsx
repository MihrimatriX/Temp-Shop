"use client";

import { CampaignBanner } from "./campaign-banner";
import { Campaign } from "@/types";

interface CampaignGridProps {
  campaigns?: Campaign[];
}

export function CampaignGrid({ campaigns = [] }: CampaignGridProps) {
  // Default campaigns if none provided
  const defaultCampaigns = [
    {
      title: "PREMIUM İNDİRİM GÜNLERİ",
      subtitle: "6-13 EKİM",
      description: "Premium üyelere özel indirimler",
      discount: 50,
      imageUrl: "https://picsum.photos/200/150?random=1",
      backgroundColor: "bg-gradient-to-r from-purple-600 to-purple-800",
      timeLeft: "5 gün 12 saat",
      buttonText: "Alışverişe Başla",
      buttonHref: "/products?campaign=premium",
    },
    {
      title: "Teknoloji Ürünlerinde",
      subtitle: "PREMIUM'A ÖZEL",
      description: "Sepette 1.000 TL'ye Varan İndirimler",
      discount: 30,
      imageUrl: "https://picsum.photos/200/150?random=2",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-blue-800",
      timeLeft: "3 gün 8 saat",
      buttonText: "Teknoloji Ürünleri",
      buttonHref: "/categories/elektronik",
    },
    {
      title: "Senin İçin Seçtiklerimiz",
      subtitle: "ÖZEL FIRSATLAR",
      description: "Size özel seçilmiş ürünlerde büyük indirimler",
      discount: 25,
      imageUrl: "https://picsum.photos/200/150?random=3",
      backgroundColor: "bg-gradient-to-r from-orange-500 to-red-500",
      timeLeft: "7 gün 15 saat",
      buttonText: "Keşfet",
      buttonHref: "/products?featured=true",
    },
  ];

  const defaultSmallCampaigns = [
    {
      title: "Bu Fiyatlar Kaçmaz",
      subtitle: "Elektronik",
      discount: 40,
      backgroundColor: "bg-orange-500",
      buttonHref: "/categories/elektronik",
    },
    {
      title: "7/24 Altın Al",
      subtitle: "Hepsipay",
      discount: 0,
      backgroundColor: "bg-yellow-500",
      buttonHref: "/products?category=gold",
    },
    {
      title: "%0'dan Başlayan Faiz",
      subtitle: "Hepsipay",
      discount: 0,
      backgroundColor: "bg-green-500",
      buttonHref: "/products?installment=true",
    },
    {
      title: "Premium'a Özel",
      subtitle: "Ev Yaşam Ürünleri",
      discount: 35,
      backgroundColor: "bg-purple-500",
      buttonHref: "/categories/ev-yasam",
    },
    {
      title: "Fırsatları Keşfet",
      subtitle: "ALIŞVERİŞİN TOP LİSTESİ",
      discount: 20,
      backgroundColor: "bg-pink-500",
      buttonHref: "/products?top=true",
    },
    {
      title: "500 TL'YE VARAN",
      subtitle: "ANINDA İNDİRİMLER",
      discount: 0,
      backgroundColor: "bg-red-500",
      buttonHref: "/products?instant=true",
    },
  ];

  // Use provided campaigns or default ones
  const displayCampaigns = campaigns.length > 0 ? campaigns : defaultCampaigns;
  const displaySmallCampaigns = defaultSmallCampaigns;

  return (
    <div className="space-y-8">
      {/* Small Campaign Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displaySmallCampaigns.map((campaign, index) => (
          <CampaignBanner
            key={index}
            title={campaign.title}
            subtitle={campaign.subtitle}
            discount={campaign.discount}
            backgroundColor={campaign.backgroundColor}
            buttonHref={campaign.buttonHref}
            buttonText="Keşfet"
          />
        ))}
      </div>

      {/* Large Campaign Banners */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCampaigns.map((campaign, index) => (
          <CampaignBanner key={index} {...campaign} />
        ))}
      </div>
    </div>
  );
}
