import type { DocumentData } from "firebase/firestore";
import type { IFirestore } from "@/src/commons/types";

export const convertFirestoreData = (data: DocumentData): IFirestore => {
  return {
    _id: data._id as string,
    type: data.type as string,
    address: data.address as string,
    addressDetail: data.addressDetail as string,
    area: data.area as number,
    roomCount: data.roomCount as number,
    price: data.price as number,
    manageCost: data.manageCost as number,
    floor: data.floor as number,
    bathroomCount: data.bathroomCount as number,
    elevator: data.elevator as string,
    desc: data.desc as string,
    imageUrls: data.imageUrls as string[],
    user: data.user as { _id: string; name: string; email: string },
    createdAt: data.createdAt as { seconds: number; nanoseconds: number },
    deletedAt: data.deletedAt as { seconds: number; nanoseconds: number },
  };
};
