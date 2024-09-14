import type { Dispatch, SetStateAction } from "react";
import type { Address } from "react-daum-postcode";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

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
  법정동부번코드: string;
  도로명: string;
  도로명건물본번호코드: string;
  도로명건물부번호코드: string;
  아파트: string;

  거래금액: string;
  전용면적: number;
  층: number;
  년: string;
  월: string;
  일: string;
  건축년도: number;
}
export interface IApartmentLocationData {
  datas: IApartmentData;
  locatadd_nm: string;
}

// Geocode
export interface IGeocodeCoord {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
    // roadAddress: string;
    // jibunAddress: string;
  }>;
}

export interface IGeocodeData {
  latitude: number;
  longitude: number;
  // roadAddress: string;
  // jibunAddress: string;
}
export interface IGeocodeEtcData {
  latitude: number;
  longitude: number;
  // roadAddress: string;
  // jibunAddress: string;

  address: string;
  address_road: string;
  buildingName: string;
  price: number;
  area: number;
  floor: number;
  dealYear: string;
  dealMonth: string;
  dealDay: string;
  constructionYear: number;
}

// marker
export interface IMarkerData {
  address: string;
  address_road: string;
  buildingName: string;
  price: number;
  area: number;
  floor: number;
  dealYear: string;
  dealMonth: string;
  dealDay: string;
  constructionYear: number;
}

// firebase
export interface IFirestoreData {
  _id: string;
  type: string;
  address: string;
  addressDetail: string;
  floor: number;
  area: number;
  price: number;
  roomCount: number;
  bathroomCount: number;
  manageCost: number;
  imageUrls?: string[];
  desc: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

// Hooks Type
// address
export interface IUseAddressSearchProps {
  selectedAddress: string;
  geocodeData: IGeocodeData | null;
  onCompleteAddressSearch: (data: Address) => Promise<void>;
}

// maps
declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

export interface IUseAllMarkerProps {
  geocodeResults: IGeocodeEtcData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IMarkerData | null>>;
  setVisibleMarkerDatas: Dispatch<SetStateAction<IMarkerData[]>>;
  firestoreDatas: IFirestoreData[];
}
export interface IUseFetchAllGeocodeProps {
  geocodeResults: IGeocodeEtcData[];
  loading: boolean;
  error: Error | null;
}
export interface IUseMapsLoaderProps {
  // mapId: string;
  onMapLoaded: (map: any) => void;
}

// firebase
export interface IuseFirestoreProps {
  createFirestoreData: (data: IWriteFormData, selectedTypeEng: string) => Promise<void>;
  readFirestoreData: (collection: string, docId: string) => Promise<IFirestoreData | undefined>;
  readFirestoreDatas: (buildingType: string) => Promise<IFirestoreData[]>;
}

export interface IuseStorageProps {
  uploadFiles: (files: File[]) => Promise<string[]>;
  uploading: boolean;
}

// params
export interface IBuildingParams {
  buildingType: string;
}
export interface IBuildingListParams {
  buildingType: string;
  listId: string;
}
