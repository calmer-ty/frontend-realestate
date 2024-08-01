import BuildingDetail from "@/src/components/units/buildings/detail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/pages/api/cloudFirestore";

interface Params extends Record<string, string> {
  listId: string;
}

export default async function BuildingDetailPage({ params }: { params: Params }): Promise<JSX.Element> {
  const { listId } = params;
  console.log(listId);

  try {
    // Firestore에서 특정 ID의 문서 가져오기
    const docRef = doc(db, "apartment", listId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
    } else {
      const apartment = docSnap.data();
      console.log("Document data:", apartment);
      // return <BuildingDetail apartment={apartment} />;
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
  return <BuildingDetail />;
}
