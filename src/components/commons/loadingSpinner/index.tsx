import { ClipLoader } from "react-spinners";

export default function LoadingSpinner(): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ClipLoader size={150} color={"#123abc"} loading={true} />
    </div>
  );
}
