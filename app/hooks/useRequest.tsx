import { useEffect, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseRequestResponse {
  data: any;
  loading: Boolean;
  error: any;
  callCount: number;
  refetch: () => void;
}

function useRequest(url: string, method: Method = "GET"): UseRequestResponse {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(undefined);
  const [callCount, setCallCount] = useState<number>(1);
  const refetch = () => setCallCount((prev) => prev + 1);

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    fetch(url, {
      method,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Erro ao buscar dados:", error);
      });
  }, [callCount]);

  return { data, loading, error, callCount, refetch };
}

export default useRequest;
