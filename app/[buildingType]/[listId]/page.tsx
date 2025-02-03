// import { fetchBuildingData } from "@/src/commons/libraries/firebase/fetchBuildingData";

import BuildingDetail from "@/src/components/units/buildings/detail";

import type { IBuildingListParamsProps } from "@/src/commons/types";

// export const generateMetadata = async ({ params }: IBuildingListParamsProps): Promise<IMetadata> => {
//   try {
//     const buildingData = await fetchBuildingData("buildings", params.listId);
//     if (buildingData === null) {
//       throw new Error("Building data not found");
//     }
//     return {
//       openGraph: {
//         title: buildingData?.type,
//         description: `${buildingData?.address}_${buildingData?.addressDetail}`,
//         images: buildingData?.imageUrls[0],
//       },
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {
//       openGraph: {
//         title: "Default Title",
//         description: "No data available",
//         images: "/default-image.jpg",
//       },
//     };
//   }
// };

export default function BuildingDetailPage({ params }: IBuildingListParamsProps): JSX.Element {
  return <BuildingDetail params={params} />;
}
