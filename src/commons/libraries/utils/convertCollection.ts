const COLLECTIONS_KOR = {
  apartment: "아파트",
  officetel: "오피스텔",
  townHouse: "빌라",
};
const COLLECTIONS_ENG = {
  apartment: "apartment",
  officetel: "officetel",
  townHouse: "townHouse",
};

export const korToEng = (type: string): string => {
  switch (type) {
    case COLLECTIONS_KOR.apartment:
      return "apartment";
    case COLLECTIONS_KOR.officetel:
      return "officetel";
    case COLLECTIONS_KOR.townHouse:
      return "townHouse";
    default:
      return "";
  }
};
export const engToKor = (type: string): string => {
  switch (type) {
    case COLLECTIONS_ENG.apartment:
      return "아파트";
    case COLLECTIONS_ENG.officetel:
      return "오피스텔";
    case COLLECTIONS_ENG.townHouse:
      return "빌라";
    default:
      return "";
  }
};
