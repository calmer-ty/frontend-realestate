import type { IFirestore } from "@/src/commons/types";

export interface IEditFormData {
  isEdit: boolean;
  docData?: IFirestore | undefined;
}
