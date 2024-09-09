const COLLECTIONS = {
  APARTMENT: "아파트",
};

export const getFirestoreCollectionName = (type: string | null): string => {
  switch (type) {
    case COLLECTIONS.APARTMENT:
      return "apartment";
    default:
      return "";
  }
};
