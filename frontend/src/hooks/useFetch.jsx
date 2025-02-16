import { useCallback, useState } from "react";
import api from "../services/clientAPI";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const get = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const response = await api.get(endpoint);
      console.log("response data", response?.data);

      setData(response?.data);

      return response?.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error, get };
};

export default useFetch;
