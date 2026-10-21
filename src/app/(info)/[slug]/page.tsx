import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

// Footer'daki kurumsal ve yasal bağlantıların sayfaları.
// TempShop bir demo mağaza; metinler gerçek bir şirketi bağlamaz.
const pages: Record<
  string,
  {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
  }
> = {
  careers: {
    title: "Kariyer",
    intro:
      "Şu an açık bir pozisyonumuz yok. Yeni ilanlar açıldığında bu sayfada yayınlanacak.",
    sections: [
      {
        heading: "Genel başvuru",
        body: "İlan beklemeden tanışmak isterseniz müşteri hizmetleri sayfasındaki iletişim kanallarından bize yazabilirsiniz.",
      },
    ],
  },
  press: {
    title: "Basın",
    intro:
      "Basın soruları ve logo kullanım talepleri için müşteri hizmetleri üzerinden bize ulaşabilirsiniz.",
    sections: [
      {
        heading: "Marka kullanımı",
        body: "TempShop adını ve logosunu haberlerde değiştirmeden kullanabilirsiniz.",
      },
    ],
  },
  privacy: {
    title: "Gizlilik Politikası",
    intro:
      "Mock modda sitede girdiğiniz hiçbir bilgi bir sunucuya gönderilmez. Tuttuğumuz az sayıdaki veri yalnızca kendi tarayıcınızda durur.",
    sections: [
      {
        heading: "Hangi verileri tutuyoruz",
        body: "Sepetiniz ve seçtiğiniz backend ayarı tarayıcının localStorage alanında, oturum bilgisi ise sekmeyi kapatınca silinen sessionStorage alanında saklanır. Adresler, siparişler ve kayıtlı kartlar mock modda sabit örnek veridir.",
      },
      {
        heading: "Verileri silmek",
        body: "Tarayıcınızın site verilerini temizlemeniz yeterli. Ayarlar sayfasından backend değiştirdiğinizde de kayıtlı veriler sıfırlanır.",
      },
      {
        heading: "Gerçek backend kullanırken",
        body: ".NET veya Spring backend'ine bağlandığınızda giriş ve sipariş bilgileri o sunucuya gider. Verinin orada nasıl saklandığını backend'i işleten taraf belirler.",
      },
    ],
  },
  terms: {
    title: "Kullanım Şartları",
    intro:
      "TempShop bir demo projedir. Sitedeki ürünler, fiyatlar ve kampanyalar gerçek değildir; verilen siparişler işleme alınmaz.",
    sections: [
      {
        heading: "Siparişler ve ödemeler",
        body: "Ödeme adımında gerçek kart bilgisi girmeyin. Hiçbir ödeme tahsil edilmez, hiçbir ürün gönderilmez.",
      },
      {
        heading: "İçerik",
        body: "Ürün görselleri picsum.photos üzerinden geliyor. Yorumlar ve puanlar örnek veridir.",
      },
    ],
  },
  cookies: {
    title: "Çerez Politikası",
    intro:
      "Site çerez kullanmaz. Tercihlerinizi hatırlamak için tarayıcının localStorage ve sessionStorage alanlarından yararlanır.",
    sections: [
      {
        heading: "Saklanan anahtarlar",
        body: "cart-storage (sepet), backend-config (backend seçimi), theme (açık/koyu tema) localStorage'da; auth-storage (oturum) sessionStorage'da tutulur.",
      },
      {
        heading: "Üçüncü taraflar",
        body: "Analitik veya reklam aracı yüklenmez. Görseller picsum.photos ve i.pravatar.cc adreslerinden yüklenir.",
      },
    ],
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    intro:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme. Demo sürümde kişisel veriler bir sunucuya aktarılmaz.",
    sections: [
      {
        heading: "İşlenen veriler",
        body: "Giriş ve ödeme formlarına yazdıklarınız yalnızca sizin cihazınızda işlenir.",
      },
      {
        heading: "Haklarınız",
        body: "Verilerinizi istediğiniz zaman tarayıcınızdan silebilirsiniz. Gerçek backend ile çalışan bir kurulumda başvurular o kurulumu işleten veri sorumlusuna yapılır.",
      },
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

type InfoPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: InfoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return {
    title: `${page.title} - TempShop`,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: page.title, href: `/${slug}` },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <p className="text-muted-foreground mb-8">{page.intro}</p>
      <Card>
        <CardContent className="space-y-6 pt-6">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
              <p className="text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
