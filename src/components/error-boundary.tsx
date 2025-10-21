"use client";

import React, { Component, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Bir Hata Oluştu</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.
              </p>
              
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-sm font-medium">
                    Hata Detayları
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {"\n\n"}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}

              <div className="flex gap-2">
                <Button onClick={this.handleRetry} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tekrar Dene
                </Button>
                <Button variant="outline" onClick={this.handleGoHome} className="flex-1">
                  <Home className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // In a real app, you might want to send this to an error reporting service
    // like Sentry, LogRocket, etc.
    
    // For now, just show a toast notification
    if (typeof window !== 'undefined') {
      // You can integrate with your toast system here
      alert(`Hata: ${error.message}`);
    }
  };

  return { handleError };
};

// Higher-order component for error handling
export const withErrorHandling = <P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: React.ComponentType<{ error: Error; retry: () => void }>
) => {
  return class WithErrorHandling extends React.Component<P, { hasError: boolean; error?: Error }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
      console.error("Component error:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        if (errorFallback && this.state.error) {
          const ErrorFallback = errorFallback;
          return (
            <ErrorFallback 
              error={this.state.error} 
              retry={() => this.setState({ hasError: false, error: undefined })}
            />
          );
        }
        
        return (
          <div className="p-4 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-red-600">Bir hata oluştu</p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="mt-2"
            >
              Tekrar Dene
            </Button>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};
