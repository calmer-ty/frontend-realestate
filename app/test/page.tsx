"use client";

import axios from "axios";
import { useEffect } from "react";

export default function TestPage(): JSX.Element {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const response = await axios.get<any>("/api/fetchApartment");
        await axios.get<any>("/api/fetchApartment");
        // console.log("Fetched region data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    void fetchData();
  }, []);

  return <div>Check the console for region data.</div>;
}
