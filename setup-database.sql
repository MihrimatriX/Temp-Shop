-- PostgreSQL Database Setup for E-commerce Application
-- Bu script'i PostgreSQL'de çalıştırarak veritabanını oluşturun

-- Veritabanı oluştur
CREATE DATABASE ecommerce_db;

-- Kullanıcı oluştur
CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';

-- Kullanıcıya yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

-- Veritabanına bağlan
\c ecommerce_db;

-- Kullanıcıya schema yetkileri ver
GRANT ALL ON SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecommerce_user;

-- Gelecekte oluşturulacak tablolar için de yetki ver
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ecommerce_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ecommerce_user;

-- Başarı mesajı
SELECT 'Database setup completed successfully!' as message;
