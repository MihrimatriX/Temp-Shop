import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yardım Merkezi - TempShop",
  description: "TempShop yardım merkezi. Sıkça sorulan sorular, iletişim bilgileri ve destek konuları. Size nasıl yardımcı olabiliriz?",
  keywords: "yardım, destek, sıkça sorulan sorular, iletişim, TempShop",
  robots: "index, follow",
  openGraph: {
    title: "Yardım Merkezi - TempShop",
    description: "TempShop yardım merkezi. Sıkça sorulan sorular ve destek konuları.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/help",
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
