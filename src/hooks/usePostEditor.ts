import { useState } from 'react';
import { toast } from 'react-toastify';

export const usePostEditor = (
  updateDescription: (postId: string, description: string) => Promise<void>,
  deletePost: (postId: string) => Promise<void>
) => {
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const startEditing = (postId: string, currentDesc: string) => {
    setEditPostId(postId);
    setEditDescription(currentDesc);
  };

  const cancelEditing = () => {
    setEditPostId(null);
    setEditDescription('');
  };

  const saveEdit = async () => {
    if (!editPostId) return;
    try {
      await updateDescription(editPostId, editDescription);
      toast.success('Opis zaktualizowany!');
    } catch {
      toast.error('Nie udało się zaktualizować posta.');
    } finally {
      cancelEditing();
    }
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      await deletePost(postToDelete);
      toast.success('Post został usunięty!');
    } catch {
      toast.error('Błąd przy usuwaniu posta.');
    } finally {
      setPostToDelete(null);
    }
  };

  return {
    editPostId,
    editDescription,
    setEditDescription,
    startEditing,
    cancelEditing,
    saveEdit,
    postToDelete,
    setPostToDelete,
    confirmDelete,
  };
};
