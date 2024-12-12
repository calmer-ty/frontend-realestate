import type { Session } from "next-auth";
// import type { Dispatch, SetStateAction } from "react";
import type { Address } from "react-daum-postcode";

// 지역코드 API
export interface IRegion {
  StanReginCd?: [
    { head?: [IRegionHeadTotalCount, IRegionHeadPageInfo] }, // 첫 번째 요소는 head
    { row?: IRegionItem[] } // 두 번째 요소는 row
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
  region_cd?: string;
  // locatadd_nm?: string;
  // locallow_nm?: string;
  // sido_cd?: string;
  // sgg_cd?: string;
  // umd_cd?: string;
}

// 아파트 API
export interface IApartment {
  response?: {
    body?: {
      items?: {
        item?: IApartmentItem[]; // Item 배열 형태로 정의
      };
    };
  };
}
export interface IApartmentItem {
  estateAgentSggNm?: string;
  umdNm?: string;
  jibun?: string;
  aptNm?: string;
  floor?: number;
  dealAmount?: string;
  excluUseAr?: number;
  dealDay?: number;
  dealMonth?: number;
  dealYear?: number;
  buildYear?: number;
}
export interface IApartmentLocation {
  responses?: IApartment;
  locatadd_nm?: string;
}

// Geocode API
export interface IGeocodeAPI {
  addresses?: Array<{
    x?: string; // 경도
    y?: string; // 위도
    roadAddress?: string;
    jibunAddress?: string;
  }>;
}
export interface IGeocodeAPIReturn {
  latitude?: number;
  longitude?: number;
  roadAddress?: string;
  jibunAddress?: string;
}
export interface IGeocodeData {
  data?: IApartmentItem;
  geocode?: IGeocodeAPIReturn;
}

// export interface IGeocodeData {
//   address?: string;
//   address_road?: string;
//   buildingName?: string;
//   price?: number;
//   area?: number;
//   floor?: number;
//   dealYear?: number;
//   dealMonth?: number;
//   dealDay?: number;
//   buildYear?: number;
// }

// map API marker
export interface ILocationData {
  address?: string;
  address_road?: string;
  buildingName?: string;
  price?: number;
  area?: number;
  floor?: number;
  dealYear?: number;
  dealMonth?: number;
  dealDay?: number;
  buildYear?: number;
}

// firestore
export interface IFirestore {
  _id?: string;
  type?: string;
  address?: string;
  addressDetail?: string;
  area?: number;
  roomCount?: number;
  price?: number;
  manageCost?: number;
  floor?: number;
  bathroomCount?: number;
  elevator?: string;
  desc?: string;
  imageUrls?: string[];
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  deletedAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

// maps
declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

// Write Form
export interface IWriteForm {
  type: string;
  address: string;
  addressDetail: string;
  area: number | null;
  roomCount: number | null;
  price: number | null;
  manageCost: number | null;
  floor: number | null;
  bathroomCount: number | null;
  elevator: string;
  desc: string;
  imageUrls: string[];
}

// Hooks Type
// address search
export interface IUseAddressSearchProps {
  selectedAddress: string;
  geocodeData: IGeocodeAPIReturn | null;
  onCompleteAddressSearch: (data: Address) => Promise<void>;
}

export interface IUseMapsLoaderProps {
  onMapLoaded: (map: any) => void;
}

// firebase
export interface IUseFirestoreProps {
  createFirestore: (data: IWriteForm, selectedTypeEng: string) => Promise<void>;
  archiveFirestore: (building: IFirestore) => Promise<void>;
  updateFirestore: (data: Partial<IWriteForm>, selectedType: string, docId: string) => Promise<void>;
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>;
  readFirestore: (collection: string, docId: string) => Promise<IFirestore | undefined>;
  readFirestores: (buildingType: string) => Promise<IFirestore[]>;
}

export interface IUseStorageProps {
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

// Google Auth
export interface IUseAuthCheck {
  session: Session | null;
  auth: boolean;
  handleUnAuth: () => void;
}
