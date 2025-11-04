import {
  Product,
  Category,
  SubCategory,
  Campaign,
  Review,
  ProductReviewSummary,
} from "@/types";
import {
  extendedCategories,
  extendedSubCategories,
  extendedCampaigns,
  generateExtendedProducts,
  generateExtendedReviews,
  generateExtendedReviewSummaries,
} from "@/data/mock-data-extended";

// Mock Products - Genişletilmiş veri kullanılıyor
export const mockProducts: Product[] = generateExtendedProducts();

// Mock Categories - Genişletilmiş veri kullanılıyor
export const mockCategories: Category[] = extendedCategories;

// Mock SubCategories - Genişletilmiş veri kullanılıyor
export const mockSubCategories: SubCategory[] = extendedSubCategories;

// Mock Campaigns - Genişletilmiş veri kullanılıyor
export const mockCampaigns: Campaign[] = extendedCampaigns;

// Mock Reviews - Dinamik olarak oluşturuluyor
export const mockReviews: Review[] = generateExtendedReviews(mockProducts);

// Mock Review Summaries - Dinamik olarak oluşturuluyor
export const mockReviewSummaries: ProductReviewSummary[] = generateExtendedReviewSummaries(mockProducts, mockReviews);

// Mock Data Service Class
export class MockDataService {
  // Products
  static getProducts(): Product[] {
    return mockProducts;
  }

  static getProductById(id: number): Product | undefined {
    return mockProducts.find(product => product.id === id);
  }

  static getProductsByCategory(categoryId: number): Product[] {
    return mockProducts.filter(product => product.category?.id === categoryId);
  }

  static searchProducts(searchTerm: string): Product[] {
    const term = searchTerm.toLowerCase();
    return mockProducts.filter(product => 
      product.productName.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category?.categoryName.toLowerCase().includes(term)
    );
  }

  static getFeaturedProducts(): Product[] {
    return mockProducts.filter(product => product.discount && product.discount > 15);
  }

  static getDiscountedProducts(): Product[] {
    return mockProducts.filter(product => product.discount && product.discount > 0);
  }

  // Categories
  static getCategories(): Category[] {
    return mockCategories;
  }

  static getCategoryById(id: number): Category | undefined {
    return mockCategories.find(category => category.id === id);
  }

  // SubCategories
  static getSubCategories(): SubCategory[] {
    return mockSubCategories;
  }

  static getSubCategoryById(id: number): SubCategory | undefined {
    return mockSubCategories.find(subCategory => subCategory.id === id);
  }

  static getSubCategoriesByCategoryId(categoryId: number): SubCategory[] {
    return mockSubCategories.filter(subCategory => subCategory.categoryId === categoryId);
  }

  // Campaigns
  static getCampaigns(): Campaign[] {
    return mockCampaigns;
  }

  static getCampaignById(id: number): Campaign | undefined {
    return mockCampaigns.find(campaign => campaign.id === id);
  }

  static getActiveCampaigns(): Campaign[] {
    const now = new Date();
    return mockCampaigns.filter(campaign => 
      campaign.isActive && 
      campaign.startDate <= now && 
      campaign.endDate >= now
    );
  }

  // Reviews
  static getReviews(): Review[] {
    return mockReviews;
  }

  static getReviewById(id: number): Review | undefined {
    return mockReviews.find(review => review.id === id);
  }

  static getProductReviews(productId: number): Review[] {
    return mockReviews.filter(review => review.productId === productId);
  }

  static getProductReviewSummary(productId: number): ProductReviewSummary | undefined {
    return mockReviewSummaries.find(summary => summary.productId === productId);
  }

  static createReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Review {
    const newReview: Review = {
      ...reviewData,
      id: mockReviews.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockReviews.push(newReview);
    return newReview;
  }

  static updateReview(id: number, updateData: Partial<Review>): Review | undefined {
    const reviewIndex = mockReviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) return undefined;

    mockReviews[reviewIndex] = {
      ...mockReviews[reviewIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    return mockReviews[reviewIndex];
  }

  static deleteReview(id: number): boolean {
    const reviewIndex = mockReviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) return false;

    mockReviews.splice(reviewIndex, 1);
    return true;
  }

  // Utility Methods
  static getRandomProducts(count: number): Product[] {
    const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  static getProductsByPriceRange(minPrice: number, maxPrice: number): Product[] {
    return mockProducts.filter(product => 
      product.unitPrice >= minPrice && product.unitPrice <= maxPrice
    );
  }

  static getProductsByDiscount(minDiscount: number): Product[] {
    return mockProducts.filter(product => 
      product.discount && product.discount >= minDiscount
    );
  }

  static getInStockProducts(): Product[] {
    return mockProducts.filter(product => product.unitInStock > 0);
  }

  static getOutOfStockProducts(): Product[] {
    return mockProducts.filter(product => product.unitInStock === 0);
  }

  // Statistics
  static getProductStats() {
    const totalProducts = mockProducts.length;
    const inStockProducts = this.getInStockProducts().length;
    const outOfStockProducts = this.getOutOfStockProducts().length;
    const discountedProducts = this.getDiscountedProducts().length;
    const totalCategories = mockCategories.length;
    const totalSubCategories = mockSubCategories.length;
    const activeCampaigns = this.getActiveCampaigns().length;
    const totalReviews = mockReviews.length;

    return {
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      discountedProducts,
      totalCategories,
      totalSubCategories,
      activeCampaigns,
      totalReviews,
    };
  }
}