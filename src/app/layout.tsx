import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Ticaret Sitesi - Modern Online Alışveriş",
  description:
    "Modern e-ticaret deneyimi ile en iyi ürünleri keşfedin. Hızlı teslimat, güvenli ödeme ve kaliteli hizmet.",
  keywords: "e-ticaret, online alışveriş, ürün, indirim, kargo",
  authors: [{ name: "AFU" }],
  openGraph: {
    title: "E-Ticaret Sitesi",
    description: "Modern e-ticaret deneyimi ile en iyi ürünleri keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
