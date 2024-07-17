import * as yup from "yup";

export const schemaBuildingWrite = yup.object({
  address: yup.string().required("주소를 선택하여 입력해주세요."),
  addressDetail: yup.string().required("상세 주소를 입력해주세요"),
});
