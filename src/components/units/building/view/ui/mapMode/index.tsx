import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "@/src/hooks/useAlert";

import { Button, Tooltip, useMediaQuery } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import PaidIcon from "@mui/icons-material/Paid";
import SearchIcon from "@mui/icons-material/Search";

import BasicModal from "@/src/components/commons/modal/basic";
import InputUnit from "./inputUnit";
import UnderlineTitle from "@/src/components/commons/title/underline";
import BasicAlert from "@/src/components/commons/alert/basic";

import * as S from "./styles";
import type { IAssetForm } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IMapMode {
  mapMode: boolean;
  setMapMode: Dispatch<SetStateAction<boolean>>;
  asset: IAssetForm | undefined;
  setAsset: Dispatch<SetStateAction<IAssetForm | undefined>>;
}

export default function MapMode({ mapMode, setMapMode, asset, setAsset }: IMapMode): JSX.Element {
  const { register, handleSubmit } = useForm<IAssetForm>();
  const { alertOpen, alertText, alertSeverity, alertClose, setAlertOpen, setAlertSeverity, setAlertText } = useAlert();
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  const handleFormSubmit = async (data: IAssetForm): Promise<void> => {
    try {
      const formData = {
        ...data,
      };

      setAlertOpen(true);
      setAlertText("당신의 금융 상태 등록이 완료되었습니다.");
      setAlertSeverity("success");

      // setRouting("/");
      setAsset(formData);
      setModalOpen(false); // 모달 열기
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const onClickModalOpen = (): void => {
    setModalOpen(true); // 모달 열기
  };
  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };
  const onClickMapModeToggle = (): void => {
    setMapMode((prev) => !prev);
  };

  return (
    <S.MapMode>
      <div className="buttonWrap">
        <Tooltip title={isSmallScreen && (asset !== undefined ? "자산 등록완료" : " 자산 등록하기")}>
          <Button variant="contained" onClick={onClickModalOpen} color={asset !== undefined ? "success" : "primary"}>
            {!isSmallScreen && (asset !== undefined ? "자산 등록완료" : " 자산 등록하기")}
            {isSmallScreen && <CreateIcon />}
          </Button>
        </Tooltip>
        {asset !== undefined && (
          <Tooltip title={isSmallScreen && (mapMode ? "등록된 매물 보기" : " 매입 가능한 건물 보기")}>
            <Button variant="contained" onClick={onClickMapModeToggle} color={mapMode ? "secondary" : "primary"}>
              {!isSmallScreen && (mapMode ? "등록된 매물 보기" : " 매입 가능한 건물 보기")}
              {isSmallScreen && (mapMode ? <PaidIcon /> : <SearchIcon />)}
            </Button>
          </Tooltip>
        )}
      </div>

      <BasicModal open={modalOpen} onClose={onModalToggle}>
        {/* 폼 */}
        <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <section>
            <UnderlineTitle label="현금 자산" />
            <InputUnit label="원화 / 달러 / 금" type="cash" register={register("cash", { valueAsNumber: true })} unitLabel="만원" />
          </section>
          <section>
            <UnderlineTitle label="금융 자산" />
            <InputUnit label="주식 / ETF / 채권" type="number" register={register("FA", { valueAsNumber: true })} unitLabel="만원" />
            {/* <InputUnit label="연간 상승률" type="number" register={register("FAGrowth", { valueAsNumber: true })} unitLabel="%" /> */}
          </section>
          {/* <section>
            <UnderlineTitle label="연봉" />
            <InputUnit label="연봉" type="number" register={register("AS", { valueAsNumber: true })} unitLabel="만원" />
            <InputUnit label="연봉 상승률" type="number" register={register("ASGrowth", { valueAsNumber: true })} unitLabel="%" />
          </section> */}

          <section>
            <Button role="submit-button" type="submit" variant="contained">
              적용하기
            </Button>
          </section>
        </S.Form>
      </BasicModal>

      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity={alertSeverity} text={alertText} />
    </S.MapMode>
  );
}
