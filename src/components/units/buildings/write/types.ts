import type { IFirestoreData } from "@/src/commons/types";
import type { FieldValue } from "firebase/firestore";

export interface IEditFormData {
  isEdit: boolean;
  docData?: IFirestoreData | undefined;
}
export interface IWriteFormData {
  _id: string;
  type: string;
  address: string;
  addressDetail: string;
  area: string;
  roomCount: string;

  price: string;
  manageCost: string;

  floor: string;
  bathroomCount: string;
  elevator: string;

  desc: string;
  createdAt: FieldValue;
}
