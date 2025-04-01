import React from 'react';
import LazyLoad from 'react-lazyload';
import { FaCircleUser } from 'react-icons/fa6';
import { CatchPostItemProps } from '../../../types/CatchPostItem.types';

const CatchPostItem: React.FC<CatchPostItemProps> = ({
  post, isEditing, editDescription, setEditDescription,
  onEdit, onSave, onCancel, onDelete,
  currentUserId, getLakeText
}) => {
  const isOwner = currentUserId === post.userId;

  return (
    <div className="border p-4 mb-4 rounded shadow-md">
      <div className="flex items-center mb-4">
        {post.avatar ? (
          <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
        ) : (
          <FaCircleUser className="w-10 h-10 text-gray-500 mr-2" />
        )}
        <p className="font-bold">{post.userName || 'Anonimowy użytkownik'}</p>
      </div>

      <LazyLoad height={200}>
        <img src={post.imageUrl} alt="połów" className="w-full h-auto mb-4 rounded" />
      </LazyLoad>

      {isEditing ? (
        <>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={onSave} className="bg-green-500 text-white py-1 px-4 rounded mr-2">Zapisz</button>
          <button onClick={onCancel} className="bg-gray-500 text-white py-1 px-4 rounded">Anuluj</button>
        </>
      ) : (
        <p>{post.description}</p>
      )}

      <p className="text-sm text-gray-500">
        Dodano: {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : 'Brak daty'}
      </p>
      <p className="text-sm text-gray-500">{getLakeText(post.lake)}</p>

      {isOwner && !isEditing && (
        <>
          <button onClick={onEdit} className="bg-blue-500 text-white py-1 px-4 rounded mt-2">Edytuj</button>
          <button onClick={onDelete} className="ml-2 bg-red-500 text-white py-1 px-4 rounded mt-2">Usuń</button>
        </>
      )}
    </div>
  );
};

export default CatchPostItem;
