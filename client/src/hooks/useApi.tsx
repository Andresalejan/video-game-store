/**
 * Custom hook for data fetching with loading and error states.
 * 
 * Provides a simple way to fetch data from the API with proper
 * loading, error, and success states.
 */

import { useState, useEffect, useCallback } from "react";
import { ApiError } from "../api/catalog";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for fetching data from the API
 * 
 * @param fetchFn - Async function that returns the data
 * @param deps - Dependencies array (will trigger refetch when changed)
 */
export function useApi<T>(
  fetchFn: () => Promise<T>,
  deps: React.DependencyList = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Loading spinner component
 */
export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
      <p className="mt-4 text-sm text-slate-400">{message}</p>
    </div>
  );
}

/**
 * Error message component
 */
export function ErrorMessage({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-6 text-center">
      <p className="text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
