import Home from "@/src/components/units/home";
import Head from "next/head";

interface HomePageProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export const getServerSideProps = async (): Promise<{ props: HomePageProps }> => {
  return {
    props: {
      title: "부동산 웹 어플리케이션",
      description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
      imageUrl: "https://www.calmer96.store/images/main.jpg",
      url: "https://www.calmer96.store",
    },
  };
};

export default function HomePage({ title, description, imageUrl, url }: HomePageProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
