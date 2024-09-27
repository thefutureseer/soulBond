"use client";

import React, { useState, useCallback } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { GET_PROMISES, CREATE_PROMISE } from '../../graphql/promises';
import { PromiseType, CreatePromiseResponse, CreatePromiseInput } from '../types/graphql';
import styles from '../../styles/styles.module.css';

// Type guard for PromiseType
const isPromiseType = (promise: any): promise is PromiseType => {
  return promise && typeof promise.id === 'string' && typeof promise.title === 'string';
};

const PromiseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editedById, setEditedById] = useState(''); // Renamed to match your CreatePromiseInput
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [createPromise, { loading }] = useMutation<CreatePromiseResponse, CreatePromiseInput>(CREATE_PROMISE, {
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.createPromise && isPromiseType(data.createPromise)) {
        const newPromise = data.createPromise;
        const existingPromises = cache.readQuery<{ getPromises: PromiseType[] }>({
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
      setEditedById(''); // Reset input
      setErrorMessage('');
    },
    onError: (err) => {
      setErrorMessage(err.message || 'An error occurred while creating the promise.');
      console.error('Error creating promise:', err.message);
    },
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !editedById) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages

    // Call createPromise with the correct structure
    createPromise({ variables: { input: { title, description, editedById } } });
  }, [title, description, editedById, createPromise]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
        type="text" 
        placeholder='Name'
        value={editedById} 
        onChange={(e) => setEditedById(e.target.value)} 
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
        className={`${styles['responsive-textarea']} p-2 border rounded`}       
      />
      <button type="submit" disabled={loading} className="p-2 bg-blue-500 text-white rounded">
        {loading ? 'Creating...' : 'Make a Promise'}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default PromiseForm;