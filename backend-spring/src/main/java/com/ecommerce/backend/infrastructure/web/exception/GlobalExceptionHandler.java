package com.ecommerce.backend.infrastructure.web.exception;

import com.ecommerce.backend.application.dto.BaseResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponseDto<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        BaseResponseDto<Map<String, String>> response = BaseResponseDto.error("Validation failed");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BaseResponseDto<String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        BaseResponseDto<String> response = BaseResponseDto.error("Invalid argument: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BaseResponseDto<String>> handleRuntimeException(RuntimeException ex) {
        BaseResponseDto<String> response = BaseResponseDto.error("Runtime error: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponseDto<String>> handleGenericException(Exception ex) {
        BaseResponseDto<String> response = BaseResponseDto.error("An unexpected error occurred: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
