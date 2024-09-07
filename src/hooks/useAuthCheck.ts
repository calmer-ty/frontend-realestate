import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export const useAuthCheck = (): {
  session: Session | null;
  open: boolean;
  handleClose: () => void;
} => {
  const { status, data: session } = useSession();
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
    session,
    open,
    handleClose,
  };
};
