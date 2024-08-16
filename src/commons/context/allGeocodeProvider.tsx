import { createContext, useContext, useState } from "react";
import type { SetStateAction, Dispatch, ReactNode } from "react";
import type { IGeocodeEtcData } from "@/src/commons/types";

interface IAllGeocodeContextProps {
  geocodeResults: IGeocodeEtcData[];
  setGeocodeResults: Dispatch<SetStateAction<IGeocodeEtcData[]>>;
}

// GeocodeContext를 생성하고 기본값을 설정합니다.
const AllGeocodeContext = createContext<IAllGeocodeContextProps | undefined>(undefined);

// Provider 컴포넌트를 정의합니다. 이 컴포넌트는 자식 컴포넌트에게 Context를 제공합니다.
export const AllGeocodeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [geocodeResults, setGeocodeResults] = useState<IGeocodeEtcData[]>([]);

  return <AllGeocodeContext.Provider value={{ geocodeResults, setGeocodeResults }}>{children}</AllGeocodeContext.Provider>;
};

// Context를 사용하기 위한 커스텀 훅
export const useAllGeocodeContext = (): IAllGeocodeContextProps => {
  const context = useContext(AllGeocodeContext);
  if (context === undefined) {
    throw new Error("useAllGeocode must be used within a GeocodeProvider");
  }
  return context;
};
