import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "@/src/hooks/useAlert";
// import { cleanCurrency } from "@/src/commons/libraries/utils/priceFormatter";

import { Button, Tooltip, useMediaQuery } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import PaidIcon from "@mui/icons-material/Paid";
import SearchIcon from "@mui/icons-material/Search";

import BasicModal from "@/src/components/commons/modal/basic";
import InputUnit from "./inputUnit";
import UnderlineTitle from "@/src/components/commons/title/underline";
import BasicAlert from "@/src/components/commons/alert/basic";
// import FormattedInputs from "@/src/components/commons/input/textField/fomatted";

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
      setAlertText("당신의 자산 상태가 등록 되었습니다.");
      setAlertSeverity("success");

      setAsset(formData);
      setModalOpen(false); // 모달 열기
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  // 모달 오픈
  const onClickModalOpen = (): void => {
    setModalOpen(true); // 모달 열기
  };
  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };

  // 맵 모드 변경
  useEffect(() => {
    if (asset !== undefined) {
      setMapMode(true);
    }
  }, [asset, setMapMode]); // asset이 변할 때 실행됨

  const onClickMapModeToggle = (): void => {
    setMapMode((prev) => !prev);
  };

  return (
    <>
      <S.MapMode>
        <div className="buttonWrap">
          {/* 자산정보 입력 */}
          <Tooltip title={asset !== undefined ? "자산정보 수정하기" : " 자산정보 등록하기"}>
            <Button variant="contained" onClick={onClickModalOpen} color={asset !== undefined ? "success" : "primary"}>
              {!isSmallScreen && (asset !== undefined ? "자산정보 수정하기" : " 자산정보 등록하기")}
              {isSmallScreen && <CreateIcon />}
            </Button>
          </Tooltip>

          {/* 자산정보 모드 & 일반 매물 모드 토글 */}
          {asset !== undefined && (
            <Tooltip title={mapMode ? "등록된 매물 보기" : " 매입 가능한 건물 보기"}>
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
              <InputUnit label="원화 / 달러 / 금" type="number" register={register("cash", { valueAsNumber: true })} unitLabel="만원" />
              <InputUnit label="월 저축 금액" type="number" register={register("monthlySavings", { valueAsNumber: true })} unitLabel="만원" />
              {/* <FormattedInputs label="원화 / 달러 / 금" name="cash" register={register("cash")} control={control} />
              <FormattedInputs label="월 저축 금액" name="monthlySavings" register={register("monthlySavings")} control={control} /> */}
            </section>
            <section>
              <UnderlineTitle label="투자 자산" />
              <InputUnit label="주식 / ETF / 채권" type="number" register={register("investmentAssets", { valueAsNumber: true })} unitLabel="만원" />
              <InputUnit label="예상 연간 상승률" type="number" register={register("investmentAssetsGrowthRate")} unitLabel="%" />
              <InputUnit label="월 투자 금액" type="number" register={register("monthlyInvestment", { valueAsNumber: true })} unitLabel="만원" />
              {/* <FormattedInputs label="주식 / ETF / 채권" name="investmentAssets" register={register("investmentAssets")} control={control} /> */}
              {/* <FormattedInputs label="월 투자 금액" name="monthlyInvestment" register={register("monthlyInvestment")} control={control} /> */}
            </section>

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
    </>
  );
}
