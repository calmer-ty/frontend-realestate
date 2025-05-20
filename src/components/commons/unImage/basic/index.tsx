import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

export default function BasicUnImage({ className }: { className: string }): JSX.Element {
  return (
    <div className={`flex justify-center items-center bg-gray-200 ${className}`}>
      <ImageNotSupportedIcon fontSize="inherit" />
    </div>
  );
}
