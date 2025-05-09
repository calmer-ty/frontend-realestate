import { signInWithPopup } from "firebase/auth";
import { useAlert } from "@/src/commons/hooks/useAlert";
import { useAuth } from "@/src/commons/hooks/useAuth";
import { auth, googleProvider } from "@/src/commons/libraries/firebase/firebaseApp";

import BasicAlert from "@/src/components/commons/alert/basic";
import LoginButton from "./loginButton";
import UserMenu from "./userMenu";

export default function AuthButton(): JSX.Element {
  const { user } = useAuth();

  // 알림창 상태
  const { alertOpen, alertClose, setAlertOpen, setRouting } = useAlert();

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
      setRouting("/");
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
