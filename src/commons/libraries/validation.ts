import type { Dispatch, SetStateAction } from "react";
import * as yup from "yup";

export const schemaBuildingWrite = yup.object({
  address: yup.string().required("주소는 필수 항목입니다."),
  addressDetail: yup.string().required("상세 주소는 필수 항목입니다."),
  floor: yup.number().typeError("층은 숫자여야 합니다.").required("층은 필수 항목입니다."),
  area: yup.number().typeError("평수는 숫자여야 합니다.").required("평수는 필수 항목입니다."),
  price: yup.number().typeError("가격은 숫자여야 합니다.").required("가격은 필수 항목입니다."),
  roomCount: yup.number().typeError("방 개수는 숫자여야 합니다.").required("방 개수는 필수 항목입니다."),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]; // 허용할 이미지 확장자만 명확히 지정

export const checkValidationImg = async (file?: File, setModalMessage?: Dispatch<SetStateAction<string>>, setOpenModal?: Dispatch<SetStateAction<boolean>>): Promise<boolean> => {
  if (file === undefined) {
    // alert("파일이 없습니다.");
    setModalMessage?.("파일이 없습니다.");
    setOpenModal?.(true);
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    // alert("파일 용량이 너무 큽니다. (5MB 이하)");
    setModalMessage?.("파일 용량이 너무 큽니다. (5MB 이하)");
    setOpenModal?.(true);
    return false;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    // alert("파일 확장자가 올바르지 않습니다. (jpeg/png/webp만 가능합니다.)");
    setModalMessage?.("파일 확장자가 올바르지 않습니다. (jpeg/png/webp만 가능합니다.)");
    setOpenModal?.(true);
    return false;
  }

  return true;
};
