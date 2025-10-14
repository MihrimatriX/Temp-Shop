export interface Product {
  id: number;
  productName: string;
  unitPrice: number;
  unitInStock: number;
  quantityPerUnit: string;
  category?: Category;
  description?: string;
  imageUrl?: string;
  discount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  categoryName: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Campaign {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  discount?: number;
  imageUrl?: string;
  backgroundColor?: string;
  timeLeft?: string;
  buttonText?: string;
  buttonHref?: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address;
  isActive: boolean;
  createdAt: Date;
}

export interface Address {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: number;
  orderNumber: string;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  PAYPAL = "PAYPAL",
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: Product;
}

export interface RemoveFromCartAction {
  type: "REMOVE_FROM_CART";
  payload: Product;
}

export interface UpdateCartItemQuantityAction {
  type: "UPDATE_CART_ITEM_QUANTITY";
  payload: {
    productId: number;
    quantity: number;
  };
}

export interface ClearCartAction {
  type: "CLEAR_CART";
}

export type CartAction =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemQuantityAction
  | ClearCartAction;

export interface ProductFormData {
  productName: string;
  unitPrice: number;
  unitInStock: number;
  quantityPerUnit: string;
  categoryId: number;
  description?: string;
  imageUrl?: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export interface CartSummaryProps {
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export interface ProductListProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  filters?: ProductFilters;
  onFiltersChange?: (filters: ProductFilters) => void;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export interface FilterSidebarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: Category[];
  loading?: boolean;
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  isHelpful: boolean;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  productName?: string;
}

export interface ProductReviewSummary {
  productId: number;
  averageRating: number;
  totalReviews: number;
  rating1Count: number;
  rating2Count: number;
  rating3Count: number;
  rating4Count: number;
  rating5Count: number;
}

export interface CreateReview {
  productId: number;
  rating: number;
  title?: string;
  comment?: string;
}

export interface UpdateReview {
  rating?: number;
  title?: string;
  comment?: string;
}
