import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Breadcrumb } from "@/components/breadcrumb";
import { generateExtendedProducts } from "@/data/mock-data-extended";

interface SubCategoryPageProps {
  params: Promise<{
    slug: string;
    subslug: string;
  }>;
}

// Mock category data
const categories = [
  {
    id: 1,
    slug: "women",
    name: "Kadın",
    description: "Kadın giyim, ayakkabı, çanta ve aksesuar",
    subcategories: [
      { slug: "clothing", name: "Giyim", description: "Elbise, tişört, gömlek, pantolon ve daha fazlası" },
      { slug: "shoes", name: "Ayakkabı", description: "Topuklu, babet, sneaker, bot ve çizme" },
      { slug: "bags", name: "Çanta", description: "El çantası, sırt çantası, bel çantası" },
      { slug: "lingerie", name: "Ev & İç Giyim", description: "Pijama, gecelik, iç çamaşırı" },
      { slug: "cosmetics", name: "Kozmetik", description: "Makyaj, cilt bakımı, parfüm" },
      { slug: "sports", name: "Spor & Outdoor", description: "Spor giyim, fitness ürünleri" }
    ]
  },
  {
    id: 2,
    slug: "men",
    name: "Erkek",
    description: "Erkek giyim, ayakkabı, çanta ve aksesuar",
    subcategories: [
      { slug: "clothing", name: "Giyim", description: "Gömlek, pantolon, tişört, mont" },
      { slug: "shoes", name: "Ayakkabı", description: "Sneaker, klasik, bot, spor" },
      { slug: "accessories", name: "Çanta & Aksesuar", description: "Sırt çantası, kemer, saat" }
    ]
  },
  {
    id: 3,
    slug: "baby-kids",
    name: "Anne & Çocuk",
    description: "Bebek ve çocuk ürünleri, anne ihtiyaçları",
    subcategories: [
      { slug: "baby-clothing", name: "Bebek Giyim", description: "Body, tulum, pijama, çorap" },
      { slug: "kids-clothing", name: "Çocuk Giyim", description: "Tişört, pantolon, elbise, mont" },
      { slug: "baby-care", name: "Bebek Bakım", description: "Bez, mama, şampuan, krem" }
    ]
  },
  {
    id: 4,
    slug: "electronics",
    name: "Elektronik",
    description: "Telefon, bilgisayar, tablet ve diğer elektronik ürünler",
    subcategories: [
      { slug: "phones-tablets", name: "Telefon & Tablet", description: "Akıllı telefon, tablet, aksesuar" },
      { slug: "computers", name: "Bilgisayar", description: "Laptop, masaüstü, monitör" },
      { slug: "tv-audio", name: "TV & Ses", description: "Televizyon, hoparlör, kulaklık" }
    ]
  },
  {
    id: 5,
    slug: "home-furniture",
    name: "Ev & Mobilya",
    description: "Mobilya, ev tekstili, mutfak ve dekorasyon ürünleri",
    subcategories: [
      { slug: "furniture", name: "Mobilya", description: "Yatak odası, oturma odası, yemek odası" },
      { slug: "home-textiles", name: "Ev Tekstili", description: "Yatak takımı, nevresim, perde, halı" },
      { slug: "kitchen", name: "Mutfak", description: "Tencere, tava, tabak, bardak" },
      { slug: "pillows", name: "Yastık", description: "Yastık, yastık kılıfı, yastık yorgan" },
      { slug: "bedroom", name: "Yatak Odası", description: "Yatak, gardırop, komodin" },
      { slug: "living-room", name: "Oturma Odası", description: "Kanepe, koltuk, sehpa" }
    ]
  },
  {
    id: 6,
    slug: "supermarket",
    name: "Süpermarket",
    description: "Gıda, içecek, temizlik ve kişisel bakım ürünleri",
    subcategories: [
      { slug: "food", name: "Gıda", description: "Kahvaltılık, et, süt ürünleri" },
      { slug: "beverages", name: "İçecek", description: "Su, meyve suyu, çay, kahve" },
      { slug: "cleaning", name: "Temizlik", description: "Deterjan, temizlik ürünleri" }
    ]
  },
  {
    id: 7,
    slug: "cosmetics",
    name: "Kozmetik",
    description: "Makyaj, cilt bakımı, saç bakımı ve parfüm ürünleri",
    subcategories: [
      { slug: "makeup", name: "Makyaj", description: "Fondöten, ruj, göz kalemi" },
      { slug: "skincare", name: "Cilt Bakımı", description: "Temizleyici, nemlendirici, serum" },
      { slug: "haircare", name: "Saç Bakımı", description: "Şampuan, saç kremi, saç maskesi" }
    ]
  },
  {
    id: 8,
    slug: "shoes-bags",
    name: "Ayakkabı & Çanta",
    description: "Kadın ve erkek ayakkabı, çanta, bavul ve aksesuar ürünleri",
    subcategories: [
      { slug: "women-shoes", name: "Kadın Ayakkabı", description: "Topuklu, babet, sneaker, bot" },
      { slug: "men-shoes", name: "Erkek Ayakkabı", description: "Sneaker, klasik, bot, spor" },
      { slug: "bags", name: "Çanta", description: "El çantası, sırt çantası, bavul" }
    ]
  },
  {
    id: 9,
    slug: "sports-outdoor",
    name: "Spor & Outdoor",
    description: "Spor giyim, fitness ekipmanları, outdoor ürünleri",
    subcategories: [
      { slug: "sportswear", name: "Spor Giyim", description: "Eşofman, spor tişörtü, tayt" },
      { slug: "fitness", name: "Fitness", description: "Dambıl, halter, koşu bandı" },
      { slug: "outdoor", name: "Outdoor", description: "Çadır, uyku tulumu, sırt çantası" }
    ]
  },
  {
    id: 10,
    slug: "books-stationery",
    name: "Kitap & Kırtasiye",
    description: "Kitaplar, kırtasiye ürünleri, ofis malzemeleri",
    subcategories: [
      { slug: "books", name: "Kitap", description: "Roman, bilim kurgu, tarih" },
      { slug: "stationery", name: "Kırtasiye", description: "Kalem, defter, çanta" },
      { slug: "office", name: "Ofis", description: "Dosya, klasör, zımba" }
    ]
  }
];

export async function generateMetadata({
  params,
}: SubCategoryPageProps): Promise<Metadata> {
  const { slug, subslug } = await params;
  const category = categories.find((cat) => cat.slug === slug);
  const subcategory = category?.subcategories.find((sub) => sub.slug === subslug);

  if (!category || !subcategory) {
    return {
      title: "Alt Kategori Bulunamadı",
    };
  }

  return {
    title: `${subcategory.name} - ${category.name} - TempShop`,
    description: subcategory.description,
    keywords: `${subcategory.name}, ${category.name}, e-ticaret, online alışveriş`,
    robots: "index, follow",
    openGraph: {
      title: `${subcategory.name} - ${category.name} - TempShop`,
      description: subcategory.description,
      type: "website",
      locale: "tr_TR",
    },
    alternates: {
      canonical: `https://tempshop.com/categories/${slug}/${subslug}`,
    },
  };
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { slug, subslug } = await params;
  const category = categories.find((cat) => cat.slug === slug);
  const subcategory = category?.subcategories.find((sub) => sub.slug === subslug);

  if (!category || !subcategory) {
    notFound();
  }

  // Mock data'dan ürünleri çek
  const allProducts = generateExtendedProducts();
  const categoryProducts = allProducts.filter(product => 
    product.category?.id === category.id &&
    (product.productName.toLowerCase().includes(subcategory.name.toLowerCase()) ||
     product.productName.toLowerCase().includes(subslug.replace('-', ' ')) ||
     product.subCategory?.subCategoryName?.toLowerCase().includes(subcategory.name.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kategoriler", href: "/categories" },
            { label: category.name, href: `/categories/${category.slug}` },
            { label: subcategory.name, href: `/categories/${category.slug}/${subcategory.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{subcategory.name}</h1>
              <p className="text-xl opacity-90">{subcategory.description}</p>
            </div>
          </div>
        </div>

        {/* Category Info */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-4">
            {category.name} kategorisinde {subcategory.name} alt kategorisinde {categoryProducts.length} ürün bulundu
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilter categoryId={category.id} />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={categoryProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
