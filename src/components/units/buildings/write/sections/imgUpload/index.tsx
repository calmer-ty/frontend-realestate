import UnderlineTitle from "@/src/components/commons/titles/underline";
import BasicUpload from "@/src/components/commons/uploads/basic";

import type { Dispatch, SetStateAction } from "react";
interface IImgUploadProps {
  imageUrls: string[] | undefined;
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  setUploadedImageUrls: Dispatch<SetStateAction<string[]>>;
}

export default function ImgUpload(props: IImgUploadProps): JSX.Element {
  return (
    <section>
      <UnderlineTitle label="사진 등록" desc="5MB 이하, jpeg/png/webp" />
      <BasicUpload imageUrls={props.imageUrls} setSelectedFiles={props.setSelectedFiles} setUploadedImageUrls={props.setUploadedImageUrls} />
    </section>
  );
}
