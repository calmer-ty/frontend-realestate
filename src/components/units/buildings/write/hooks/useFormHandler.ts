import { useForm } from "react-hook-form";

import type { Control, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { IWriteForm } from "@/src/commons/types";

interface IUseFormHandlerReturn {
  register: UseFormRegister<IWriteForm>;
  handleSubmit: UseFormHandleSubmit<IWriteForm, undefined>;
  watch: UseFormWatch<IWriteForm>;
  setValue: UseFormSetValue<IWriteForm>;
  getValues: UseFormGetValues<IWriteForm>;
  control: Control<IWriteForm, any>;
}

export const useFormHandler = (initialValues: IWriteForm): IUseFormHandlerReturn => {
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm<IWriteForm>({
    defaultValues: initialValues,
  });

  return { register, handleSubmit, watch, setValue, getValues, control };
};
