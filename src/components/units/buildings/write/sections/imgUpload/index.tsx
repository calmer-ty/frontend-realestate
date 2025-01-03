import UnderlineTitle from "@/src/components/commons/titles/underline";
import BasicUpload from "@/src/components/commons/uploads/basic";

import type { IImgUploadProps } from "./types";

export default function ImgUpload(props: IImgUploadProps): JSX.Element {
  return (
    <section>
      <UnderlineTitle label="사진 등록" desc="5MB 이하, jpeg/png/webp" />
      <BasicUpload imageUrls={props.imageUrls} setSelectedFiles={props.setSelectedFiles} setUploadedImageUrls={props.setUploadedImageUrls} />
    </section>
  );
}
