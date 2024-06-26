export interface Data {
  response: {
    body: {
      items: {
        item: Item[]; // Item 배열 형태로 정의
      };
    };
  };
}
interface Item {
  거래금액: string;
}
