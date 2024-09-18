// src/components/PromiseForm.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROMISE } from '../app/utils/apolloClient'; // Adjust the path as necessary

const PromiseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorId, setCreatorId] = useState(''); // Replace with actual user ID or context

  const [createPromise, { loading, error }] = useMutation(CREATE_PROMISE, {
    onCompleted: (data) => {
      console.log('Promise created successfully:', data);
      // Optionally reset the form or provide feedback
      setTitle('');
      setDescription('');
      setCreatorId('');
    },
    onError: (err) => {
      console.error('Error creating promise:', err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPromise({ variables: { title, description, creatorId } });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        type="text" 
        placeholder="Creator ID" 
        value={creatorId} 
        onChange={(e) => setCreatorId(e.target.value)} 
        className="p-2 border rounded"
      />
      <input 
        type="text" 
        placeholder="Promise title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="p-2 border rounded"
      />
      <textarea 
        placeholder="Promise description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="p-2 border rounded"
      />
      <button type="submit" disabled={loading} className="p-2 bg-blue-500 text-white rounded">
        {loading ? 'Creating...' : 'Make a Promise'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default PromiseForm;