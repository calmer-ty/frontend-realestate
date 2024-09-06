"use client";

import Link from "next/link";
import ButtonAuth from "@/src/components/commons/buttons/auth";
// import { useState } from "react";
import { useSession } from "next-auth/react";
import type { MouseEvent } from "react";

export default function Nav(): JSX.Element {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickBuildingNew = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (status === "unauthenticated") {
      e.preventDefault(); // 인증되지 않은 사용자는 링크 이동을 막음
      //   setIsModalOpen(true);
      //   alert("로그인을 해주세요");
    }
  };
  //   const handleModalClose = (): void => {
  //     setIsModalOpen(false); // 모달 닫기
  //   };

  return (
    <nav>
      <Link href={isAuthenticated ? "/new" : "/"} onClick={onClickBuildingNew}>
        방 내놓기
      </Link>
      <ButtonAuth />
    </nav>
  );
}
