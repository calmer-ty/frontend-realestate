import axios from "axios";
import NodeCache from "node-cache";
import { regionData } from "@/commons/libraries/regionData";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("regionData", () => {
  let cache: NodeCache;

  beforeAll(() => {
    cache = new NodeCache({ stdTTL: 7200 });
  });
  beforeEach(() => {
    mockedAxios.get.mockClear();
    cache.flushAll();
  });

  it("지역 데이터를 가져오고 유효한 결과를 반환합니다.", async () => {
    // 예를 들어 특정 도시에 대한 데이터를 가져오는 테스트를 수행합니다.
    const city = "서울특별시";
    const mockApiData = [
      {
        StanReginCd: [
          {
            head: [
              { totalCount: 493 },
              { numRows: "10" },
              { resultCode: "INFO-0" },
            ],
          },
          {
            row: [
              { region_cd: "1171000000", locatadd_nm: "서울특별시 송파구" },
              {
                region_cd: "1171010100",
                locatadd_nm: "서울특별시 송파구 잠실동",
              },
            ],
          },
        ],
      },
      // 필요한 만큼 객체를 추가할 수 있습니다.
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiData });

    const result = await regionData(city);
    console.log("모의 API 응답 데이터:", result); // 콘솔로 모의 API 응답 데이터 확인
    expect(result).toEqual(mockApiData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`locatadd_nm=${encodeURIComponent(city)}`)
    );
  });

  it("캐시에서 지역 데이터를 가져옵니다.", async () => {
    const city = "서울특별시";
    const mockCachedData = [
      {
        StanReginCd: [
          {
            head: [
              { totalCount: 493 },
              { numRows: "10" },
              { resultCode: "INFO-0" },
            ],
          },
          {
            row: [
              { region_cd: "1171000000", locatadd_nm: "서울특별시 송파구" },
              {
                region_cd: "1171010100",
                locatadd_nm: "서울특별시 송파구 잠실동",
              },
            ],
          },
        ],
      },
      // 필요한 만큼 객체를 추가할 수 있습니다.
    ];
    // 필요한 만큼 객체를 추가할 수 있습니다.

    cache.set(`region_${city}`, mockCachedData);

    const result = await regionData(city);
    console.log("캐시에서 가져온 데이터:", result); // 콘솔로 캐시에서 가져온 데이터 확인
    expect(result).toEqual(mockCachedData);
    expect(mockedAxios.get).not.toHaveBeenCalled(); // axios.get이 호출되지 않았음을 확인
  });

  // it("API에서 데이터를 가져오지 못할 경우 오류를 처리합니다.", async () => {
  //   const city = "서울특별시";
  //   const errorMessage = "Failed to fetch data";

  //   mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

  //   await expect(regionData(city)).rejects.toThrowError(
  //     `Failed to fetch region data for ${city}`
  //   );
  //   expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  //   expect(mockedAxios.get).toHaveBeenCalledWith(
  //     expect.stringContaining(`locatadd_nm=${encodeURIComponent(city)}`)
  //   );
  //   // 캐시에서 해당 키가 삭제되었는지 확인
  //   expect(cache.get(`region_${city}`)).toBeUndefined();
  // });

  afterAll(() => {
    cache.close();
  });
});
