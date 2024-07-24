// import type { Firestore } from "firebase/firestore";

export interface IWriteFormData {
  _id: string;
  type: string;
  address: string;
  addressDetail: string;
  floor: number;
  area: number;
  roomCount: number;
  price: number;
  manageCost: number;
  bathroomCount: number;
}

// export interface IWritePageProps {
//   firestore: Firestore;
// }
