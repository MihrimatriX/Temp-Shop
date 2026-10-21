import { Metadata } from "next";
import { mockProducts } from "@/services/mock-data-service";
import ProductClient from "./product-client";

type ProductPageProps = { params: Promise<{ id: string }> };

// Static export needs every product URL known at build time.
export function generateStaticParams() {
  return mockProducts.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts.find((p) => String(p.id) === id);
  if (!product) return {};
  return {
    title: `${product.productName} - TempShop`,
    description: product.description,
    alternates: { canonical: `/products/${id}` },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductClient params={params} />;
}
