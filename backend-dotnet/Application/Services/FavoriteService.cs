using EcommerceBackend.Application.DTOs;
using EcommerceBackend.Domain.Entities;
using EcommerceBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Application.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly ApplicationDbContext _context;

        public FavoriteService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BaseResponseDto<List<FavoriteDto>>> GetUserFavoritesAsync(int userId)
        {
            try
            {
                var favorites = await _context.Favorites
                    .Where(f => f.UserId == userId && f.IsActive)
                    .Include(f => f.Product)
                    .OrderByDescending(f => f.CreatedAt)
                    .Select(f => new FavoriteDto
                    {
                        Id = f.Id,
                        UserId = f.UserId,
                        ProductId = f.ProductId,
                        ProductName = f.Product.ProductName,
                        ProductPrice = f.Product.UnitPrice,
                        ProductImageUrl = f.Product.ImageUrl,
                        ProductDescription = f.Product.Description,
                        CreatedAt = f.CreatedAt
                    })
                    .ToListAsync();

                return BaseResponseDto<List<FavoriteDto>>.SuccessResult("Favorites retrieved successfully", favorites);
            }
            catch (Exception ex)
            {
                return BaseResponseDto<List<FavoriteDto>>.ErrorResult($"Error retrieving favorites: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<FavoriteDto>> AddToFavoritesAsync(int userId, CreateFavoriteDto createFavoriteDto)
        {
            try
            {
                // Check if product exists
                var product = await _context.Products
                    .Where(p => p.Id == createFavoriteDto.ProductId && p.IsActive)
                    .FirstOrDefaultAsync();

                if (product == null)
                {
                    return BaseResponseDto<FavoriteDto>.ErrorResult("Product not found");
                }

                // Check if already in favorites
                var existingFavorite = await _context.Favorites
                    .Where(f => f.UserId == userId && f.ProductId == createFavoriteDto.ProductId && f.IsActive)
                    .FirstOrDefaultAsync();

                if (existingFavorite != null)
                {
                    return BaseResponseDto<FavoriteDto>.ErrorResult("Product is already in favorites");
                }

                var favorite = new Favorite
                {
                    UserId = userId,
                    ProductId = createFavoriteDto.ProductId,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Favorites.Add(favorite);
                await _context.SaveChangesAsync();

                var favoriteDto = new FavoriteDto
                {
                    Id = favorite.Id,
                    UserId = favorite.UserId,
                    ProductId = favorite.ProductId,
                    ProductName = product.ProductName,
                    ProductPrice = product.UnitPrice,
                    ProductImageUrl = product.ImageUrl,
                    ProductDescription = product.Description,
                    CreatedAt = favorite.CreatedAt
                };

                return BaseResponseDto<FavoriteDto>.SuccessResult("Product added to favorites successfully", favoriteDto);
            }
            catch (Exception ex)
            {
                return BaseResponseDto<FavoriteDto>.ErrorResult($"Error adding to favorites: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<string>> RemoveFromFavoritesAsync(int userId, int productId)
        {
            try
            {
                var favorite = await _context.Favorites
                    .Where(f => f.UserId == userId && f.ProductId == productId && f.IsActive)
                    .FirstOrDefaultAsync();

                if (favorite == null)
                {
                    return BaseResponseDto<string>.ErrorResult("Product not found in favorites");
                }

                favorite.IsActive = false;
                favorite.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return BaseResponseDto<string>.SuccessResult("Product removed from favorites successfully", "Product removed from favorites successfully");
            }
            catch (Exception ex)
            {
                return BaseResponseDto<string>.ErrorResult($"Error removing from favorites: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto> IsFavoriteAsync(int userId, int productId)
        {
            try
            {
                var isFavorite = await _context.Favorites
                    .AnyAsync(f => f.UserId == userId && f.ProductId == productId && f.IsActive);

                return BaseResponseDto.SuccessResult("Favorite status retrieved successfully", isFavorite);
            }
            catch (Exception ex)
            {
                return BaseResponseDto.ErrorResult($"Error checking favorite status: {ex.Message}");
            }
        }
    }
}
