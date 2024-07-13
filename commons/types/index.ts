// 지역코드
export interface IRegionData {
  StanReginCd: Array<{
    row: IRegionItem[];
    head: Array<{
      totalCount: number;
    }>;
  }>;
}
export interface IRegionItem {
  locatadd_nm: string;
  region_cd: string;
  umd_cd?: string;
  sgg_cd?: string;
}
// 아파트
export interface IApartmentLocationData {
  locatadd_nm: string;
  apartmentData: IApartmentData;
}
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
  전용면적: number;
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
  area: number;
}

export interface NaverMapProps {
  geocodeResults: IGeocodeData[];
  ncpClientId: string | undefined;
}

// marker
// 타입 정의
export interface IMarkerData {
  address: string;
  amount: number;
  area: number;
}
