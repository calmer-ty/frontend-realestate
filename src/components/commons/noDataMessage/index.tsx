import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NoDataMessage({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center gap-2 px-8 py-20">
      <ErrorOutlineIcon fontSize="large" />
      {children}
    </div>
  );
}
