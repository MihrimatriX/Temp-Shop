"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Percent } from "lucide-react";
import Image from "next/image";

interface CampaignBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  discount?: number;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  timeLeft?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CampaignBanner({
  title,
  subtitle,
  description,
  discount,
  imageUrl,
  backgroundColor = "bg-gradient-to-r from-purple-600 to-purple-800",
  timeLeft,
  buttonText = "Keşfet",
  buttonHref = "/products",
}: CampaignBannerProps) {
  return (
    <Card className={`${backgroundColor} border-0 text-white overflow-hidden`}>
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {discount && (
              <Badge variant="destructive" className="mb-2">
                <Percent className="w-3 h-3 mr-1" />%{discount} İndirim
              </Badge>
            )}

            <h3 className="text-2xl font-bold mb-2">{title}</h3>

            {subtitle && (
              <h4 className="text-lg font-semibold mb-2 opacity-90">
                {subtitle}
              </h4>
            )}

            {description && (
              <p className="text-sm opacity-80 mb-4">{description}</p>
            )}

            {timeLeft && (
              <div className="flex items-center text-sm mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>Kalan Süre: {timeLeft}</span>
              </div>
            )}

            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              asChild
            >
              <a href={buttonHref}>
                {buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {imageUrl && (
            <div className="ml-6">
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
