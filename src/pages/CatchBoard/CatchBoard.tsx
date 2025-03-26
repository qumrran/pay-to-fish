import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useCatchBoard } from '../../hooks/useCatchBoard';
import { usePostEditor } from '../../hooks/usePostEditor';
import { useAddPost } from '../../hooks/useAddPost';
import CatchPostItem from '../../components/CatchBoard/CatchPostItem/CatchPostItem';
import CatchPostForm from '../../components/CatchBoard/CatchPostForm/CatchPostForm';
import ConfirmDeleteModal from '../../components/CatchBoard/ConfirmDeleteModal/ConfirmDeleteModal';
import Loader from '../../components/Shared/Loader/Loader';
import { getLakeText } from '../../utils/getLakeText';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CatchBoard: React.FC = () => {
  const { user } = useContext(UserContext) || {};
  const {
    posts,
    loading,
    addPost,
    deletePost,
    updateDescription,
  } = useCatchBoard(user);

  const {
    editPostId,
    editDescription,
    setEditDescription,
    startEditing,
    cancelEditing,
    saveEdit,
    postToDelete,
    setPostToDelete,
    confirmDelete,
  } = usePostEditor(updateDescription, deletePost);

  const { handleAddPost } = useAddPost(addPost);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      <h1 className="text-4xl font-bold mb-4 text-center">Tablica Połowów</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {user && <CatchPostForm onSubmit={handleAddPost} />}

          <div className="max-w-3xl mx-auto">
            {posts.map(post => (
              <CatchPostItem
                key={post.id}
                post={post}
                isEditing={editPostId === post.id}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                onEdit={() => startEditing(post.id, post.description)}
                onSave={saveEdit}
                onCancel={cancelEditing}
                onDelete={() => setPostToDelete(post.id)}
                currentUserId={user?.uid}
                getLakeText={getLakeText}
              />
            ))}
          </div>

          {postToDelete && (
            <ConfirmDeleteModal
              onConfirm={confirmDelete}
              onCancel={() => setPostToDelete(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CatchBoard;
