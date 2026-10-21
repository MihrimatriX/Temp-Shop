import Script from "next/script";
import { SITE_URL } from "@/lib/utils";

interface StructuredDataProps {
  type: "website" | "organization" | "product" | "breadcrumb";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "TempShop",
          url: SITE_URL,
          description:
            "Modern e-ticaret deneyimi ile en kaliteli ürünleri keşfedin",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };

      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TempShop",
          url: SITE_URL,
          logo: `${SITE_URL}/logo512.png`,
          description: "Türkiye'nin en güvenilir e-ticaret platformu",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-444-0-123",
            contactType: "customer service",
            availableLanguage: "Turkish",
          },
          sameAs: [
            "https://facebook.com/tempshop",
            "https://twitter.com/tempshop",
            "https://instagram.com/tempshop",
          ],
        };

      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          ...data,
        };

      case "breadcrumb":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${SITE_URL}${item.href}`,
          })),
        };

      default:
        return data;
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
