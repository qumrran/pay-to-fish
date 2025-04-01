import { CatchPost } from '../types/CatchPost.types';

export interface CatchPostItemProps {
  post: CatchPost;
  isEditing: boolean;
  editDescription: string;
  setEditDescription: (val: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  currentUserId?: string;
  getLakeText: (lake: string) => string;
}
