export interface MockUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  isEmailVerified: boolean;
  phoneNumber?: string;
  avatar?: string;
  addresses: MockAddress[];
  orders: MockOrder[];
  favorites: number[]; // Product IDs
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface MockAddress {
  id: number;
  title: string;
  fullAddress: string;
  city: string;
  district: string;
  postalCode: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export interface MockOrder {
  id: number;
  orderNumber: string;
  items: MockOrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: MockAddress;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockOrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Mock kullanıcı verileri
export const mockUsers: MockUser[] = [
  {
    id: 1,
    email: 'admin@tempshop.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isEmailVerified: true,
    phoneNumber: '0555 000 00 01',
    avatar: 'https://i.pravatar.cc/150?img=1',
    addresses: [
      {
        id: 1,
        title: 'Ev',
        fullAddress: 'Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5',
        city: 'İstanbul',
        district: 'Kadıköy',
        postalCode: '34710',
        phoneNumber: '0555 000 00 01',
        isDefault: true,
      },
    ],
    orders: [],
    favorites: [1, 5, 12, 18],
    createdAt: new Date('2023-01-01'),
    lastLoginAt: new Date(),
  },
  {
    id: 2,
    email: 'ahmet.yilmaz@email.com',
    password: 'user123',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    role: 'user',
    isEmailVerified: true,
    phoneNumber: '0555 123 45 67',
    avatar: 'https://i.pravatar.cc/150?img=2',
    addresses: [
      {
        id: 2,
        title: 'Ev',
        fullAddress: 'Merkez Mahallesi, İstiklal Caddesi No:45 Daire:3',
        city: 'Ankara',
        district: 'Çankaya',
        postalCode: '06100',
        phoneNumber: '0555 123 45 67',
        isDefault: true,
      },
      {
        id: 3,
        title: 'İş',
        fullAddress: 'Kızılay Mahallesi, Atatürk Bulvarı No:78 Kat:5',
        city: 'Ankara',
        district: 'Kızılay',
        postalCode: '06420',
        phoneNumber: '0555 123 45 67',
        isDefault: false,
      },
    ],
    orders: [
      {
        id: 1,
        orderNumber: 'TS-2024-001',
        items: [
          {
            productId: 1,
            productName: 'Samsung Galaxy S24',
            quantity: 1,
            unitPrice: 25000,
            totalPrice: 25000,
          },
        ],
        totalAmount: 25000,
        status: 'delivered',
        shippingAddress: {
          id: 2,
          title: 'Ev',
          fullAddress: 'Merkez Mahallesi, İstiklal Caddesi No:45 Daire:3',
          city: 'Ankara',
          district: 'Çankaya',
          postalCode: '06100',
          phoneNumber: '0555 123 45 67',
          isDefault: true,
        },
        paymentMethod: 'Kredi Kartı',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-18'),
      },
    ],
    favorites: [3, 7, 15, 22],
    createdAt: new Date('2023-06-15'),
    lastLoginAt: new Date(),
  },
  {
    id: 3,
    email: 'ayse.demir@email.com',
    password: 'user123',
    firstName: 'Ayşe',
    lastName: 'Demir',
    role: 'user',
    isEmailVerified: true,
    phoneNumber: '0555 987 65 43',
    avatar: 'https://i.pravatar.cc/150?img=3',
    addresses: [
      {
        id: 4,
        title: 'Ev',
        fullAddress: 'Bahçelievler Mahallesi, Gül Sokak No:12 Daire:8',
        city: 'İzmir',
        district: 'Konak',
        postalCode: '35250',
        phoneNumber: '0555 987 65 43',
        isDefault: true,
      },
    ],
    orders: [
      {
        id: 2,
        orderNumber: 'TS-2024-002',
        items: [
          {
            productId: 5,
            productName: 'iPhone 15 Pro',
            quantity: 1,
            unitPrice: 45000,
            totalPrice: 45000,
          },
          {
            productId: 12,
            productName: 'AirPods Pro',
            quantity: 1,
            unitPrice: 8000,
            totalPrice: 8000,
          },
        ],
        totalAmount: 53000,
        status: 'shipped',
        shippingAddress: {
          id: 4,
          title: 'Ev',
          fullAddress: 'Bahçelievler Mahallesi, Gül Sokak No:12 Daire:8',
          city: 'İzmir',
          district: 'Konak',
          postalCode: '35250',
          phoneNumber: '0555 987 65 43',
          isDefault: true,
        },
        paymentMethod: 'Banka Kartı',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-22'),
      },
    ],
    favorites: [2, 8, 14, 19, 25],
    createdAt: new Date('2023-08-20'),
    lastLoginAt: new Date(),
  },
  {
    id: 4,
    email: 'mehmet.kaya@email.com',
    password: 'user123',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    role: 'user',
    isEmailVerified: false,
    phoneNumber: '0555 456 78 90',
    avatar: 'https://i.pravatar.cc/150?img=4',
    addresses: [
      {
        id: 5,
        title: 'Ev',
        fullAddress: 'Yeni Mahalle, Cumhuriyet Meydanı No:67 Daire:2',
        city: 'Bursa',
        district: 'Osmangazi',
        postalCode: '16010',
        phoneNumber: '0555 456 78 90',
        isDefault: true,
      },
    ],
    orders: [],
    favorites: [4, 9, 16, 21],
    createdAt: new Date('2023-11-10'),
    lastLoginAt: new Date(),
  },
  {
    id: 5,
    email: 'fatma.ozturk@email.com',
    password: 'user123',
    firstName: 'Fatma',
    lastName: 'Öztürk',
    role: 'user',
    isEmailVerified: true,
    phoneNumber: '0555 321 54 76',
    avatar: 'https://i.pravatar.cc/150?img=5',
    addresses: [
      {
        id: 6,
        title: 'Ev',
        fullAddress: 'Güneş Mahallesi, Çiçek Sokak No:34 Daire:6',
        city: 'Antalya',
        district: 'Muratpaşa',
        postalCode: '07100',
        phoneNumber: '0555 321 54 76',
        isDefault: true,
      },
    ],
    orders: [
      {
        id: 3,
        orderNumber: 'TS-2024-003',
        items: [
          {
            productId: 8,
            productName: 'MacBook Air M2',
            quantity: 1,
            unitPrice: 35000,
            totalPrice: 35000,
          },
        ],
        totalAmount: 35000,
        status: 'processing',
        shippingAddress: {
          id: 6,
          title: 'Ev',
          fullAddress: 'Güneş Mahallesi, Çiçek Sokak No:34 Daire:6',
          city: 'Antalya',
          district: 'Muratpaşa',
          postalCode: '07100',
          phoneNumber: '0555 321 54 76',
          isDefault: true,
        },
        paymentMethod: 'Kredi Kartı',
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25'),
      },
    ],
    favorites: [6, 11, 17, 23, 28],
    createdAt: new Date('2023-09-05'),
    lastLoginAt: new Date(),
  },
];

// Mock token üretimi
export const generateMockToken = (userId: number): string => {
  const payload = {
    userId,
    email: mockUsers.find(u => u.id === userId)?.email,
    role: mockUsers.find(u => u.id === userId)?.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 saat
  };
  
  // Basit base64 encoding (gerçek JWT değil, sadece simülasyon)
  return btoa(JSON.stringify(payload));
};

// Token doğrulama
export const verifyMockToken = (token: string): { userId: number; email: string; role: string } | null => {
  try {
    const payload = JSON.parse(atob(token));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return null; // Token süresi dolmuş
    }
    
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

// Kullanıcı bulma
export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const findUserById = (id: number): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Şifre doğrulama
export const verifyPassword = (user: MockUser, password: string): boolean => {
  return user.password === password;
};

// Kullanıcı güncelleme
export const updateUser = (userId: number, updates: Partial<MockUser>): MockUser | null => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) return null;
  
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
  return mockUsers[userIndex];
};

// Adres ekleme
export const addUserAddress = (userId: number, address: Omit<MockAddress, 'id'>): MockAddress | null => {
  const user = findUserById(userId);
  if (!user) return null;
  
  const newAddress: MockAddress = {
    id: Date.now(), // Basit ID üretimi
    ...address,
  };
  
  user.addresses.push(newAddress);
  return newAddress;
};

// Adres güncelleme
export const updateUserAddress = (userId: number, addressId: number, updates: Partial<MockAddress>): MockAddress | null => {
  const user = findUserById(userId);
  if (!user) return null;
  
  const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);
  if (addressIndex === -1) return null;
  
  user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...updates };
  return user.addresses[addressIndex];
};

// Adres silme
export const deleteUserAddress = (userId: number, addressId: number): boolean => {
  const user = findUserById(userId);
  if (!user) return false;
  
  const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);
  if (addressIndex === -1) return false;
  
  user.addresses.splice(addressIndex, 1);
  return true;
};

// Favori ekleme/çıkarma
export const toggleUserFavorite = (userId: number, productId: number): boolean => {
  const user = findUserById(userId);
  if (!user) return false;
  
  const favoriteIndex = user.favorites.indexOf(productId);
  if (favoriteIndex === -1) {
    user.favorites.push(productId);
    return true; // Eklendi
  } else {
    user.favorites.splice(favoriteIndex, 1);
    return false; // Çıkarıldı
  }
};

// Sipariş ekleme
export const addUserOrder = (userId: number, order: Omit<MockOrder, 'id' | 'orderNumber'>): MockOrder | null => {
  const user = findUserById(userId);
  if (!user) return null;
  
  const newOrder: MockOrder = {
    id: Date.now(),
    orderNumber: `TS-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    ...order,
  };
  
  user.orders.push(newOrder);
  return newOrder;
};
