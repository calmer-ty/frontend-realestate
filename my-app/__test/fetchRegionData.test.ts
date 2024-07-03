import axios from "axios";
import NodeCache from "node-cache";
import {
  fetchRegionData,
  fetchAllRegionData,
} from "@/commons/lib/fetchRegionData";
import type { IReginCdData } from "@/commons/types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const cache = new NodeCache({ stdTTL: 7200 });

// Mocked cities data for testing
const cities = [
  "서울특별시",
  "경기도",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경상북도",
  "경상남도",
  "전라북도",
  "전라남도",
  "충청북도",
  "충청남도",
];

describe("fetchRegionData", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
    cache.flushAll();
  });

  it("fetches region data for a city and caches it", async () => {
    const mockCity = "서울특별시";
    const mockResponseData = {
      /* Mocked response data */
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await fetchRegionData(mockCity);

    expect(result).toEqual(mockResponseData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(`locatadd_nm=${encodeURIComponent(mockCity)}`)
    );
  });

  it("throws error when fetching region data fails", async () => {
    const mockCity = "서울특별시";

    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    await expect(fetchRegionData(mockCity)).rejects.toThrowError(
      `Failed to fetch region data for ${mockCity}`
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(`locatadd_nm=${encodeURIComponent(mockCity)}`)
    );
  });

  // Additional tests for cache behavior can be added here
});

describe("fetchAllRegionData", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
    cache.flushAll();
  });

  it("fetches data for all cities", async () => {
    const mockResponseData: IReginCdData = {
      /* Mocked response data */
    };

    // Mocking axios.get to resolve with mockResponseData for each city
    cities.forEach((city) => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData });
    });

    const result = await fetchAllRegionData();

    expect(result).toHaveLength(cities.length);
    result.forEach((regionData, index) => {
      expect(regionData).toEqual(mockResponseData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(cities[index])
      );
    });
    expect(mockedAxios.get).toHaveBeenCalledTimes(cities.length);
  });

  it("throws error when fetching any region data fails", async () => {
    const errorMessage = "Failed to fetch data";

    // Mocking axios.get to reject with an error for the first city
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchAllRegionData()).rejects.toThrowError(
      "Failed to fetch region data"
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Assuming all requests are made concurrently
  });
});
