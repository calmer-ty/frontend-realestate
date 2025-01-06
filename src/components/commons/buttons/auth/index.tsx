import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "@/src/hooks/useAuth";
import { auth, googleProvider } from "@/src/commons/libraries/firebase/firebaseApp";

import BasicAlert from "@/src/components/commons/alert/basic";
import LoginButton from "./loginButton";
import UserMenu from "./userMenu";

export default function AuthButton(): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();

  // 알림창 상태
  const [alertOpen, setAlertOpen] = useState(false);
  const alertClose = (): void => {
    setAlertOpen(false);
    router.push("/");
  };

  // Google 로그인 처리
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  // 로그아웃 처리
  const handleLogout = async (): Promise<void> => {
    try {
      await auth.signOut();
      setAlertOpen(true);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      {user == null ? <LoginButton onClick={handleGoogleLogin} /> : <UserMenu user={user} onLogout={handleLogout} />}
      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity="error" text="로그아웃 되었습니다." />
    </>
  );
}
