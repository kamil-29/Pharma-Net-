import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  let data = null;
  let error = null;
  const apiCall = async (url, method, requestData = null) => {
    setLoading(true);

    try {
      const response = await api({ url, method, data: requestData });
      data = response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      error = error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, apiCall };
};

export default useApi;
