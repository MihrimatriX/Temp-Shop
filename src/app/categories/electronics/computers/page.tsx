import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Bilgisayar | TempShop",
  description: "Laptop, masaüstü, monitör ve daha fazlası. En yeni bilgisayar modelleri ile iş ve eğlence deneyiminizi geliştirin!",
  keywords: ["bilgisayar", "laptop", "masaüstü", "monitör", "gaming", "iş bilgisayarı"],
  openGraph: {
    title: "Bilgisayar | TempShop",
    description: "Laptop, masaüstü, monitör ve daha fazlası. En yeni bilgisayar modelleri ile iş ve eğlence deneyiminizi geliştirin!",
    url: "https://tempshop.com/categories/electronics/computers",
    images: ["https://picsum.photos/800/600?random=computers"],
  },
};

export default function ComputersPage() {
  const category = getCategoryByName("Elektronik");
  const subCategory = getSubCategoryByName("Bilgisayar", "Elektronik");
  const products = getProductsByCategoryAndSubCategory("Elektronik", "Bilgisayar");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="İş ve eğlence dünyanızı geliştirin! Yüksek performanslı laptoplardan güçlü masaüstü bilgisayarlara, geniş monitörlerden gaming ekipmanlarına kadar geniş ürün yelpazemizle bilgisayar ihtiyaçlarınızı karşılayın. Hızlı işlemci, yüksek RAM ve gelişmiş grafik kartlarıyla en zorlu görevleri kolayca gerçekleştirin. İş hayatından oyun dünyasına kadar her alanda size eşlik edecek bilgisayarlarla dijital deneyiminizi zenginleştirin!"
        imageUrl={`https://picsum.photos/800/400?random=computers`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Bilgisayar Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
