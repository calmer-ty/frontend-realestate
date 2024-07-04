import type { Firestore } from "firebase/firestore";

export interface IWriteFormData {
  title: string;
  address: string;
}

export interface IWritePageProps {
  firestore: Firestore;
}
