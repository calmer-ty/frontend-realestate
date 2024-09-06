export interface IFileWithPreview {
  file: File;
  previewUrl: string;
}
export interface IBasicUploadProps {
  onFilesChange: (files: File[]) => void;
}
