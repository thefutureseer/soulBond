'use client'

import { useQuery } from '@apollo/client';
import { GET_PROMISE } from 'graphql/promises';
import { useState, useEffect } from 'react';

interface EditButtonFormProps {
  params: {
    id: string;
  };
}

const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
  const { id } = params; // Get the promise ID from the route params
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data, loading, error } = useQuery(GET_PROMISE, {
    variables: { id },
  });

  useEffect(() => {
    if (data?.getPromise) {
      setTitle(data.getPromise.title);
      setDescription(data.getPromise.description);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg mb-4">User ID: {id}</p>
      <form>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </form>
    </div>
  );
};

export default EditButtonForm;


// // src/app/edit/[id]/page.tsx
// 'use client';

// import React from 'react';

// interface EditButtonFormProps {
//   params: {
//     id: string;
//   };
// }

// const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
//   const { id } = params; // Get the promise id from the URL

//   // Render user ID
//   return (
//     <div className="flex flex-col items-center">
//       <p className="text-lg mb-4">User ID: {id}</p>
//     </div>
//   );
// };

// export default EditButtonForm;