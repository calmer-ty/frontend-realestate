import { useAuth } from "@/src/commons/hooks/useAuth";

import Link from "next/link";
import AuthButton from "@/src/components/layout/ui/auth";
import { Button } from "@mui/material";

import * as S from "./styles";

export default function Nav(): JSX.Element {
  const { user } = useAuth();

  return (
    <S.Nav>
      {user !== null && (
        <Link href="/new">
          <Button variant="contained">방 내놓기</Button>
        </Link>
      )}
      <AuthButton />
    </S.Nav>
  );
}
