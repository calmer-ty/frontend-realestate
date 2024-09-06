import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const useAuthCheck = (): {
  open: boolean;
  handleClose: () => void;
} => {
  const router = useRouter();
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setOpen(true);
    }
  }, [status, router]);
  const handleClose = (): void => {
    setOpen(false); // 모달 닫기
    void router.push("/");
  };

  return {
    open,
    handleClose,
  };
};
