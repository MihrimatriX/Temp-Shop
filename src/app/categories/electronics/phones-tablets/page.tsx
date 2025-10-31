import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Telefon & Tablet | TempShop",
  description: "Akıllı telefon, tablet, aksesuar ve daha fazlası. En yeni teknoloji ürünleri ile dijital yaşamınızı geliştirin!",
  keywords: ["telefon", "tablet", "akıllı telefon", "iphone", "samsung", "ipad", "teknoloji"],
  openGraph: {
    title: "Telefon & Tablet | TempShop",
    description: "Akıllı telefon, tablet, aksesuar ve daha fazlası. En yeni teknoloji ürünleri ile dijital yaşamınızı geliştirin!",
    url: "https://tempshop.com/categories/electronics/phones-tablets",
    images: ["https://picsum.photos/800/600?random=phones-tablets"],
  },
};

export default function PhonesTabletsPage() {
  const category = getCategoryByName("Elektronik");
  const subCategory = getSubCategoryByName("Telefon & Tablet", "Elektronik");
  const products = getProductsByCategoryAndSubCategory("Elektronik", "Telefon & Tablet");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Dijital yaşamınızı geliştirin! En yeni akıllı telefonlardan gelişmiş tabletlere, pratik aksesuarlardan koruyucu kılıflara kadar geniş ürün yelpazemizle teknoloji ihtiyaçlarınızı karşılayın. Yüksek performans, uzun pil ömrü ve kullanıcı dostu arayüzlerle günlük yaşamınızı kolaylaştırın. İletişimden eğlenceye, işten eğitime kadar her alanda size eşlik edecek cihazlarla dijital deneyiminizi zenginleştirin!"
        imageUrl={`https://picsum.photos/800/400?random=phones-tablets`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Telefon & Tablet Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
