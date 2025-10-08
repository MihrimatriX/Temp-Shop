using System.ComponentModel.DataAnnotations;

namespace EcommerceBackend.Application.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? ShippingAddress { get; set; }
        public string? BillingAddress { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }

    public class OrderItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalPrice { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductImageUrl { get; set; }
        public int OrderId { get; set; }
    }

    public class CreateOrderDto
    {
        [Required(ErrorMessage = "Order items are required")]
        public List<CreateOrderItemDto> OrderItems { get; set; } = new List<CreateOrderItemDto>();

        [Required(ErrorMessage = "Shipping address is required")]
        [StringLength(500, ErrorMessage = "Shipping address cannot exceed 500 characters")]
        public string ShippingAddress { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Billing address cannot exceed 500 characters")]
        public string? BillingAddress { get; set; }
    }

    public class CreateOrderItemDto
    {
        [Required(ErrorMessage = "Product ID is required")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
    }

    public class UpdateOrderStatusDto
    {
        [Required(ErrorMessage = "Status is required")]
        [StringLength(50, ErrorMessage = "Status cannot exceed 50 characters")]
        public string Status { get; set; } = string.Empty;
    }
}
