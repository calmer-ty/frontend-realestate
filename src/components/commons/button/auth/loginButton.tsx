import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

interface ILoginButtonProps {
  onClick: () => Promise<void>;
}

export default function LoginButton({ onClick }: ILoginButtonProps): JSX.Element {
  return (
    <Button onClick={onClick} variant="contained" startIcon={<GoogleIcon />}>
      구글 로그인
    </Button>
  );
}
