import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Here you could send the error to your error reporting service
    // Example: Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-error-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <div className="space-x-4">
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Go to Homepage
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-8 p-4 bg-gray-100 rounded-lg text-left overflow-auto text-sm text-gray-700">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;