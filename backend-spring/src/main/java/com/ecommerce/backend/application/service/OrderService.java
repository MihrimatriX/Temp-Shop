package com.ecommerce.backend.application.service;

import com.ecommerce.backend.application.dto.*;
import com.ecommerce.backend.domain.entity.*;
import com.ecommerce.backend.infrastructure.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public BaseResponseDto<List<OrderDto>> getUserOrders(Long userId) {
        try {
            List<Order> orders = orderRepository.findByUserIdAndIsActiveTrueOrderByCreatedAtDesc(userId);
            List<OrderDto> orderDtos = orders.stream()
                    .map(this::convertToOrderDto)
                    .collect(Collectors.toList());

            return BaseResponseDto.success(orderDtos, "Orders retrieved successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error retrieving orders: " + ex.getMessage());
        }
    }

    public BaseResponseDto<OrderDto> getOrderById(Long orderId, Long userId) {
        try {
            Order order = orderRepository.findByIdAndUserIdAndIsActiveTrue(orderId, userId)
                    .orElse(null);

            if (order == null) {
                return BaseResponseDto.error("Order not found");
            }

            OrderDto orderDto = convertToOrderDto(order);
            return BaseResponseDto.success(orderDto, "Order retrieved successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error retrieving order: " + ex.getMessage());
        }
    }

    public BaseResponseDto<OrderDto> createOrder(Long userId, CreateOrderDto createOrderDto) {
        try {
            // Validate products exist and are in stock
            List<Long> productIds = createOrderDto.getOrderItems().stream()
                    .map(CreateOrderItemDto::getProductId)
                    .collect(Collectors.toList());

            List<Product> products = productRepository.findAllById(productIds);
            if (products.size() != productIds.size()) {
                return BaseResponseDto.error("One or more products not found");
            }

            // Check stock availability
            for (CreateOrderItemDto orderItemDto : createOrderDto.getOrderItems()) {
                Product product = products.stream()
                        .filter(p -> p.getId().equals(orderItemDto.getProductId()))
                        .findFirst()
                        .orElse(null);

                if (product == null || product.getUnitInStock() < orderItemDto.getQuantity()) {
                    return BaseResponseDto.error("Insufficient stock for product: " + 
                            (product != null ? product.getProductName() : "Unknown"));
                }
            }

            // Generate order number
            String orderNumber = "ORD-" + LocalDateTime.now().toString().substring(0, 10).replace("-", "") + 
                    "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

            // Calculate total amount
            BigDecimal totalAmount = BigDecimal.ZERO;
            Order order = new Order();
            order.setOrderNumber(orderNumber);
            order.setStatus("Pending");
            order.setShippingAddress(createOrderDto.getShippingAddress());
            order.setBillingAddress(createOrderDto.getBillingAddress() != null ? 
                    createOrderDto.getBillingAddress() : createOrderDto.getShippingAddress());
            order.setUserId(userId);
            order.setIsActive(true);
            order.setCreatedAt(LocalDateTime.now());
            order.setUpdatedAt(LocalDateTime.now());

            // Create order items and calculate total
            for (CreateOrderItemDto orderItemDto : createOrderDto.getOrderItems()) {
                Product product = products.stream()
                        .filter(p -> p.getId().equals(orderItemDto.getProductId()))
                        .findFirst()
                        .orElse(null);

                if (product != null) {
                    BigDecimal discountedPrice = product.getUnitPrice().multiply(
                            BigDecimal.ONE.subtract(product.getDiscount().divide(BigDecimal.valueOf(100))));
                    BigDecimal itemTotal = discountedPrice.multiply(BigDecimal.valueOf(orderItemDto.getQuantity()));
                    totalAmount = totalAmount.add(itemTotal);

                    OrderItem orderItem = new OrderItem();
                    orderItem.setProductId(product.getId());
                    orderItem.setQuantity(orderItemDto.getQuantity());
                    orderItem.setUnitPrice(product.getUnitPrice());
                    orderItem.setDiscount(product.getDiscount());
                    orderItem.setIsActive(true);
                    orderItem.setCreatedAt(LocalDateTime.now());
                    orderItem.setUpdatedAt(LocalDateTime.now());
                    orderItem.setOrder(order);

                    order.getOrderItems().add(orderItem);

                    // Update product stock
                    product.setUnitInStock(product.getUnitInStock() - orderItemDto.getQuantity());
                    product.setUpdatedAt(LocalDateTime.now());
                }
            }

            order.setTotalAmount(totalAmount);
            Order savedOrder = orderRepository.save(order);

            OrderDto orderDto = convertToOrderDto(savedOrder);
            return BaseResponseDto.success(orderDto, "Order created successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error creating order: " + ex.getMessage());
        }
    }

    public BaseResponseDto<OrderDto> updateOrderStatus(Long orderId, Long userId, UpdateOrderStatusDto updateOrderStatusDto) {
        try {
            Order order = orderRepository.findByIdAndUserIdAndIsActiveTrue(orderId, userId)
                    .orElse(null);

            if (order == null) {
                return BaseResponseDto.error("Order not found");
            }

            order.setStatus(updateOrderStatusDto.getStatus());
            order.setUpdatedAt(LocalDateTime.now());
            Order savedOrder = orderRepository.save(order);

            OrderDto orderDto = convertToOrderDto(savedOrder);
            return BaseResponseDto.success(orderDto, "Order status updated successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error updating order status: " + ex.getMessage());
        }
    }

    public BaseResponseDto<String> cancelOrder(Long orderId, Long userId) {
        try {
            Order order = orderRepository.findByIdAndUserIdAndIsActiveTrue(orderId, userId)
                    .orElse(null);

            if (order == null) {
                return BaseResponseDto.error("Order not found");
            }

            if ("Shipped".equals(order.getStatus()) || "Delivered".equals(order.getStatus())) {
                return BaseResponseDto.error("Cannot cancel shipped or delivered orders");
            }

            // Restore product stock
            for (OrderItem orderItem : order.getOrderItems()) {
                Product product = productRepository.findById(orderItem.getProductId()).orElse(null);
                if (product != null) {
                    product.setUnitInStock(product.getUnitInStock() + orderItem.getQuantity());
                    product.setUpdatedAt(LocalDateTime.now());
                }
            }

            order.setStatus("Cancelled");
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);

            return BaseResponseDto.success("Order cancelled successfully", "Order cancelled successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error cancelling order: " + ex.getMessage());
        }
    }

    public BaseResponseDto<List<OrderDto>> getAllOrders(int pageNumber, int pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
            Page<Order> orderPage = orderRepository.findByIsActiveTrueOrderByCreatedAtDesc(pageable);
            
            List<OrderDto> orderDtos = orderPage.getContent().stream()
                    .map(this::convertToOrderDto)
                    .collect(Collectors.toList());

            return BaseResponseDto.success(orderDtos, "Orders retrieved successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error retrieving orders: " + ex.getMessage());
        }
    }

    private OrderDto convertToOrderDto(Order order) {
        List<OrderItemDto> orderItemDtos = order.getOrderItems().stream()
                .map(this::convertToOrderItemDto)
                .collect(Collectors.toList());

        User user = userRepository.findById(order.getUserId()).orElse(null);
        String userName = user != null ? user.getFirstName() + " " + user.getLastName() : "Unknown User";

        return new OrderDto(
                order.getId(),
                order.getOrderNumber(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getShippingAddress(),
                order.getBillingAddress(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                order.getUserId(),
                userName,
                orderItemDtos
        );
    }

    private OrderItemDto convertToOrderItemDto(OrderItem orderItem) {
        Product product = productRepository.findById(orderItem.getProductId()).orElse(null);
        String productName = product != null ? product.getProductName() : "Unknown Product";
        String productImageUrl = product != null ? product.getImageUrl() : null;

        BigDecimal totalPrice = orderItem.getUnitPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()))
                .multiply(BigDecimal.ONE.subtract(orderItem.getDiscount().divide(BigDecimal.valueOf(100))));

        return new OrderItemDto(
                orderItem.getId(),
                orderItem.getQuantity(),
                orderItem.getUnitPrice(),
                orderItem.getDiscount(),
                totalPrice,
                orderItem.getProductId(),
                productName,
                productImageUrl,
                orderItem.getOrder().getId()
        );
    }
}
