import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Breadcrumb } from "@/components/breadcrumb";
import { generateExtendedProducts } from "@/data/mock-data-extended";

interface ProductPageProps {
  params: Promise<{
    slug: string;
    subslug: string;
    productslug: string;
  }>;
}

// Mock category data
const categories = [
  {
    id: 1,
    slug: "women",
    name: "Kadın",
    subcategories: [
      { slug: "clothing", name: "Giyim" },
      { slug: "shoes", name: "Ayakkabı" },
      { slug: "bags", name: "Çanta" },
      { slug: "lingerie", name: "Ev & İç Giyim" },
      { slug: "cosmetics", name: "Kozmetik" },
      { slug: "sports", name: "Spor & Outdoor" }
    ]
  },
  {
    id: 2,
    slug: "men",
    name: "Erkek",
    subcategories: [
      { slug: "clothing", name: "Giyim" },
      { slug: "shoes", name: "Ayakkabı" },
      { slug: "accessories", name: "Çanta & Aksesuar" }
    ]
  },
  {
    id: 3,
    slug: "baby-kids",
    name: "Anne & Çocuk",
    subcategories: [
      { slug: "baby-clothing", name: "Bebek Giyim" },
      { slug: "kids-clothing", name: "Çocuk Giyim" },
      { slug: "baby-care", name: "Bebek Bakım" }
    ]
  },
  {
    id: 4,
    slug: "electronics",
    name: "Elektronik",
    subcategories: [
      { slug: "phones-tablets", name: "Telefon & Tablet" },
      { slug: "computers", name: "Bilgisayar" },
      { slug: "tv-audio", name: "TV & Ses" }
    ]
  },
  {
    id: 5,
    slug: "home-furniture",
    name: "Ev & Mobilya",
    subcategories: [
      { slug: "furniture", name: "Mobilya" },
      { slug: "home-textiles", name: "Ev Tekstili" },
      { slug: "kitchen", name: "Mutfak" },
      { slug: "pillows", name: "Yastık" },
      { slug: "bedroom", name: "Yatak Odası" },
      { slug: "living-room", name: "Oturma Odası" }
    ]
  },
  {
    id: 6,
    slug: "supermarket",
    name: "Süpermarket",
    subcategories: [
      { slug: "food", name: "Gıda" },
      { slug: "beverages", name: "İçecek" },
      { slug: "cleaning", name: "Temizlik" }
    ]
  },
  {
    id: 7,
    slug: "cosmetics",
    name: "Kozmetik",
    subcategories: [
      { slug: "makeup", name: "Makyaj" },
      { slug: "skincare", name: "Cilt Bakımı" },
      { slug: "haircare", name: "Saç Bakımı" }
    ]
  },
  {
    id: 8,
    slug: "shoes-bags",
    name: "Ayakkabı & Çanta",
    subcategories: [
      { slug: "women-shoes", name: "Kadın Ayakkabı" },
      { slug: "men-shoes", name: "Erkek Ayakkabı" },
      { slug: "bags", name: "Çanta" }
    ]
  },
  {
    id: 9,
    slug: "sports-outdoor",
    name: "Spor & Outdoor",
    subcategories: [
      { slug: "sportswear", name: "Spor Giyim" },
      { slug: "fitness", name: "Fitness" },
      { slug: "outdoor", name: "Outdoor" }
    ]
  },
  {
    id: 10,
    slug: "books-stationery",
    name: "Kitap & Kırtasiye",
    subcategories: [
      { slug: "books", name: "Kitap" },
      { slug: "stationery", name: "Kırtasiye" },
      { slug: "office", name: "Ofis" }
    ]
  }
];

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug, subslug, productslug } = await params;
  const category = categories.find((cat) => cat.slug === slug);
  const subcategory = category?.subcategories.find((sub) => sub.slug === subslug);

  if (!category || !subcategory) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  const productName = productslug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    title: `${productName} - ${subcategory.name} - ${category.name} - TempShop`,
    description: `${productName} ürünü ${subcategory.name} kategorisinde. Kaliteli ve uygun fiyatlı ürünler.`,
    keywords: `${productName}, ${subcategory.name}, ${category.name}, e-ticaret, online alışveriş`,
    robots: "index, follow",
    openGraph: {
      title: `${productName} - ${subcategory.name} - ${category.name} - TempShop`,
      description: `${productName} ürünü ${subcategory.name} kategorisinde. Kaliteli ve uygun fiyatlı ürünler.`,
      type: "website",
      locale: "tr_TR",
    },
    alternates: {
      canonical: `https://tempshop.com/categories/${slug}/${subslug}/${productslug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, subslug, productslug } = await params;
  const category = categories.find((cat) => cat.slug === slug);
  const subcategory = category?.subcategories.find((sub) => sub.slug === subslug);

  if (!category || !subcategory) {
    notFound();
  }

  // Mock data'dan ürünleri çek
  const allProducts = generateExtendedProducts();
  const productName = productslug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
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
            { label: productName, href: `/categories/${category.slug}/${subcategory.slug}/${productslug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{productName}</h1>
              <p className="text-xl opacity-90">{subcategory.name} kategorisinde {categoryProducts.length} ürün bulundu</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-4">
            {category.name} &gt; {subcategory.name} &gt; {productName} kategorisinde bulunan ürünler
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
