package com.ecommerce.backend.application.dto;

import java.math.BigDecimal;

public class OrderItemDto {
    private Long id;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal discount;
    private BigDecimal totalPrice;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private Long orderId;

    // Constructors
    public OrderItemDto() {}

    public OrderItemDto(Long id, Integer quantity, BigDecimal unitPrice, BigDecimal discount, 
                       BigDecimal totalPrice, Long productId, String productName, 
                       String productImageUrl, Long orderId) {
        this.id = id;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.discount = discount;
        this.totalPrice = totalPrice;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.orderId = orderId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
}
