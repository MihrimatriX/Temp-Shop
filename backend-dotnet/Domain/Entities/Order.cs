using System.ComponentModel.DataAnnotations;

namespace EcommerceBackend.Domain.Entities
{
    public class Order : BaseEntity
    {
        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
        
        [Required(ErrorMessage = "Order number is required")]
        [StringLength(50, ErrorMessage = "Order number cannot exceed 50 characters")]
        public string OrderNumber { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Total amount is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Total amount must be positive")]
        public decimal TotalAmount { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [StringLength(50, ErrorMessage = "Status cannot exceed 50 characters")]
        public string Status { get; set; } = "Pending";
        
        [StringLength(500, ErrorMessage = "Shipping address cannot exceed 500 characters")]
        public string? ShippingAddress { get; set; }
        
        [StringLength(500, ErrorMessage = "Billing address cannot exceed 500 characters")]
        public string? BillingAddress { get; set; }
        
        public string? Notes { get; set; }
        
        public DateTime? ShippedAt { get; set; }
        
        public DateTime? DeliveredAt { get; set; }
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
