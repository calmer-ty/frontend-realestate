import { ClipLoader } from "react-spinners";

interface ILoadingSpinnerProps {
  size: number;
}

export default function LoadingSpinner(props: ILoadingSpinnerProps): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: `${props.size}px` }}>
      <ClipLoader size={props.size} color={"#123abc"} loading={true} />
    </div>
  );
}
