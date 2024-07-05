// 지역코드
export interface IRegionData {
  StanReginCd: Array<{
    row: Array<{
      region_cd: string;
      locatadd_nm: string;
    }>;
  }>;
}

// 아파트
export interface IApartmentData {
  response: {
    body: {
      items: {
        item: IApartmentItem[]; // Item 배열 형태로 정의
      };
    };
  };
}
export interface IApartmentItem {
  법정동: string;
  법정동본번코드: string;
  거래금액: string;
  아파트: string;
}

// Geocode
export interface IGeocodeCoord {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
  }>;
}

export interface IGeocodeData {
  latitude: number;
  longitude: number;
  amount: number;
  address: string;
}

export interface NaverMapProps {
  geocodeResults: IGeocodeData[];
  ncpClientId: string | undefined;
}
