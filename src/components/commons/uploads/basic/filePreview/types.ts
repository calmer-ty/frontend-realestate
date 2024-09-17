import type { IFileWithPreview } from "../types";
// import type { IFirestoreData } from "@/src/commons/types";

export interface IFilePreviewListProps {
  // docData?: IFirestoreData | undefined;
  fileImages: string[];
  filePreviews: IFileWithPreview[];
  onRemoveFile: (index: number, type: "existing" | "new") => void;
}
