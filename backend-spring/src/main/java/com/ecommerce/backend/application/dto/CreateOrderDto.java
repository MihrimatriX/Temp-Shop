package com.ecommerce.backend.application.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CreateOrderDto {
    @NotEmpty(message = "Order items are required")
    @Valid
    private List<CreateOrderItemDto> orderItems;

    @NotNull(message = "Shipping address is required")
    @Size(max = 500, message = "Shipping address cannot exceed 500 characters")
    private String shippingAddress;

    @Size(max = 500, message = "Billing address cannot exceed 500 characters")
    private String billingAddress;

    // Constructors
    public CreateOrderDto() {}

    public CreateOrderDto(List<CreateOrderItemDto> orderItems, String shippingAddress, String billingAddress) {
        this.orderItems = orderItems;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
    }

    // Getters and Setters
    public List<CreateOrderItemDto> getOrderItems() { return orderItems; }
    public void setOrderItems(List<CreateOrderItemDto> orderItems) { this.orderItems = orderItems; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getBillingAddress() { return billingAddress; }
    public void setBillingAddress(String billingAddress) { this.billingAddress = billingAddress; }
}
