import Header from "./header";

import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps): JSX.Element {
  // 모바일 해상도일 경우 주소 이동
  const router = useRouter();
  const isSmall = useMediaQuery("(max-width:480px)");

  useEffect(() => {
    if (isSmall) {
      router.push("/apartment");
    }
  }, [router, isSmall]);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
