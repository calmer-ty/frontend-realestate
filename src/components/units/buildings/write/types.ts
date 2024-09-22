import type { IFirestoreData } from "@/src/commons/types";

export interface IEditFormData {
  isEdit: boolean;
  docData?: IFirestoreData | undefined;
}
