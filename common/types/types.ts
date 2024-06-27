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
  거래금액: string;
}

export interface IReginCdData {
  StanReginCd: Array<{
    row: Array<{
      region_cd: string;
    }>;
  }>;
}
