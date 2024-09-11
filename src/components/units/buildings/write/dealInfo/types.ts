import type { UseFormRegister } from "react-hook-form";
import type { IWriteFormData } from "../types";
import type { DocumentData } from "firebase/firestore";

export interface IDealInfoProps {
  register: UseFormRegister<IWriteFormData>;
  isEdit: boolean;
  docData?: DocumentData | undefined;
}
