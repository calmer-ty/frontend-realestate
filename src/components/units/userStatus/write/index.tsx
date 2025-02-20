import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "@/src/hooks/firebase/useFirestore2";
import { useAuth } from "@/src/hooks/useAuth";
import { useAlert } from "@/src/hooks/useAlert";

import { Button } from "@mui/material";
import BasicAlert from "@/src/components/commons/alert/basic";
import UnderlineTitle from "@/src/components/commons/title/underline";
import InputUnit from "./ui/inputUnit";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore2, IUserStatusForm } from "@/src/commons/types";
interface IEditFormData {
  isEdit: boolean;
  userStatus?: IFirestore2 | undefined;
}

export default function UserStatusWrite({ isEdit, userStatus }: IEditFormData): JSX.Element {
  const initialValues: IUserStatusForm = {
    won: userStatus?.won ?? 0,
    FA: userStatus?.FA ?? 0,
    FAGrowth: userStatus?.FAGrowth ?? 0,
    AS: userStatus?.AS ?? 0,
    ASGrowth: userStatus?.ASGrowth ?? 0,
  };

  const { user } = useAuth();
  const { register, handleSubmit, setValue, getValues } = useForm<IUserStatusForm>({
    defaultValues: initialValues,
  });

  const { alertOpen, alertText, alertSeverity, alertClose, setAlertOpen, setAlertSeverity, setAlertText, setRouting } = useAlert();
  const { createFirestore, updateFirestore } = useFirestore();

  // 등록 수정
  const handleFormSubmit = async (data: IUserStatusForm): Promise<void> => {
    try {
      const formData = {
        ...data,

        user: {
          name: user?.displayName,
          email: user?.email,
          _id: user?.uid,
        },
      };

      await createFirestore(formData, "userStatus");
      setAlertOpen(true);
      setAlertText("당신의 금융 상태 등록이 완료되었습니다.");
      setAlertSeverity("success");

      setRouting("/");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const handleFormUpdate = async (): Promise<void> => {
    try {
      const currentValues = getValues(); // 현재 폼의 값을 가져옵니다
      const updatedValues: Partial<IUserStatusForm> = {};

      Object.entries(currentValues).forEach(([key, currentValue]) => {
        const fieldKey = key as keyof IUserStatusForm;
        const initialValue = initialValues[fieldKey];

        if (currentValue != null && currentValue !== initialValue) {
          updatedValues[fieldKey] = currentValue;
        }
      });

      if (Object.keys(updatedValues).length === 0) {
        setAlertOpen(true);
        setAlertText("수정된 내역이 없습니다.");
        setAlertSeverity("info");
        return;
      }

      await updateFirestore(updatedValues, "userStatus", userStatus?._id ?? DEFAULT_STRING_VALUE);
      setAlertOpen(true);
      setAlertText("당신의 금융 상태이 수정 되었습니다.");
      setAlertSeverity("success");

      // 알람 후 페이지 이동
      setRouting("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  // 수정시 파이어베이스 데이터 불러옴
  useEffect(() => {
    if (userStatus !== undefined) {
      const { _id, user, createdAt, ...rest } = userStatus;
      // 각 필드에 값 설정
      if (rest.won != null) setValue("won", rest.won);
      if (rest.FA != null) setValue("FA", rest.FA);
      if (rest.FAGrowth != null) setValue("FAGrowth", rest.FAGrowth);
      if (rest.AS != null) setValue("AS", rest.AS);
      if (rest.ASGrowth != null) setValue("ASGrowth", rest.ASGrowth);
    }
  }, [userStatus, setValue]);

  return (
    <>
      {/* 폼 */}
      <S.Form onSubmit={handleSubmit(isEdit ? handleFormUpdate : handleFormSubmit)}>
        <section>
          <UnderlineTitle label="현금 자산" />
          <InputUnit label="원화 / 달러 / 금" type="number" register={register("won", { valueAsNumber: true })} unitLabel="만원" />
        </section>
        <section>
          <UnderlineTitle label="금융 자산" />
          <InputUnit label="주식 / ETF / 채권" type="number" register={register("FA", { valueAsNumber: true })} unitLabel="만원" />
          <InputUnit label="연간 상승률" type="number" register={register("FAGrowth", { valueAsNumber: true })} unitLabel="%" />
        </section>
        <section>
          <UnderlineTitle label="연봉" />
          <InputUnit label="연봉" type="number" register={register("AS", { valueAsNumber: true })} unitLabel="만원" />
          <InputUnit label="연봉 상승률" type="number" register={register("ASGrowth", { valueAsNumber: true })} unitLabel="%" />
        </section>
        <section>
          <Button role="submit-button" type="submit" variant="contained">
            {isEdit ? "수정" : "등록"}하기
          </Button>
        </section>
      </S.Form>

      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity={alertSeverity} text={alertText} />
    </>
  );
}
