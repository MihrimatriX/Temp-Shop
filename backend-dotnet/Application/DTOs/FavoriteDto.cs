using System.ComponentModel.DataAnnotations;

namespace EcommerceBackend.Application.DTOs
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal? ProductPrice { get; set; }
        public string? ProductImageUrl { get; set; }
        public string? ProductDescription { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateFavoriteDto
    {
        [Required(ErrorMessage = "Product ID is required")]
        public int ProductId { get; set; }
    }
}
