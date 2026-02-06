import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neo-bg p-4">
          <Card className="max-w-md w-full bg-neo-secondary">
            <h1 className="text-3xl font-black uppercase mb-4 text-black">
              System Error
            </h1>
            <p className="font-bold mb-4 border-l-4 border-black pl-4">
              We're sorry, but the application encountered an unexpected error.
            </p>
            {this.state.error && (
              <pre className="bg-black text-white p-4 text-xs overflow-auto mb-6 border-2 border-white font-mono">
                {this.state.error.toString()}
              </pre>
            )}
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              className="w-full"
            >
              Reload Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
