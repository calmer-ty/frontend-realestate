import type { UseFormRegister } from "react-hook-form";
import type { IEditFormData, IWriteFormData } from "../types";

export interface IBuildingDescProps {
  register: UseFormRegister<IWriteFormData>;
  editData: IEditFormData;
}
