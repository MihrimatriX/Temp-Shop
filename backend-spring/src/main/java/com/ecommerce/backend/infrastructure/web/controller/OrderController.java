package com.ecommerce.backend.infrastructure.web.controller;

import com.ecommerce.backend.application.dto.*;
import com.ecommerce.backend.application.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@Tag(name = "Order Management", description = "APIs for managing orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user orders", description = "Retrieve all orders for a specific user")
    public ResponseEntity<BaseResponseDto<List<OrderDto>>> getUserOrders(@PathVariable Long userId) {
        try {
            Long currentUserId = getCurrentUserId();
            if (!currentUserId.equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(BaseResponseDto.error("You can only access your own orders"));
            }

            BaseResponseDto<List<OrderDto>> result = orderService.getUserOrders(userId);
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error retrieving user orders: " + ex.getMessage()));
        }
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get order by ID", description = "Retrieve a specific order by ID")
    public ResponseEntity<BaseResponseDto<OrderDto>> getOrder(@PathVariable Long orderId) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<OrderDto> result = orderService.getOrderById(orderId, currentUserId);
            
            if (result.isSuccess() && result.getData() != null) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error retrieving order: " + ex.getMessage()));
        }
    }

    @PostMapping
    @Operation(summary = "Create order", description = "Create a new order")
    public ResponseEntity<BaseResponseDto<OrderDto>> createOrder(@Valid @RequestBody CreateOrderDto createOrderDto) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<OrderDto> result = orderService.createOrder(currentUserId, createOrderDto);
            
            if (result.isSuccess()) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error creating order: " + ex.getMessage()));
        }
    }

    @PutMapping("/{orderId}/status")
    @Operation(summary = "Update order status", description = "Update the status of an order")
    public ResponseEntity<BaseResponseDto<OrderDto>> updateOrderStatus(
            @PathVariable Long orderId, 
            @Valid @RequestBody UpdateOrderStatusDto updateOrderStatusDto) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<OrderDto> result = orderService.updateOrderStatus(orderId, currentUserId, updateOrderStatusDto);
            
            if (result.isSuccess()) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error updating order status: " + ex.getMessage()));
        }
    }

    @DeleteMapping("/{orderId}")
    @Operation(summary = "Cancel order", description = "Cancel an order")
    public ResponseEntity<BaseResponseDto<String>> cancelOrder(@PathVariable Long orderId) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<String> result = orderService.cancelOrder(orderId, currentUserId);
            
            if (result.isSuccess()) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error cancelling order: " + ex.getMessage()));
        }
    }

    @GetMapping("/all")
    @Operation(summary = "Get all orders", description = "Retrieve all orders (Admin only)")
    public ResponseEntity<BaseResponseDto<List<OrderDto>>> getAllOrders(
            @RequestParam(defaultValue = "1") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        try {
            // TODO: Add admin role check
            BaseResponseDto<List<OrderDto>> result = orderService.getAllOrders(pageNumber, pageSize);
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error retrieving all orders: " + ex.getMessage()));
        }
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
            String userId = authentication.getName();
            return Long.parseLong(userId);
        }
        throw new RuntimeException("Invalid user ID");
    }
}
