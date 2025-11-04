import { Metadata } from "next";
import { getCategoryByName, getProductsByCategory } from "@/data/mock-data-extended";
import { CategoryHeader } from "@/components/category-header";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Kadın Giyim, Ayakkabı ve Aksesuar | TempShop",
  description: "En şık kadın giyim ürünleri, trend ayakkabılar ve modern aksesuarlar. Tarzınızı yansıtan parçaları keşfedin!",
  keywords: ["kadın giyim", "kadın ayakkabı", "kadın çanta", "kadın moda", "kadın aksesuar"],
  openGraph: {
    title: "Kadın Kategorisi | TempShop",
    description: "En şık kadın giyim ürünleri, trend ayakkabılar ve modern aksesuarlar. Tarzınızı yansıtan parçaları keşfedin!",
    url: "https://tempshop.com/categories/women",
    images: ["https://picsum.photos/800/600?random=women"],
  },
};

export default function WomenPage() {
  const category = getCategoryByName("Kadın");
  const products = getProductsByCategory("Kadın");

  if (!category) {
    return <div className="container mx-auto px-4 py-8 text-center">Kategori bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        title={category.categoryName}
        description="Kadınlar için moda dünyasının kapılarını aralayın! En yeni trendler, zamansız klasikler ve her zevke uygun parçalar burada. Gardırobunuzu yenilemek, özel günler için hazırlanmak ya da günlük şıklığınızı tamamlamak için aradığınız her şey bu kategoride. Elbiselerden pantolonlara, topuklu ayakkabılardan spor ayakkabılara, şık çantalardan göz alıcı aksesuarlara kadar geniş ürün yelpazemizle tarzınızı baştan yaratın. Unutmayın, moda sadece giyinmek değil, aynı zamanda kendinizi ifade etme sanatıdır!"
        imageUrl={category.imageUrl || "https://picsum.photos/800/600?random=women"}
      />

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kadın Ürünleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
