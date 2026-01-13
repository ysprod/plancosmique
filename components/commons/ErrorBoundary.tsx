'use client';
import React, { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LoadingFallback } from './LoadingFallback';
import { containerVariants, pulseVariants } from './errorBoundaryVariants'; 

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
} 

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-purple-50 to-pink-50 
                        dark:from-purple-950 dark:to-pink-950 p-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 
                       rounded-2xl p-8 max-w-md w-full shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Une erreur est survenue
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Nous nous excusons pour ce désagrément. Une erreur inattendue s'est produite.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                           rounded-lg p-4 mb-4 max-h-48 overflow-y-auto"
              >
                <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <pre className="text-xs mt-2 text-red-700 dark:text-red-400 whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                )}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={this.handleReset}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700 
                         text-white font-semibold py-3 px-6 rounded-lg 
                         transition-all duration-200 shadow-lg 
                         hover:shadow-xl focus:outline-none focus:ring-2 
                         focus:ring-purple-500 focus:ring-offset-2"
            >
              Réessayer
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { LoadingFallback };