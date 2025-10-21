import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satıcı Ol - TempShop",
  description: "TempShop'ta satıcı olun. Satıcı başvuru formu, satıcı avantajları, komisyon bilgileri ve başvuru süreci. Binlerce müşteriye ulaşın.",
  keywords: "satıcı ol, satıcı başvuru, komisyon, TempShop, e-ticaret satıcı",
  robots: "index, follow",
  openGraph: {
    title: "Satıcı Ol - TempShop",
    description: "TempShop'ta satıcı olun. Satıcı avantajları ve başvuru süreci.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tempshop.com/seller",
  },
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
