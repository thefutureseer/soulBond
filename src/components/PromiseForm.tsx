'use client';
import { useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const PromiseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPromise = { title, description, status: 'pending' };
    
    // Emit new promise to the server
    socket.emit('createPromise', newPromise);
    
    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Promise title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Promise description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">Make a Promise</button>
    </form>
  );
};

export default PromiseForm;