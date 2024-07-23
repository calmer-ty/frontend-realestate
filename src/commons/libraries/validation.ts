import * as yup from "yup";

export const schemaBuildingWrite = yup.object({
  address: yup.string().required("주소는 필수 항목입니다."),
  addressDetail: yup.string().required("상세 주소는 필수 항목입니다."),
  floor: yup.number().typeError("층은 숫자여야 합니다.").required("층은 필수 항목입니다."),
  area: yup.number().typeError("평수는 숫자여야 합니다.").required("평수는 필수 항목입니다."),
  price: yup.number().typeError("가격은 숫자여야 합니다.").required("가격은 필수 항목입니다."),
  roomCount: yup.number().typeError("방 개수는 숫자여야 합니다.").required("방 개수는 필수 항목입니다."),
});
