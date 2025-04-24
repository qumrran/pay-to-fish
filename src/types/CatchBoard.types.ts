import { CatchPost } from './CatchPost.types';

export interface FirebaseUser {
  uid: string;
  displayName?: string;
  photoURL?: string;
}

export interface UseCatchBoardResult {
  posts: CatchPost[];
  loading: boolean;
  addPost: (description: string, image: File, lake: string) => Promise<any>;
  deletePost: (postId: string) => Promise<void>;
  updateDescription: (postId: string, description: string) => Promise<void>;
}
