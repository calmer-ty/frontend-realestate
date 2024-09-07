import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const useAuthCheck = (): {
  open: boolean;
  handleClose: () => void;
} => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setOpen(true);
    }
  }, [status]);
  const handleClose = (): void => {
    setOpen(false);
  };

  return {
    open,
    handleClose,
  };
};
