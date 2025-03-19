import Home from "@/src/components/units/home";

import type { IMetadata } from "@/src/commons/types";

export const generateMetadata = async (): Promise<IMetadata> => {
  return {
    title: "부동산 시뮬레이터",
    description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
    openGraph: {
      title: "부동산 시뮬레이터",
      description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
      images: ["https://www.calmer96.store/images/main.jpg"],
      url: "/images/main.jpg",
    },
  };
};

export default function HomePage(): JSX.Element {
  return <Home />;
}
