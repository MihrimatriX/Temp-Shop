import { create } from "zustand";
import { Product, ProductFilters, Category } from "@/types";

interface ProductStore {
  products: Product[];
  categories: Category[];
  filters: ProductFilters;
  loading: boolean;
  error: string | null;

  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setFilters: (filters: ProductFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  getFilteredProducts: () => Product[];
  getProductsByCategory: (categoryId: number) => Product[];
  searchProducts: (searchTerm: string) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  filters: {
    pageNumber: 1,
    pageSize: 12,
  },
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getFilteredProducts: () => {
    const { products, filters } = get();

    // Ensure products is an array
    if (!Array.isArray(products)) {
      return [];
    }

    let filtered = [...products];

    // Category filter
    if (filters.categoryId) {
      filtered = filtered.filter(
        (product) => product.category?.id === filters.categoryId
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.unitPrice >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.unitPrice <= filters.maxPrice!
      );
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.category?.categoryName.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case "name":
            aValue = a.productName;
            bValue = b.productName;
            break;
          case "price":
            aValue = a.unitPrice;
            bValue = b.unitPrice;
            break;
          case "createdAt":
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === "desc") {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  },

  getProductsByCategory: (categoryId) => {
    const { products } = get();
    return products.filter((product) => product.category?.id === categoryId);
  },

  searchProducts: (searchTerm) => {
    const { products } = get();
    const searchLower = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category?.categoryName.toLowerCase().includes(searchLower)
    );
  },
}));
