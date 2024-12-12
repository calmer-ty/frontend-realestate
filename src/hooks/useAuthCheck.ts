import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export interface IUseAuthCheck {
  session: Session | null;
  auth: boolean;
  handleUnAuth: () => void;
}

export const useAuthCheck = (): IUseAuthCheck => {
  const { status, data: session } = useSession();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setAuth(true);
    }
  }, [status]);
  const handleUnAuth = (): void => {
    setAuth(false);
  };

  return {
    session,
    auth,
    handleUnAuth,
  };
};
