using EcommerceBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Address> Addresses { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Product configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.ProductName).IsRequired().HasMaxLength(200).HasColumnName("product_name");
                entity.Property(e => e.UnitPrice).HasColumnType("decimal(12,2)").HasColumnName("unit_price");
                entity.Property(e => e.QuantityPerUnit).IsRequired().HasMaxLength(50).HasColumnName("quantity_per_unit");
                entity.Property(e => e.Description).HasMaxLength(1000).HasColumnName("description");
                entity.Property(e => e.Discount).HasDefaultValue(0).HasColumnName("discount");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.ImageUrl).HasColumnName("image_url");
                entity.Property(e => e.UnitInStock).HasColumnName("unit_in_stock");
                
                entity.HasOne(e => e.Category)
                    .WithMany(c => c.Products)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            
            // Category configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CategoryName).IsRequired().HasMaxLength(100).HasColumnName("category_name");
                entity.Property(e => e.Description).HasMaxLength(500).HasColumnName("description");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                entity.Property(e => e.ImageUrl).HasColumnName("image_url");
                
                entity.HasIndex(e => e.CategoryName).IsUnique();
            });
            
            // Campaign configuration
            modelBuilder.Entity<Campaign>(entity =>
            {
                entity.ToTable("campaigns"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200).HasColumnName("title");
                entity.Property(e => e.Subtitle).HasMaxLength(300).HasColumnName("subtitle");
                entity.Property(e => e.Description).HasMaxLength(1000).HasColumnName("description");
                entity.Property(e => e.ButtonText).HasMaxLength(50).HasColumnName("button_text");
                entity.Property(e => e.Discount).HasDefaultValue(0).HasColumnName("discount");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                entity.Property(e => e.ImageUrl).HasColumnName("image_url");
            });
            
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255).HasColumnName("email");
                entity.Property(e => e.Password).IsRequired().HasMaxLength(255).HasColumnName("password");
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100).HasColumnName("first_name");
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100).HasColumnName("last_name");
                entity.Property(e => e.PhoneNumber).HasMaxLength(20).HasColumnName("phone_number");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.PostalCode).HasColumnName("postal_code");
                entity.Property(e => e.IsEmailVerified).HasDefaultValue(false).HasColumnName("is_email_verified");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                // entity.Property(e => e.LastLoginAt).HasColumnName("last_login_at"); // Column doesn't exist in database
                
                entity.HasIndex(e => e.Email).IsUnique();
            });
            
            // Review configuration
            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("reviews"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Rating).IsRequired().HasColumnName("rating");
                entity.Property(e => e.Comment).HasMaxLength(1000).HasColumnName("comment");
                entity.Property(e => e.Title).HasMaxLength(200).HasColumnName("title");
                entity.Property(e => e.IsVerified).HasDefaultValue(false).HasColumnName("is_verified");
                entity.Property(e => e.IsHelpful).HasDefaultValue(false).HasColumnName("is_helpful");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                
                entity.HasOne(e => e.User)
                    .WithMany(u => u.Reviews)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Product)
                    .WithMany()
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            
            // Order configuration
            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.OrderNumber).IsRequired().HasMaxLength(50).HasColumnName("order_number");
                entity.Property(e => e.TotalAmount).IsRequired().HasColumnType("decimal(12,2)").HasColumnName("total_amount");
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50).HasColumnName("status");
                entity.Property(e => e.ShippingAddress).HasMaxLength(500).HasColumnName("shipping_address");
                entity.Property(e => e.BillingAddress).HasMaxLength(500).HasColumnName("billing_address");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                
                entity.HasOne(e => e.User)
                    .WithMany(u => u.Orders)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.OrderNumber).IsUnique();
            });
            
            // OrderItem configuration
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("order_items"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Quantity).IsRequired().HasColumnName("quantity");
                entity.Property(e => e.UnitPrice).IsRequired().HasColumnType("decimal(12,2)").HasColumnName("unit_price");
                entity.Property(e => e.Discount).HasDefaultValue(0).HasColumnType("decimal(12,2)").HasColumnName("discount");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                entity.Property(e => e.OrderId).HasColumnName("order_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                
                entity.HasOne(e => e.Order)
                    .WithMany(o => o.OrderItems)
                    .HasForeignKey(e => e.OrderId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Product)
                    .WithMany()
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            
            // Favorite configuration
            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.ToTable("favorites"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Product)
                    .WithMany()
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => new { e.UserId, e.ProductId }).IsUnique();
            });
            
            // Address configuration
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("addresses"); // Explicitly set table name
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100).HasColumnName("title");
                entity.Property(e => e.FullAddress).IsRequired().HasMaxLength(500).HasColumnName("full_address");
                entity.Property(e => e.City).IsRequired().HasMaxLength(100).HasColumnName("city");
                entity.Property(e => e.District).IsRequired().HasMaxLength(100).HasColumnName("district");
                entity.Property(e => e.PostalCode).IsRequired().HasMaxLength(20).HasColumnName("postal_code");
                entity.Property(e => e.Country).HasMaxLength(100).HasColumnName("country");
                entity.Property(e => e.IsDefault).HasDefaultValue(false).HasColumnName("is_default");
                entity.Property(e => e.PhoneNumber).HasMaxLength(20).HasColumnName("phone_number");
                entity.Property(e => e.IsActive).HasDefaultValue(true).HasColumnName("is_active");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_at");
                
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
