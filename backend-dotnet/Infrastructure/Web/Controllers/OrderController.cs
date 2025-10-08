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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<BaseResponseDto<List<OrderDto>>>> GetUserOrders(int userId)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                if (currentUserId != userId)
                {
                    return Forbid("You can only access your own orders");
                }

                var result = await _orderService.GetUserOrdersAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<List<OrderDto>>.ErrorResult($"Error retrieving user orders: {ex.Message}"));
            }
        }

        [HttpGet("{orderId}")]
        public async Task<ActionResult<BaseResponseDto<OrderDto>>> GetOrder(int orderId)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _orderService.GetOrderByIdAsync(orderId, currentUserId);
                
                if (result.Success && result.Data != null)
                {
                    return Ok(result);
                }
                return NotFound(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<OrderDto>.ErrorResult($"Error retrieving order: {ex.Message}"));
            }
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponseDto<OrderDto>>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _orderService.CreateOrderAsync(currentUserId, createOrderDto);
                
                if (result.Success)
                {
                    return CreatedAtAction(nameof(GetOrder), new { orderId = result.Data?.Id }, result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<OrderDto>.ErrorResult($"Error creating order: {ex.Message}"));
            }
        }

        [HttpPut("{orderId}/status")]
        public async Task<ActionResult<BaseResponseDto<OrderDto>>> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusDto updateOrderStatusDto)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _orderService.UpdateOrderStatusAsync(orderId, currentUserId, updateOrderStatusDto);
                
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<OrderDto>.ErrorResult($"Error updating order status: {ex.Message}"));
            }
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult<BaseResponseDto<string>>> CancelOrder(int orderId)
        {
            try
            {
                var currentUserId = GetCurrentUserId();
                var result = await _orderService.CancelOrderAsync(orderId, currentUserId);
                
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<string>.ErrorResult($"Error cancelling order: {ex.Message}"));
            }
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDto<List<OrderDto>>>> GetAllOrders([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var result = await _orderService.GetAllOrdersAsync(pageNumber, pageSize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, BaseResponseDto<List<OrderDto>>.ErrorResult($"Error retrieving all orders: {ex.Message}"));
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
