"use client";

import AssetWrite from "@/src/components/units/asset/write";

import { useFetchAsset } from "@/src/hooks/useFetchAsset";

export default function AssetEditPage(): JSX.Element {
  const { asset } = useFetchAsset();

  return <AssetWrite isEdit={true} asset={asset} />;
}
