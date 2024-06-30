export interface IApartmentData {
  response: {
    body: {
      items: {
        item: IApartmentItem[]; // Item 배열 형태로 정의
      };
    };
  };
}
interface IApartmentItem {
  법정동: string;
  법정동본번코드: string;
  거래금액: string;
  아파트: string;
}

export interface IReginCdData {
  StanReginCd: Array<{
    row: Array<{
      region_cd: string;
    }>;
  }>;
}
