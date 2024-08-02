import BuildingDetail from "@/src/components/units/buildings/detail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";

import type { IBuildingListParams, IFirebaseData } from "@/src/commons/types";

export default async function BuildingDetailPage({ params }: { params: IBuildingListParams }): Promise<JSX.Element | undefined> {
  const { buildingType, listId } = params;

  try {
    // Firestore에서 특정 ID의 문서 가져오기
    const docRef = doc(db, buildingType, listId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
    } else {
      const buildingType = docSnap.data() as IFirebaseData;
      return <BuildingDetail buildingType={buildingType} />;
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return <div>Error fetching document: {error instanceof Error ? error.message : "Unknown error"}</div>;
  }
}
