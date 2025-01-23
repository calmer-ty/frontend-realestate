import Home from "@/src/components/units/home";

// metaData
interface IOpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  images: string[];
}
interface IMetadata {
  title: string;
  description: string;
  openGraph: IOpenGraphMetadata;
}

export const generateMetadata = async (): Promise<IMetadata> => {
  return {
    title: "부동산 웹 어플리케이션",
    description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
    openGraph: {
      title: "부동산 웹 어플리케이션",
      description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
      url: "/images/main.jpg",
      images: ["/images/main.jpg"],
    },
  };
};

export default function HomePage(): JSX.Element {
  return <Home />;
}
