import BuildingDetail from "@/src/components/units/buildings/detail";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";

import type { IBuildingListParamsPromiseProps, IBuildingListParamsProps, IMetadata } from "@/src/commons/types";
import type { DocumentData } from "firebase/firestore";

// Firestore 데이터 읽기 함수
export const fetchBuildingData = async (colName: string, docId: string): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, colName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Firestore 데이터 반환
    } else {
      console.error("문서를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Firestore 오류:", error.message);
    }
    return null;
  }
};

export const generateMetadata = async ({ params }: IBuildingListParamsProps): Promise<IMetadata> => {
  const buildingData = await fetchBuildingData("buildings", params.listId);

  // 데이터 기반 메타데이터 반환
  return {
    openGraph: {
      title: buildingData?.type,
      description: `${buildingData?.address}_${buildingData?.addressDetail}`,
      images: buildingData?.imageUrls[0],
    },
  };
};

export default function BuildingDetailPage({ params }: IBuildingListParamsPromiseProps): JSX.Element {
  return <BuildingDetail params={params} />;
}
