/* eslint-disable object-curly-newline */
import { useState } from 'react';

export function useApi<T>({
  apiFunc,
  initialLoading = false,
}: {
  initialLoading?: boolean;
  apiFunc: any;
}) {
  const [data, setData] = useState<T>();
  // make the error an actual code, or null if not 200
  const [error, setError] = useState<null | number>(null);
  const [loading, setLoading] = useState(initialLoading);

  const request = async (...args: any) => {
    setLoading(true);
    try {
      const response = await apiFunc(...args);
      setLoading(false);
      if (response.status !== 200) {
        setError(response.status ?? response.problem);
        return;
      }
      setError(null);
      setData(response.data);
    } catch (e) {
      setLoading(false);
      // no code, but not null. Something local probably happened
      setError(1);
    }
  };

  const clear = () => {
    setError(null);
    setData(undefined);
    setLoading(false);
  };

  return { data, error, loading, request, setError, clear };
}
