import { DocumentReference, DocumentData } from 'firebase/firestore';

export interface UseAddPostParams {
  description: string;
  image: File;
  lake: string;
}

export interface UseAddPostResult {
  handleAddPost: (description: string, image: File, lake: string) => Promise<void>;
}

export type AddPostFunction = (description: string, image: File, lake: string) => Promise<DocumentReference<DocumentData>>;
