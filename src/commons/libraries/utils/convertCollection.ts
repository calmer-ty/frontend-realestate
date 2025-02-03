const COLLECTIONS = {
  APT: "아파트",
};
const COLLECTIONS_ENG = {
  apt: "apt",
};

export const korToEng = (type: string): string => {
  switch (type) {
    case COLLECTIONS.APT:
      return "apt";
    default:
      return "";
  }
};
export const engToKor = (type: string): string => {
  switch (type) {
    case COLLECTIONS_ENG.apt:
      return "아파트";
    default:
      return "";
  }
};
