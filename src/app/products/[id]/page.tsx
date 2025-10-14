import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const mockProduct = {
  id: 1,
  productName: "Premium Laptop",
  unitPrice: 25000,
  unitInStock: 15,
  quantityPerUnit: "1 adet",
  category: { id: 1, categoryName: "Elektronik", isActive: true },
  description:
    "Yüksek performanslı laptop - Intel i7 işlemci, 16GB RAM, 512GB SSD",
  imageUrl: "https://picsum.photos/600/400?random=1",
  discount: 10,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default async function ProductPage({}: ProductPageProps) {
  const product = mockProduct;

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
