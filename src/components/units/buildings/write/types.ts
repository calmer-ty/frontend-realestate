import type { IFirestoreData } from "@/src/commons/types";
import type { FieldValue } from "firebase/firestore";

export interface IEditFormData {
  isEdit: boolean;
  docData?: IFirestoreData | undefined;
}
export interface IWriteFormData {
  _id?: string;
  createdAt?: FieldValue;

  type: string;
  address: string;
  addressDetail: string;
  area: number;
  roomCount: number;
  price: number;
  manageCost: number;
  floor: number;
  bathroomCount: number;
  elevator: string;
  desc: string;
}
