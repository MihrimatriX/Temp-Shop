import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Breadcrumb } from "@/components/breadcrumb";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock category data
const categories = [
  {
    id: 1,
    slug: "elektronik",
    name: "Elektronik",
    description: "Telefon, bilgisayar, tablet ve diğer elektronik ürünler",
  },
  {
    id: 2,
    slug: "moda",
    name: "Moda",
    description: "Giyim, ayakkabı, çanta ve aksesuar",
  },
  {
    id: 3,
    slug: "ev-yasam",
    name: "Ev & Yaşam",
    description: "Ev dekorasyonu, mutfak, banyo ve yaşam ürünleri",
  },
  {
    id: 4,
    slug: "spor",
    name: "Spor & Outdoor",
    description: "Spor giyim, fitness, outdoor ve kamp ürünleri",
  },
  {
    id: 5,
    slug: "anne-bebek",
    name: "Anne & Bebek",
    description: "Bebek giyim, oyuncak, bakım ürünleri",
  },
  {
    id: 6,
    slug: "kozmetik",
    name: "Kozmetik & Kişisel Bakım",
    description: "Makyaj, cilt bakımı, parfüm ve kişisel bakım",
  },
  {
    id: 7,
    slug: "süpermarket",
    name: "Süpermarket",
    description: "Gıda, temizlik, kişisel bakım ürünleri",
  },
  {
    id: 8,
    slug: "kitap",
    name: "Kitap & Müzik",
    description: "Kitaplar, müzik, film ve hobi ürünleri",
  },
  {
    id: 9,
    slug: "oto",
    name: "Oto & Bahçe",
    description: "Araç aksesuarları, bahçe malzemeleri",
  },
  {
    id: 10,
    slug: "kirtasiye",
    name: "Kırtasiye & Ofis",
    description: "Ofis malzemeleri, kırtasiye ürünleri",
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
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilter categoryId={category.id} />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
