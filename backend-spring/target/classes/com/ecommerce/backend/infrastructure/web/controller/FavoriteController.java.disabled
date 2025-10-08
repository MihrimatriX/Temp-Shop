package com.ecommerce.backend.infrastructure.web.controller;

import com.ecommerce.backend.application.dto.*;
import com.ecommerce.backend.application.service.FavoriteService;
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
@RequestMapping("/api/favorite")
@Tag(name = "Favorite Management", description = "APIs for managing user favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user favorites", description = "Retrieve all favorites for a specific user")
    public ResponseEntity<BaseResponseDto<List<FavoriteDto>>> getUserFavorites(@PathVariable Long userId) {
        try {
            Long currentUserId = getCurrentUserId();
            if (!currentUserId.equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(BaseResponseDto.error("You can only access your own favorites"));
            }

            BaseResponseDto<List<FavoriteDto>> result = favoriteService.getUserFavorites(userId);
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error retrieving user favorites: " + ex.getMessage()));
        }
    }

    @PostMapping
    @Operation(summary = "Add to favorites", description = "Add a product to user's favorites")
    public ResponseEntity<BaseResponseDto<FavoriteDto>> addToFavorites(@Valid @RequestBody CreateFavoriteDto createFavoriteDto) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<FavoriteDto> result = favoriteService.addToFavorites(currentUserId, createFavoriteDto);
            
            if (result.isSuccess()) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error adding to favorites: " + ex.getMessage()));
        }
    }

    @DeleteMapping("/product/{productId}")
    @Operation(summary = "Remove from favorites", description = "Remove a product from user's favorites")
    public ResponseEntity<BaseResponseDto<String>> removeFromFavorites(@PathVariable Long productId) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<String> result = favoriteService.removeFromFavorites(currentUserId, productId);
            
            if (result.isSuccess()) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error removing from favorites: " + ex.getMessage()));
        }
    }

    @GetMapping("/check/{productId}")
    @Operation(summary = "Check if favorite", description = "Check if a product is in user's favorites")
    public ResponseEntity<BaseResponseDto<Boolean>> isFavorite(@PathVariable Long productId) {
        try {
            Long currentUserId = getCurrentUserId();
            BaseResponseDto<Boolean> result = favoriteService.isFavorite(currentUserId, productId);
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseDto.error("Error checking favorite status: " + ex.getMessage()));
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
