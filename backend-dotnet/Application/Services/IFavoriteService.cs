using EcommerceBackend.Application.DTOs;

namespace EcommerceBackend.Application.Services
{
    public interface IFavoriteService
    {
        Task<BaseResponseDto<List<FavoriteDto>>> GetUserFavoritesAsync(int userId);
        Task<BaseResponseDto<FavoriteDto>> AddToFavoritesAsync(int userId, CreateFavoriteDto createFavoriteDto);
        Task<BaseResponseDto<string>> RemoveFromFavoritesAsync(int userId, int productId);
        Task<BaseResponseDto> IsFavoriteAsync(int userId, int productId);
    }
}
