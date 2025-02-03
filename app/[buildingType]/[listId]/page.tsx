import BuildingDetail from "@/src/components/units/buildings/detail";

import type { IBuildingListParamsProps } from "@/src/commons/types";

// export const generateMetadata = async ({ params }: IBuildingListParamsProps): Promise<IMetadata> => {
//   const buildingData = await fetchBuildingData("buildings", params.listId);

//   // 데이터 기반 메타데이터 반환
//   return {
//     openGraph: {
//       title: buildingData?.type,
//       description: `${buildingData?.address}_${buildingData?.addressDetail}`,
//       images: buildingData?.imageUrls[0],
//     },
//   };
// };

export default function BuildingDetailPage({ params }: IBuildingListParamsProps): JSX.Element {
  return <BuildingDetail params={params} />;
}
