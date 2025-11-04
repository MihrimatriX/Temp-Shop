import { Metadata } from "next";
import { getCategoryByName, getSubCategoryByName, getProductsByCategoryAndSubCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Ev Tekstili Ürünleri | TempShop",
  description: "Yatak takımı, nevresim, yorgan, yastık, battaniye, perde, halı, kilim ve daha fazlası. Evinizi güzelleştirin!",
  keywords: ["ev tekstili", "yatak takımı", "nevresim", "yorgan", "yastık", "battaniye", "perde", "halı", "kilim"],
  openGraph: {
    title: "Ev Tekstili | TempShop",
    description: "Yatak takımı, nevresim, yorgan, yastık, battaniye, perde, halı, kilim ve daha fazlası. Evinizi güzelleştirin!",
    url: "https://tempshop.com/categories/home-furniture/home-textiles",
    images: ["https://picsum.photos/800/600?random=home-textiles"],
  },
};

export default function HomeTextilesPage() {
  const category = getCategoryByName("Ev & Mobilya");
  const subCategory = getSubCategoryByName("Ev Tekstili", "Ev & Mobilya");
  const products = getProductsByCategoryAndSubCategory("Ev & Mobilya", "Ev Tekstili");

  if (!category || !subCategory) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori veya alt kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={`${category.categoryName} - ${subCategory.subCategoryName}`}
        description="Evinizi sıcak ve konforlu hale getiren ev tekstili ürünleri! Yatak takımlarından nevresimlere, yorganlardan yastıklara, battaniyelerden perdeler, halılardan kilimlere kadar geniş ürün yelpazemizle yaşam alanınızı kişiselleştirin. Kaliteli kumaşlar, modern tasarımlar ve geniş renk seçenekleriyle evinizin her köşesini güzelleştirin. Konfor ve şıklığı bir araya getiren ürünlerle evinizi bir cennete dönüştürün!"
        imageUrl={`https://picsum.photos/800/400?random=home-textiles`}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ev Tekstili Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
