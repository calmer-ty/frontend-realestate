import type { IFirestore } from "@/src/commons/types";

export const filterBuildingsByUser = (buildings: IFirestore[], userId: string | undefined): IFirestore[] => buildings.filter((el) => el.user?._id === userId);
