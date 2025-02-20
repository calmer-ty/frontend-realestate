import BuildingView from "@/src/components/units/building/view";

import type { IBuildingParamsPromiseProps } from "@/src/commons/types";

export default function BuildingsPage({ params }: IBuildingParamsPromiseProps): JSX.Element {
  return <BuildingView params={params} />;
}
