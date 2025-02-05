import type { Dispatch, SetStateAction } from "react";

// 지역코드 API
export interface IRegion {
  StanReginCd: [
    { head: [IRegionHeadTotalCount, IRegionHeadPageInfo] }, // 첫 번째 요소는 head
    { row: IRegionItem[] } // 두 번째 요소는 row
  ];
}

export interface IRegionHeadTotalCount {
  totalCount: number;
}
export interface IRegionHeadPageInfo {
  numOfRows: number;
  pageNo: number;
}

export interface IRegionItem {
  region_cd: string;
  locatadd_nm: string;
  umd_cd: string;
  sido_cd: string;
  sgg_cd: string;
  locallow_nm: string;
}

export interface IRegionItemFiltered {
  city: string;
  district: string;
  regionCode: string;
}

// 아파트 API
export interface IApartment {
  response: {
    body: {
      items: {
        item: IApartmentItem[]; // Item 배열 형태로 정의
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
export interface IApartmentItem {
  estateAgentSggNm: string;
  umdNm: string;
  jibun: string;
  aptNm: string;
  floor: number;
  dealAmount: string;
  excluUseAr: number;
  dealDay: number;
  dealMonth: number;
  dealYear: number;
  buildYear: number;
  rgstDate: string;

  // 인덱스 시그니처 추가
  [key: string]: any;
}
export interface IApartmentLocation {
  responses: IApartment;
  locatadd_nm: string;
}

// 오피스텔 API
export interface IOfficetel {
  response: {
    body: {
      items: {
        item: IOfficetelItem[]; // Item 배열 형태로 정의
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
export interface IOfficetelItem {
  estateAgentSggNm: string;
  umdNm: string;
  jibun: string;
  aptNm: string;
  floor: number;
  dealAmount: string;
  excluUseAr: number;
  dealDay: number;
  dealMonth: number;
  dealYear: number;
  buildYear: number;
  rgstDate: string;

  // 인덱스 시그니처 추가
  [key: string]: any;
}
export interface IOfficetelLocation {
  responses: IApartment;
  locatadd_nm: string;
}

// Geocode API
export interface IGeocodeAPI {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
    roadAddress: string;
    jibunAddress: string;
    addressElements: string[];
  }>;
}
export interface IGeocode {
  latitude: number;
  longitude: number;
  roadAddress: string;
  jibunAddress: string;
}
export interface IGeocodeData {
  data: IApartmentItem;
  geocode: IGeocode;
}
export interface IUserInputGeocodeData {
  data: IFirestore;
  geocode: IGeocode;
}

// firestore
export interface IFirestore {
  _id: string;
  buildingType: string;
  transactionType: string;
  address: string;
  addressDetail: string;
  area: number;
  roomCount: number;
  price: number;
  rent: number;
  manageCost: number;
  floor: number;
  bathroomCount: number;
  elevator: string;
  desc?: string;
  imageUrls?: string[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  deletedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

// maps
declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
    maps: any;
    HOME_PATH: any;
  }
}
export interface IMapMarkerParams {
  geocode?: IGeocode;
  geocodeDatas: IGeocodeData[];
  matchingDatas: IFirestore[];
  // registeredGeocodeDatas: {
  //   matchingDatas: IUserInputGeocodeData[];
  //   newDatas: IUserInputGeocodeData[];
  // };
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  setvisibleMarkerDatass: Dispatch<SetStateAction<IGeocodeData[]>>;
}

// Write Form
export interface IWriteForm {
  buildingType: string;
  transactionType: string;
  address: string;
  addressDetail: string;
  area: number | null;
  roomCount: number | null;
  price: number | null;
  rent: number | null;
  manageCost: number | null;
  floor: number | null;
  bathroomCount: number | null;
  elevator: string;
  desc: string;
  imageUrls: string[];
}

// params
export interface IBuildingsParams {
  buildingType: string;
}
export interface IBuildingParamsPromiseProps {
  params: Promise<IBuildingsParams>;
}

export interface IBuildingListParams {
  buildingType: string;
  listId: string;
}
export interface IBuildingListParamsProps {
  params: IBuildingListParams;
}
export interface IBuildingListParamsPromiseProps {
  params: Promise<IBuildingListParams>;
}

// metaData
export interface IOpenGraphMetadata {
  title: string;
  description: string;
  images: string | string[];
  url?: string;
}
export interface IMetadata {
  title?: string;
  description?: string;
  openGraph: IOpenGraphMetadata;
}
