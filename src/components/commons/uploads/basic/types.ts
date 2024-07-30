export interface IFileWithPreview {
  file: File;
  previewUrl: string;
}
export interface IUploadBasicProps {
  onFilesChange: (files: File[]) => void;
}
