import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Mutfak Ürünleri | TempShop",
  description: "Tencere, tava, tabak, bardak, çatal kaşık, mutfak robotu, kahve makinesi ve daha fazlası. Mutfağınızı donatın!",
  keywords: ["mutfak", "tencere", "tava", "tabak", "bardak", "çatal kaşık", "mutfak robotu", "kahve makinesi"],
  openGraph: {
    title: "Mutfak | TempShop",
    description: "Tencere, tava, tabak, bardak, çatal kaşık, mutfak robotu, kahve makinesi ve daha fazlası. Mutfağınızı donatın!",
    url: "https://tempshop.com/categories/home-furniture/kitchen",
    images: ["https://picsum.photos/800/600?random=kitchen"],
  },
};

export default function KitchenPage() {
  const category = getCategoryByName("Ev & Mobilya");
  const subCategory = getSubCategoryByName("Mutfak", "Ev & Mobilya");
  const products = getProductsByCategoryAndSubCategory("Ev & Mobilya", "Mutfak");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Mutfakta yaratıcılığınızı ortaya çıkarın! Profesyonel tencere ve tava setlerinden şık tabak ve bardak takımlarına, pratik mutfak robotlarından lezzetli kahve makinelerine kadar geniş ürün yelpazemizle mutfağınızı donatın. Kaliteli malzemelerden üretilmiş, dayanıklı ve fonksiyonel ürünlerle yemek yapma deneyiminizi geliştirin. Modern tasarımlar ve kullanışlı özelliklerle mutfağınızı bir sanat atölyesine dönüştürün!"
        imageUrl={`https://picsum.photos/800/400?random=kitchen`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mutfak Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
