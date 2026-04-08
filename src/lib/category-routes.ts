import {
  allCategoriesData,
  slugifyCategoryItemForHref,
} from "@/data/mega-menu-data";

/** Eski veya Türkçe URL parçalarını uygulama slug'larına çevir */
const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  elektronik: "electronics",
};

export function normalizeCategorySlug(slug: string): string {
  const key = slug.toLowerCase();
  return CATEGORY_SLUG_ALIASES[key] ?? slug;
}

export type ResolvedMenuSubcategory = {
  slug: string;
  name: string;
  description: string;
  groupTitle: string;
};

/**
 * Mega menü / Tüm kategoriler linklerindeki slug'ları (ör. elbise, spor-tisort)
 * allCategoriesData ile eşleştirir.
 */
export function resolveMenuSubcategory(
  categorySlug: string,
  subslug: string,
): ResolvedMenuSubcategory | null {
  const normalized = normalizeCategorySlug(categorySlug);
  const cat = allCategoriesData.categories.find((c) => c.id === normalized);
  if (!cat) return null;

  for (const sub of cat.subCategories) {
    for (const item of sub.items) {
      if (slugifyCategoryItemForHref(item) === subslug) {
        return {
          slug: subslug,
          name: item,
          groupTitle: sub.title,
          description: `${item} — ${sub.title}`,
        };
      }
    }
  }
  return null;
}
