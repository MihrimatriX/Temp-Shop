import {
  allCategoriesData,
  megaMenuData,
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
 * allCategoriesData ve megaMenuData ile eşleştirir.
 */
export function resolveMenuSubcategory(
  categorySlug: string,
  subslug: string,
): ResolvedMenuSubcategory | null {
  const normalized = normalizeCategorySlug(categorySlug);
  const cat = allCategoriesData.categories.find((c) => c.id === normalized);

  for (const sub of cat?.subCategories ?? []) {
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

  const href = `/categories/${normalized}/${subslug}`;
  for (const column of megaMenuData[normalized]?.columns ?? []) {
    const item = column.items.find((i) => i.href === href);
    if (item) {
      return {
        slug: subslug,
        name: item.name,
        groupTitle: column.title,
        description: `${item.name} — ${column.title}`,
      };
    }
  }
  return null;
}

/** Statik export için menülerde linklenen tüm alt kategori slug'ları */
export function menuSubcategorySlugs(categorySlug: string): string[] {
  const cat = allCategoriesData.categories.find((c) => c.id === categorySlug);
  const fromAll = (cat?.subCategories ?? []).flatMap((sub) =>
    sub.items.map(slugifyCategoryItemForHref),
  );
  const prefix = `/categories/${categorySlug}/`;
  const fromMega = (megaMenuData[categorySlug]?.columns ?? []).flatMap((col) =>
    col.items
      .filter((i) => i.href.startsWith(prefix))
      .map((i) => i.href.slice(prefix.length)),
  );
  return [...new Set([...fromAll, ...fromMega])];
}
