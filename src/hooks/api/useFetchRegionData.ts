import { useCallback } from "react";

import axios from "axios";

interface IUseFetchApartmentDataReturn {
  // data: any;
  fetchRegionData: () => Promise<void>;
}

export const useFetchRegionData = (): IUseFetchApartmentDataReturn => {
  const fetchRegionData = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get("/api/fetchRegion");
      const data = response.data;
      return data;
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, []);
  return { fetchRegionData };
};
