import type { DocumentData, FieldValue } from "firebase/firestore";

export interface IEditFormData {
  isEdit: boolean;
  docData?: DocumentData | undefined;
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
