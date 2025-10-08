using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EcommerceBackend.Application.DTOs;
using EcommerceBackend.Application.Services;
using System.Security.Claims;

namespace EcommerceBackend.Infrastructure.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<BaseResponseDto<List<FavoriteDto>>>> GetUserFavorites(int userId)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                if (currentUserId != userId)
                {
                    return Forbid("You can only access your own favorites");
                }

                var result = await _favoriteService.GetUserFavoritesAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<List<FavoriteDto>>.ErrorResult($"Error retrieving user favorites: {ex.Message}"));
            }
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponseDto<FavoriteDto>>> AddToFavorites([FromBody] CreateFavoriteDto createFavoriteDto)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _favoriteService.AddToFavoritesAsync(currentUserId, createFavoriteDto);
                
                if (result.Success)
                {
                    return CreatedAtAction(nameof(GetUserFavorites), new { userId = currentUserId }, result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<FavoriteDto>.ErrorResult($"Error adding to favorites: {ex.Message}"));
            }
        }

        [HttpDelete("product/{productId}")]
        public async Task<ActionResult<BaseResponseDto<string>>> RemoveFromFavorites(int productId)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _favoriteService.RemoveFromFavoritesAsync(currentUserId, productId);
                
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<string>.ErrorResult($"Error removing from favorites: {ex.Message}"));
            }
        }

        [HttpGet("check/{productId}")]
        public async Task<ActionResult<BaseResponseDto>> IsFavorite(int productId)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _favoriteService.IsFavoriteAsync(currentUserId, productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto.ErrorResult($"Error checking favorite status: {ex.Message}"));
            }
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdClaim, out int userId))
            {
                return userId;
            }
            throw new UnauthorizedAccessException("Invalid user ID");
        }
    }
}
