import type { DocumentData } from "firebase/firestore";
import type { IFirestoreData } from "../../types";

export const convertFirestoreData = (data: DocumentData): IFirestoreData => {
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
    // prettier-ignore
    user: data.user !== undefined ? {
      _id: data.user._id as string,
      name: data.user.name as string,
      email: data.user.email as string,
    }: undefined,
    // prettier-ignore
    createdAt: data.createdAt !== undefined ? {
      seconds: data.seconds as  number,
      nanoseconds: data.nanoseconds as  number,
    }: undefined,
  };
};
