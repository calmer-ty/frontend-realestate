import type { DocumentData, FieldValue } from "firebase/firestore";

export interface IBuildingWrite {
  isEdit: boolean;
  docData?: DocumentData | undefined;
}
export interface IWriteFormData {
  _id: string;
  type: string;
  address: string;
  addressDetail: string;
  elevator: string;
  floor: number;
  area: number;
  roomCount: number;
  price: number;
  manageCost: number;
  bathroomCount: number;
  desc: string;
  createdAt: FieldValue;
}
