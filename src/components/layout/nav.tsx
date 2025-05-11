import { useAuth } from "@/src/commons/hooks/useAuth";

import Link from "next/link";
import AuthButton from "@/src/components/layout/ui/auth";
import { Button } from "@mui/material";

export default function Nav(): JSX.Element {
  const { user } = useAuth();

  return (
    <nav className="flex items-center gap-2">
      {user !== null && (
        <Link href="/new">
          <Button variant="contained">방 내놓기</Button>
        </Link>
      )}
      <AuthButton />
    </nav>
  );
}
