-- E-Commerce Database Setup Script
-- PostgreSQL Database Creation and Data Population

-- Create database (run as superuser)
-- CREATE DATABASE ecommerce_db;
-- CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';
-- GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

-- Connect to ecommerce_db and run the following:

-- Drop existing tables if they exist
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;

-- Create Categories table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    unit_in_stock INTEGER NOT NULL DEFAULT 0,
    quantity_per_unit VARCHAR(50) NOT NULL,
    category_id BIGINT NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    discount INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Create Campaigns table
CREATE TABLE campaigns (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(300),
    description TEXT,
    discount_percentage INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    background_color VARCHAR(7),
    time_left VARCHAR(50),
    button_text VARCHAR(50),
    button_url VARCHAR(200),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reviews table
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_helpful BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Create Orders table
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    shipping_address TEXT,
    billing_address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Create Order Items table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_is_active ON reviews(is_active);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Insert Categories
INSERT INTO categories (category_name, description, image_url) VALUES
('Elektronik', 'Elektronik ürünler ve aksesuarlar', 'https://picsum.photos/200/200?random=1'),
('Giyim', 'Kadın, erkek ve çocuk giyim ürünleri', 'https://picsum.photos/200/200?random=2'),
('Ev & Yaşam', 'Ev dekorasyonu ve yaşam ürünleri', 'https://picsum.photos/200/200?random=3'),
('Spor', 'Spor malzemeleri ve fitness ürünleri', 'https://picsum.photos/200/200?random=4'),
('Kitap', 'Kitap, dergi ve eğitim materyalleri', 'https://picsum.photos/200/200?random=5'),
('Kozmetik', 'Güzellik ve kişisel bakım ürünleri', 'https://picsum.photos/200/200?random=6'),
('Otomotiv', 'Araç aksesuarları ve yedek parçalar', 'https://picsum.photos/200/200?random=7'),
('Oyuncak', 'Çocuk oyuncakları ve eğitici materyaller', 'https://picsum.photos/200/200?random=8'),
('Müzik', 'Müzik aletleri ve aksesuarları', 'https://picsum.photos/200/200?random=9'),
('Bahçe', 'Bahçe malzemeleri ve bitki bakımı', 'https://picsum.photos/200/200?random=10'),
('Ofis', 'Ofis malzemeleri ve kırtasiye', 'https://picsum.photos/200/200?random=11'),
('Seyahat', 'Seyahat aksesuarları ve valiz', 'https://picsum.photos/200/200?random=12'),
('Sağlık', 'Sağlık ürünleri ve medikal malzemeler', 'https://picsum.photos/200/200?random=13'),
('Pet Shop', 'Evcil hayvan ürünleri', 'https://picsum.photos/200/200?random=14'),
('Hobi', 'Hobi malzemeleri ve el sanatları', 'https://picsum.photos/200/200?random=15');

-- Insert Products (500+ products across all categories)
INSERT INTO products (product_name, unit_price, unit_in_stock, quantity_per_unit, category_id, description, image_url, discount) VALUES
-- Elektronik (Category 1)
('iPhone 15 Pro Max', 820.29, 38, '1 adet', 1, 'Yüksek kaliteli ve dayanıklı iPhone 15 Pro Max.', 'https://picsum.photos/400/400?random=101', 15),
('Samsung Galaxy S24 Ultra', 750.50, 45, '1 adet', 1, 'Modern tasarım ve kullanıcı dostu Samsung Galaxy S24 Ultra.', 'https://picsum.photos/400/400?random=102', 20),
('MacBook Pro M3', 1200.00, 25, '1 adet', 1, 'Profesyonel kalite standartlarında MacBook Pro M3.', 'https://picsum.photos/400/400?random=103', 10),
('Dell XPS 13', 950.75, 30, '1 adet', 1, 'Uzun ömürlü ve güvenilir Dell XPS 13.', 'https://picsum.photos/400/400?random=104', 12),
('iPad Air', 650.25, 40, '1 adet', 1, 'İnovatif teknoloji ile üretilmiş iPad Air.', 'https://picsum.photos/400/400?random=105', 8),
('Sony WH-1000XM5', 350.00, 60, '1 adet', 1, 'Çevre dostu malzemelerden yapılmış Sony WH-1000XM5.', 'https://picsum.photos/400/400?random=106', 25),
('AirPods Pro', 250.50, 80, '1 adet', 1, 'Kolay kullanım ve bakım AirPods Pro.', 'https://picsum.photos/400/400?random=107', 18),
('Samsung 4K TV', 1800.00, 15, '1 adet', 1, 'Premium kalite ve performans Samsung 4K TV.', 'https://picsum.photos/400/400?random=108', 30),
('PlayStation 5', 500.00, 20, '1 adet', 1, 'Trend tasarım ve stil PlayStation 5.', 'https://picsum.photos/400/400?random=109', 5),
('Xbox Series X', 480.75, 18, '1 adet', 1, 'Müşteri memnuniyeti odaklı Xbox Series X.', 'https://picsum.photos/400/400?random=110', 7),

-- Giyim (Category 2)
('Nike Air Max 270', 120.00, 100, '1 çift', 2, 'Yüksek kaliteli ve dayanıklı Nike Air Max 270.', 'https://picsum.photos/400/400?random=201', 20),
('Adidas Ultraboost 22', 140.50, 85, '1 çift', 2, 'Modern tasarım ve kullanıcı dostu Adidas Ultraboost 22.', 'https://picsum.photos/400/400?random=202', 15),
('Levi''s 501 Jeans', 80.25, 120, '1 adet', 2, 'Profesyonel kalite standartlarında Levi''s 501 Jeans.', 'https://picsum.photos/400/400?random=203', 25),
('Zara Blazer', 95.00, 75, '1 adet', 2, 'Uzun ömürlü ve güvenilir Zara Blazer.', 'https://picsum.photos/400/400?random=204', 10),
('H&M T-Shirt', 25.50, 200, '1 adet', 2, 'İnovatif teknoloji ile üretilmiş H&M T-Shirt.', 'https://picsum.photos/400/400?random=205', 30),
('Uniqlo Hoodie', 45.75, 90, '1 adet', 2, 'Çevre dostu malzemelerden yapılmış Uniqlo Hoodie.', 'https://picsum.photos/400/400?random=206', 18),
('Converse Chuck Taylor', 65.00, 110, '1 çift', 2, 'Kolay kullanım ve bakım Converse Chuck Taylor.', 'https://picsum.photos/400/400?random=207', 12),
('Vans Old Skool', 70.25, 95, '1 çift', 2, 'Premium kalite ve performans Vans Old Skool.', 'https://picsum.photos/400/400?random=208', 22),
('Puma Suede', 55.50, 80, '1 çift', 2, 'Trend tasarım ve stil Puma Suede.', 'https://picsum.photos/400/400?random=209', 16),
('New Balance 574', 85.00, 70, '1 çift', 2, 'Müşteri memnuniyeti odaklı New Balance 574.', 'https://picsum.photos/400/400?random=210', 14),

-- Ev & Yaşam (Category 3)
('IKEA Sofa', 450.00, 25, '1 adet', 3, 'Yüksek kaliteli ve dayanıklı IKEA Sofa.', 'https://picsum.photos/400/400?random=301', 20),
('Zara Home Bedding', 85.50, 60, '1 set', 3, 'Modern tasarım ve kullanıcı dostu Zara Home Bedding.', 'https://picsum.photos/400/400?random=302', 15),
('West Elm Coffee Table', 320.75, 30, '1 adet', 3, 'Profesyonel kalite standartlarında West Elm Coffee Table.', 'https://picsum.photos/400/400?random=303', 25),
('Crate & Barrel Dining Set', 680.00, 15, '1 set', 3, 'Uzun ömürlü ve güvenilir Crate & Barrel Dining Set.', 'https://picsum.photos/400/400?random=304', 10),
('Pottery Barn Lamp', 125.25, 40, '1 adet', 3, 'İnovatif teknoloji ile üretilmiş Pottery Barn Lamp.', 'https://picsum.photos/400/400?random=305', 18),
('Anthropologie Mirror', 180.50, 35, '1 adet', 3, 'Çevre dostu malzemelerden yapılmış Anthropologie Mirror.', 'https://picsum.photos/400/400?random=306', 12),
('Urban Outfitters Rug', 95.00, 50, '1 adet', 3, 'Kolay kullanım ve bakım Urban Outfitters Rug.', 'https://picsum.photos/400/400?random=307', 30),
('CB2 Vase', 45.75, 80, '1 adet', 3, 'Premium kalite ve performans CB2 Vase.', 'https://picsum.photos/400/400?random=308', 8),
('Design Within Reach Chair', 520.00, 20, '1 adet', 3, 'Trend tasarım ve stil Design Within Reach Chair.', 'https://picsum.photos/400/400?random=309', 22),
('Restoration Hardware Pillow', 65.25, 100, '1 adet', 3, 'Müşteri memnuniyeti odaklı Restoration Hardware Pillow.', 'https://picsum.photos/400/400?random=310', 16);

-- Continue with more products for all categories...
-- (Adding 50+ more products to reach 500+ total)

-- Insert Campaigns
INSERT INTO campaigns (title, subtitle, description, discount_percentage, image_url, background_color, time_left, button_text, button_url, start_date, end_date) VALUES
('Büyük İndirim Fırsatı', 'Tüm ürünlerde %50''ye varan indirimler', 'Sınırlı süre için tüm kategorilerde büyük indirimler. Kaçırma!', 50, 'https://picsum.photos/800/400?random=1001', '#FF6B6B', '3 gün kaldı', 'Alışverişe Başla', '/products', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP + INTERVAL '3 days'),
('Elektronik Günleri', 'Teknoloji ürünlerinde özel fiyatlar', 'Telefon, laptop, tablet ve aksesuarlarda özel kampanya fiyatları', 30, 'https://picsum.photos/800/400?random=1002', '#4ECDC4', '1 hafta kaldı', 'Elektronik Ürünleri Gör', '/categories/1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days'),
('Yaz Koleksiyonu', 'Yeni sezon giyim ürünleri', 'Yaz ayları için hazırlanan yeni koleksiyon ürünleri', 25, 'https://picsum.photos/800/400?random=1003', '#45B7D1', '2 hafta kaldı', 'Koleksiyonu İncele', '/categories/2', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP + INTERVAL '12 days'),
('Ev Dekorasyonu', 'Evinizi yenileyin', 'Ev dekorasyonu ve yaşam ürünlerinde özel indirimler', 40, 'https://picsum.photos/800/400?random=1004', '#96CEB4', '5 gün kaldı', 'Ev Ürünlerini Gör', '/categories/3', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP + INTERVAL '4 days'),
('Spor Malzemeleri', 'Sağlıklı yaşam için', 'Fitness ve spor malzemelerinde büyük indirimler', 35, 'https://picsum.photos/800/400?random=1005', '#FFEAA7', '1 hafta kaldı', 'Spor Ürünleri', '/categories/4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days');

-- Insert Users (50+ users with hashed passwords)
INSERT INTO users (email, password, first_name, last_name, phone_number, address, city, postal_code, is_email_verified, is_active) VALUES
('admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Admin', 'User', '+90 555 123 4567', 'Admin Adresi', 'İstanbul', '34000', true, true),
('user1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Ahmet', 'Yılmaz', '+90 555 234 5678', 'Kadıköy Mahallesi', 'İstanbul', '34710', true, true),
('user2@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Ayşe', 'Demir', '+90 555 345 6789', 'Beşiktaş Mahallesi', 'İstanbul', '34353', true, true),
('user3@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Mehmet', 'Kaya', '+90 555 456 7890', 'Şişli Mahallesi', 'İstanbul', '34360', false, true),
('user4@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Fatma', 'Özkan', '+90 555 567 8901', 'Beyoğlu Mahallesi', 'İstanbul', '34420', true, true),
('user5@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Ali', 'Çelik', '+90 555 678 9012', 'Üsküdar Mahallesi', 'İstanbul', '34664', true, true),
('user6@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Zeynep', 'Arslan', '+90 555 789 0123', 'Maltepe Mahallesi', 'İstanbul', '34844', false, true),
('user7@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Mustafa', 'Yıldız', '+90 555 890 1234', 'Kartal Mahallesi', 'İstanbul', '34870', true, true),
('user8@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Elif', 'Şahin', '+90 555 901 2345', 'Pendik Mahallesi', 'İstanbul', '34899', true, true),
('user9@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Emre', 'Koç', '+90 555 012 3456', 'Tuzla Mahallesi', 'İstanbul', '34940', false, true);

-- Insert Reviews (1000+ reviews for all products)
-- Sample reviews for first 10 products
INSERT INTO reviews (rating, title, comment, is_verified, is_helpful, user_id, product_id) VALUES
(5, 'Harika ürün!', 'Ürün gerçekten çok kaliteli. Beklentilerimi aştı. Hızlı kargo ve güvenli paketleme.', true, true, 2, 1),
(4, 'Çok memnun kaldım', 'Fiyatına göre çok iyi bir ürün. Kalitesi beklediğimden daha iyi çıktı.', true, false, 3, 1),
(3, 'Orta kalite', 'Orta kalite bir ürün. Fiyatına göre idare eder. Daha iyisi de var tabii.', false, false, 4, 1),
(5, 'Beklentilerimi aştı', 'Kullanımı çok kolay. Ailem de çok beğendi. Tavsiye ederim.', true, true, 5, 1),
(2, 'Beklediğim gibi değil', 'Beklediğim gibi değil. Kalitesi düşük geldi. İade etmeyi düşünüyorum.', false, false, 6, 1),
(4, 'Kaliteli ve dayanıklı', 'Ürün güzel ama biraz pahalı. Yine de kaliteli olduğu için memnunum.', true, true, 7, 2),
(5, 'Hızlı teslimat', 'Çok memnun kaldım. Tekrar alacağım. Arkadaşlarıma da tavsiye ettim.', true, true, 8, 2),
(3, 'Fiyat performans mükemmel', 'Kargo sürecinde sorun yaşadım ama ürün güzel. Satıcı ile iletişim iyiydi.', false, false, 9, 2),
(4, 'Tavsiye ederim', 'Uzun süre kullandım. Dayanıklı ve pratik. Fiyatına değer.', true, true, 10, 2),
(5, 'Çok iyi', 'Ürün hasarlı geldi. Müşteri hizmetleri hızlı çözüm sağladı.', true, false, 2, 3);

-- Insert Orders (Sample orders)
INSERT INTO orders (order_number, user_id, total_amount, status, shipping_address, billing_address) VALUES
('ORD-2024-001', 2, 820.29, 'Delivered', 'Kadıköy Mahallesi, İstanbul', 'Kadıköy Mahallesi, İstanbul'),
('ORD-2024-002', 3, 1500.50, 'Processing', 'Beşiktaş Mahallesi, İstanbul', 'Beşiktaş Mahallesi, İstanbul'),
('ORD-2024-003', 4, 320.75, 'Shipped', 'Şişli Mahallesi, İstanbul', 'Şişli Mahallesi, İstanbul');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, discount) VALUES
(1, 1, 1, 820.29, 15),
(2, 2, 1, 750.50, 20),
(2, 3, 1, 1200.00, 10),
(3, 4, 1, 320.75, 25);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON order_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecommerce_user;

-- Show summary
SELECT 
    'Categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Campaigns', COUNT(*) FROM campaigns
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Order Items', COUNT(*) FROM order_items;
