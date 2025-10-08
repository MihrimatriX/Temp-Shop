using EcommerceBackend.Application.DTOs;
using EcommerceBackend.Domain.Entities;
using EcommerceBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BaseResponseDto<List<OrderDto>>> GetUserOrdersAsync(int userId)
        {
            try
            {
                var orders = await _context.Orders
                    .Where(o => o.UserId == userId && o.IsActive)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                    .OrderByDescending(o => o.CreatedAt)
                    .Select(o => new OrderDto
                    {
                        Id = o.Id,
                        OrderNumber = o.OrderNumber,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        ShippingAddress = o.ShippingAddress,
                        BillingAddress = o.BillingAddress,
                        CreatedAt = o.CreatedAt,
                        UpdatedAt = o.UpdatedAt,
                        UserId = o.UserId,
                        UserName = o.User.FirstName + " " + o.User.LastName,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                        {
                            Id = oi.Id,
                            Quantity = oi.Quantity,
                            UnitPrice = oi.UnitPrice,
                            Discount = oi.Discount,
                            TotalPrice = oi.Quantity * oi.UnitPrice * (1 - oi.Discount / 100),
                            ProductId = oi.ProductId,
                            ProductName = oi.Product.ProductName,
                            ProductImageUrl = oi.Product.ImageUrl,
                            OrderId = oi.OrderId
                        }).ToList()
                    })
                    .ToListAsync();

                return BaseResponseDto<List<OrderDto>>.SuccessResult("Orders retrieved successfully", orders);
            }
            catch (Exception ex)
            {
                return BaseResponseDto<List<OrderDto>>.ErrorResult($"Error retrieving orders: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<OrderDto>> GetOrderByIdAsync(int orderId, int userId)
        {
            try
            {
                var order = await _context.Orders
                    .Where(o => o.Id == orderId && o.UserId == userId && o.IsActive)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                    .Select(o => new OrderDto
                    {
                        Id = o.Id,
                        OrderNumber = o.OrderNumber,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        ShippingAddress = o.ShippingAddress,
                        BillingAddress = o.BillingAddress,
                        CreatedAt = o.CreatedAt,
                        UpdatedAt = o.UpdatedAt,
                        UserId = o.UserId,
                        UserName = o.User.FirstName + " " + o.User.LastName,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                        {
                            Id = oi.Id,
                            Quantity = oi.Quantity,
                            UnitPrice = oi.UnitPrice,
                            Discount = oi.Discount,
                            TotalPrice = oi.Quantity * oi.UnitPrice * (1 - oi.Discount / 100),
                            ProductId = oi.ProductId,
                            ProductName = oi.Product.ProductName,
                            ProductImageUrl = oi.Product.ImageUrl,
                            OrderId = oi.OrderId
                        }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (order == null)
                {
                    return BaseResponseDto<OrderDto>.ErrorResult("Order not found");
                }

                return BaseResponseDto<OrderDto>.SuccessResult("Order retrieved successfully", order);
            }
            catch (Exception ex)
            {
                return BaseResponseDto<OrderDto>.ErrorResult($"Error retrieving order: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<OrderDto>> CreateOrderAsync(int userId, CreateOrderDto createOrderDto)
        {
            try
            {
                // Validate products exist and are in stock
                var productIds = createOrderDto.OrderItems.Select(oi => oi.ProductId).ToList();
                var products = await _context.Products
                    .Where(p => productIds.Contains(p.Id) && p.IsActive)
                    .ToListAsync();

                if (products.Count != productIds.Count)
                {
                    return BaseResponseDto<OrderDto>.ErrorResult("One or more products not found");
                }

                // Check stock availability
                foreach (var orderItem in createOrderDto.OrderItems)
                {
                    var product = products.First(p => p.Id == orderItem.ProductId);
                    if (product.UnitInStock < orderItem.Quantity)
                    {
                        return BaseResponseDto<OrderDto>.ErrorResult($"Insufficient stock for product: {product.ProductName}");
                    }
                }

                // Generate order number
                var orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..8].ToUpper()}";

                // Calculate total amount
                decimal totalAmount = 0;
                var orderItems = new List<OrderItem>();

                foreach (var orderItemDto in createOrderDto.OrderItems)
                {
                    var product = products.First(p => p.Id == orderItemDto.ProductId);
                    var discountedPrice = product.UnitPrice * (1 - product.Discount / 100);
                    var itemTotal = orderItemDto.Quantity * discountedPrice;
                    totalAmount += itemTotal;

                    orderItems.Add(new OrderItem
                    {
                        ProductId = orderItemDto.ProductId,
                        Quantity = orderItemDto.Quantity,
                        UnitPrice = product.UnitPrice,
                        Discount = product.Discount,
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    });

                    // Update product stock
                    product.UnitInStock -= orderItemDto.Quantity;
                    product.UpdatedAt = DateTime.UtcNow;
                }

                // Create order
                var order = new Order
                {
                    OrderNumber = orderNumber,
                    TotalAmount = totalAmount,
                    Status = "Pending",
                    ShippingAddress = createOrderDto.ShippingAddress,
                    BillingAddress = createOrderDto.BillingAddress ?? createOrderDto.ShippingAddress,
                    UserId = userId,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    OrderItems = orderItems
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // Return created order
                var createdOrder = await GetOrderByIdAsync(order.Id, userId);
                return createdOrder;
            }
            catch (Exception ex)
            {
                return BaseResponseDto<OrderDto>.ErrorResult($"Error creating order: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<OrderDto>> UpdateOrderStatusAsync(int orderId, int userId, UpdateOrderStatusDto updateOrderStatusDto)
        {
            try
            {
                var order = await _context.Orders
                    .Where(o => o.Id == orderId && o.UserId == userId && o.IsActive)
                    .FirstOrDefaultAsync();

                if (order == null)
                {
                    return BaseResponseDto<OrderDto>.ErrorResult("Order not found");
                }

                order.Status = updateOrderStatusDto.Status;
                order.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return await GetOrderByIdAsync(orderId, userId);
            }
            catch (Exception ex)
            {
                return BaseResponseDto<OrderDto>.ErrorResult($"Error updating order status: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<string>> CancelOrderAsync(int orderId, int userId)
        {
            try
            {
                var order = await _context.Orders
                    .Where(o => o.Id == orderId && o.UserId == userId && o.IsActive)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                    .FirstOrDefaultAsync();

                if (order == null)
                {
                    return BaseResponseDto<string>.ErrorResult("Order not found");
                }

                if (order.Status == "Shipped" || order.Status == "Delivered")
                {
                    return BaseResponseDto<string>.ErrorResult("Cannot cancel shipped or delivered orders");
                }

                // Restore product stock
                foreach (var orderItem in order.OrderItems)
                {
                    var product = await _context.Products.FindAsync(orderItem.ProductId);
                    if (product != null)
                    {
                        product.UnitInStock += orderItem.Quantity;
                        product.UpdatedAt = DateTime.UtcNow;
                    }
                }

                order.Status = "Cancelled";
                order.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return BaseResponseDto<string>.SuccessResult("Order cancelled successfully", "Order cancelled successfully");
            }
            catch (Exception ex)
            {
                return BaseResponseDto<string>.ErrorResult($"Error cancelling order: {ex.Message}");
            }
        }

        public async Task<BaseResponseDto<List<OrderDto>>> GetAllOrdersAsync(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var orders = await _context.Orders
                    .Where(o => o.IsActive)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                    .Include(o => o.User)
                    .OrderByDescending(o => o.CreatedAt)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(o => new OrderDto
                    {
                        Id = o.Id,
                        OrderNumber = o.OrderNumber,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        ShippingAddress = o.ShippingAddress,
                        BillingAddress = o.BillingAddress,
                        CreatedAt = o.CreatedAt,
                        UpdatedAt = o.UpdatedAt,
                        UserId = o.UserId,
                        UserName = o.User.FirstName + " " + o.User.LastName,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                        {
                            Id = oi.Id,
                            Quantity = oi.Quantity,
                            UnitPrice = oi.UnitPrice,
                            Discount = oi.Discount,
                            TotalPrice = oi.Quantity * oi.UnitPrice * (1 - oi.Discount / 100),
                            ProductId = oi.ProductId,
                            ProductName = oi.Product.ProductName,
                            ProductImageUrl = oi.Product.ImageUrl,
                            OrderId = oi.OrderId
                        }).ToList()
                    })
                    .ToListAsync();

                return BaseResponseDto<List<OrderDto>>.SuccessResult("Orders retrieved successfully", orders);
            }
            catch (Exception ex)
            {
                return BaseResponseDto<List<OrderDto>>.ErrorResult($"Error retrieving orders: {ex.Message}");
            }
        }
    }
}
