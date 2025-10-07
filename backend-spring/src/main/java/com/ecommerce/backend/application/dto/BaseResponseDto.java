package com.ecommerce.backend.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponseDto<T> {
    private boolean success;
    private String message;
    private T data;
    private String error;
    
    // Constructors
    public BaseResponseDto() {}
    
    public BaseResponseDto(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    
    public BaseResponseDto(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public BaseResponseDto(boolean success, String message, String error) {
        this.success = success;
        this.message = message;
        this.error = error;
    }
    
    // Static factory methods
    public static <T> BaseResponseDto<T> success(T data) {
        return new BaseResponseDto<>(true, "Operation successful", data);
    }
    
    public static <T> BaseResponseDto<T> success(String message, T data) {
        return new BaseResponseDto<>(true, message, data);
    }
    
    public static <T> BaseResponseDto<T> success(String message) {
        return new BaseResponseDto<>(true, message);
    }
    
    public static <T> BaseResponseDto<T> error(String message) {
        return new BaseResponseDto<>(false, message);
    }
    
    public static <T> BaseResponseDto<T> error(String message, String error) {
        return new BaseResponseDto<>(false, message, error);
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public String getError() {
        return error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
