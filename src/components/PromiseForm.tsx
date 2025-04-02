"use client";

import React, { useState, useCallback } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { GET_PROMISES, CREATE_PROMISE } from 'graphql/promises';
import { SoulPromise, CreatePromiseResponse, CreatePromiseInput, StatusUs } from 'types/graphql.d';
import styles from 'styles/styles.module.css';

// Type guard for SoulPromise
const isPromiseType = (soulpromise: any): soulpromise is SoulPromise => {
  return soulpromise && typeof soulpromise.id === 'string' && typeof soulpromise.title === 'string';
};

const PromiseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdById, setcreatedById] = useState('');
  // const [version, setVersion] = useState(); //default first version
  const [status, setStatus] = useState("PENDING"); //default first status
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [createPromise, { loading }] = useMutation<CreatePromiseResponse, CreatePromiseInput>(CREATE_PROMISE, {
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.createPromise && isPromiseType(data.createPromise)) {
        const newPromise = data.createPromise;
        const existingPromises = cache.readQuery<{ getPromises: SoulPromise[] }>({
          query: GET_PROMISES,
        });

        if (existingPromises) {
          cache.writeQuery({
            query: GET_PROMISES,
            data: {
              getPromises: [...existingPromises.getPromises, newPromise],
            },
          });
        }
      }
    },
    onCompleted: () => {
      setSuccessMessage('Promise created successfully!');
      setTitle('');
      setDescription('');
      setcreatedById('');
      setStatus('PENDING');
      setErrorMessage('');
    },
    onError: (err) => {
      setErrorMessage(err.message || 'An error occurred while creating the promise.');
      console.error('Error creating promise:', err.message);
    },
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = createdById || "123e4567-e89b-12d3-a456-426614174000";

    if (!title || !description || !userId) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    
    // Validate or map the string status to the StatusUs enum.
    const mappedStatus = StatusUs[status as keyof typeof StatusUs]; 
    
    //if `mappedStatus` is not a valid enum value.
    if (!mappedStatus) {
      console.error(`Invalid status value: ${status}`);
      return;
    }
    // console.log("variables", title, description, createdById, version, status);

    // Call createPromise with the correct structure.
    createPromise({ variables: { input: { title, description, createdById: userId, status:mappedStatus } } });
  }, [title, description, createdById, status, createPromise]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        type="text" 
        placeholder='using false id: 123e4567-e89b-12d3-a456-426614174000'
        value={createdById} 
        onChange={(e) => setcreatedById(e.target.value)} 
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
        placeholder="Promise description of souls" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className={`${styles['responsive-textarea']} p-2 border rounded`}       
      />
      <button type="submit" disabled={loading} className="p-2 bg-blue-400 text-white rounded">
        {loading ? 'Creating...' : 'Make a Promise'}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default PromiseForm;
