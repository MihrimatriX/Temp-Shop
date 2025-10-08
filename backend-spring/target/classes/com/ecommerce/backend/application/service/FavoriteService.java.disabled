package com.ecommerce.backend.application.service;

import com.ecommerce.backend.application.dto.*;
import com.ecommerce.backend.domain.entity.*;
import com.ecommerce.backend.infrastructure.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private ProductRepository productRepository;

    public BaseResponseDto<List<FavoriteDto>> getUserFavorites(Long userId) {
        try {
            List<Favorite> favorites = favoriteRepository.findByUserIdAndIsActiveTrueOrderByCreatedAtDesc(userId);
            List<FavoriteDto> favoriteDtos = favorites.stream()
                    .map(this::convertToFavoriteDto)
                    .collect(Collectors.toList());

            return BaseResponseDto.success(favoriteDtos, "Favorites retrieved successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error retrieving favorites: " + ex.getMessage());
        }
    }

    public BaseResponseDto<FavoriteDto> addToFavorites(Long userId, CreateFavoriteDto createFavoriteDto) {
        try {
            // Check if product exists
            Product product = productRepository.findById(createFavoriteDto.getProductId()).orElse(null);
            if (product == null || !product.getIsActive()) {
                return BaseResponseDto.error("Product not found");
            }

            // Check if already in favorites
            Favorite existingFavorite = favoriteRepository.findByUserIdAndProductIdAndIsActiveTrue(userId, createFavoriteDto.getProductId()).orElse(null);
            if (existingFavorite != null) {
                return BaseResponseDto.error("Product is already in favorites");
            }

            Favorite favorite = new Favorite();
            favorite.setUserId(userId);
            favorite.setProductId(createFavoriteDto.getProductId());
            favorite.setIsActive(true);
            favorite.setCreatedAt(LocalDateTime.now());
            favorite.setUpdatedAt(LocalDateTime.now());

            Favorite savedFavorite = favoriteRepository.save(favorite);
            FavoriteDto favoriteDto = convertToFavoriteDto(savedFavorite);

            return BaseResponseDto.success(favoriteDto, "Product added to favorites successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error adding to favorites: " + ex.getMessage());
        }
    }

    public BaseResponseDto<String> removeFromFavorites(Long userId, Long productId) {
        try {
            Favorite favorite = favoriteRepository.findByUserIdAndProductIdAndIsActiveTrue(userId, productId).orElse(null);
            if (favorite == null) {
                return BaseResponseDto.error("Product not found in favorites");
            }

            favorite.setIsActive(false);
            favorite.setUpdatedAt(LocalDateTime.now());
            favoriteRepository.save(favorite);

            return BaseResponseDto.success("Product removed from favorites successfully", "Product removed from favorites successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error removing from favorites: " + ex.getMessage());
        }
    }

    public BaseResponseDto<Boolean> isFavorite(Long userId, Long productId) {
        try {
            boolean isFavorite = favoriteRepository.existsByUserIdAndProductIdAndIsActiveTrue(userId, productId);
            return BaseResponseDto.success(isFavorite, "Favorite status retrieved successfully");
        } catch (Exception ex) {
            return BaseResponseDto.error("Error checking favorite status: " + ex.getMessage());
        }
    }

    private FavoriteDto convertToFavoriteDto(Favorite favorite) {
        Product product = productRepository.findById(favorite.getProductId()).orElse(null);
        String productName = product != null ? product.getProductName() : "Unknown Product";
        String productImageUrl = product != null ? product.getImageUrl() : null;
        String productDescription = product != null ? product.getDescription() : null;

        return new FavoriteDto(
                favorite.getId(),
                favorite.getUserId(),
                favorite.getProductId(),
                productName,
                product != null ? product.getUnitPrice() : null,
                productImageUrl,
                productDescription,
                favorite.getCreatedAt()
        );
    }
}
