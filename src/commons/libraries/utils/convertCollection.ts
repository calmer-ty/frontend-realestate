const COLLECTIONS = {
  APARTMENT: "아파트",
};
const COLLECTIONS_ENG = {
  apartment: "apartment",
};

export const korToEng = (type: string): string => {
  switch (type) {
    case COLLECTIONS.APARTMENT:
      return "apartment";
    default:
      return "";
  }
};
export const engToKor = (type: string): string => {
  switch (type) {
    case COLLECTIONS_ENG.apartment:
      return "아파트";
    default:
      return "";
  }
};
