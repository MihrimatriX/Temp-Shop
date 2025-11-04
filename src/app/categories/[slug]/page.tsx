import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Breadcrumb } from "@/components/breadcrumb";
import { generateExtendedProducts } from "@/data/mock-data-extended";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock category data
const categories = [
  {
    id: 1,
    slug: "women",
    name: "Kadın",
    description: "Kadın giyim, ayakkabı, çanta ve aksesuar",
  },
  {
    id: 2,
    slug: "men",
    name: "Erkek",
    description: "Erkek giyim, ayakkabı, çanta ve aksesuar",
  },
  {
    id: 3,
    slug: "baby-kids",
    name: "Anne & Çocuk",
    description: "Bebek ve çocuk ürünleri, anne ihtiyaçları",
  },
  {
    id: 4,
    slug: "electronics",
    name: "Elektronik",
    description: "Telefon, bilgisayar, tablet ve diğer elektronik ürünler",
  },
  {
    id: 5,
    slug: "home-furniture",
    name: "Ev & Mobilya",
    description: "Mobilya, ev tekstili, mutfak ve dekorasyon ürünleri",
  },
  {
    id: 6,
    slug: "supermarket",
    name: "Süpermarket",
    description: "Gıda, içecek, temizlik ve kişisel bakım ürünleri",
  },
  {
    id: 7,
    slug: "cosmetics",
    name: "Kozmetik",
    description: "Makyaj, cilt bakımı, saç bakımı ve parfüm ürünleri",
  },
  {
    id: 8,
    slug: "shoes-bags",
    name: "Ayakkabı & Çanta",
    description: "Kadın ve erkek ayakkabı, çanta, bavul ve aksesuar ürünleri",
  },
  {
    id: 9,
    slug: "sports-outdoor",
    name: "Spor & Outdoor",
    description: "Spor giyim, fitness ekipmanları, outdoor ürünleri",
  },
  {
    id: 10,
    slug: "books-stationery",
    name: "Kitap & Kırtasiye",
    description: "Kitaplar, kırtasiye ürünleri, ofis malzemeleri",
  },
];

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  return {
    title: `${category.name} - E-Ticaret Sitesi`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  // Mock data'dan ürünleri çek
  const allProducts = generateExtendedProducts();
  const categoryProducts = allProducts.filter(product => product.category?.id === category.id);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kategoriler", href: "/categories" },
            { label: category.name, href: `/categories/${category.slug}` },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
          <p className="text-sm text-gray-600 mt-2">
            {categoryProducts.length} ürün bulundu
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
