'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { GET_PROMISES, CREATE_PROMISE, UPDATE_PROMISE } from 'graphql/promises';
import { PromiseType, CreatePromiseResponse, CreatePromiseInput } from '../types/graphql';
import styles from 'styles/styles.module.css';

// Type guard for PromiseType
const isPromiseType = (soulpromise: any): soulpromise is PromiseType => {
  return soulpromise && typeof soulpromise.id === 'string' && typeof soulpromise.title === 'string';
};

// Extend props to handle editing
interface PromiseFormProps {
  soulpromise?: PromiseType; // Optional promise prop for editing
  onClose: () => void; // Callback to close the form
}

const EditButtonForm: React.FC<PromiseFormProps> = ({ soulpromise, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editedById, setEditedById] = useState('123e4567-e89b-12d3-a456-426614174000'); //Default for now /if someone doesn't want to signin
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [status, setStatus] = useState('');
  const [version, setVersion] = useState(Number);

  const [createPromise, { loading:creating }] = useMutation<CreatePromiseResponse, CreatePromiseInput>(CREATE_PROMISE, {
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
      setEditedById('');
      setErrorMessage('');
      onClose(); // Close the form after success
    },
    onError: (err) => {
      setErrorMessage(err.message || 'An error occurred while creating the promise.');
      console.error('Error creating promise:', err.message);
    },
  });

  const [updatePromise, {loading: updating}] = useMutation(UPDATE_PROMISE, {
    onCompleted: () => {
      setSuccessMessage('Promise updated successfully!');
      onClose(); // Close the form after success
    },
    onError: (err) => {
      setErrorMessage(err.message || 'An error occurred while updating the promise.');
      console.error('Error updating promise:', err.message);
    },
  });

  // Effect to populate the form if editing
  useEffect(() => {
    if (soulpromise) {
      setTitle(soulpromise.title);
      setDescription(soulpromise.description);
      setEditedById(soulpromise.editedById || '123e4567-e89b-12d3-a456-426614174000');
      setVersion(soulpromise.version);
      setStatus(soulpromise.status);
    }
  }, [soulpromise]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditedById('');
    setErrorMessage('');
    setSuccessMessage('');
    setVersion(0); // Reset version
    setStatus(''); // Reset status
  };

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const finalEditedById = editedById || '123e4567-e89b-12d3-a456-426614174000';

    setErrorMessage(''); // Clear previous errors unless we should keep longer
    setSuccessMessage(''); // Clear previous success messages

    if (soulpromise) {
      // Call updatePromise if editing
      updatePromise({ variables: { id: soulpromise.id, input: { title, description, editedById: finalEditedById, status, version } } });
    } else {
      // Call createPromise if creating
      createPromise({ variables: { input: { title, description, editedById: finalEditedById  } } });
    }
  }, [title, description, editedById, createPromise, updatePromise, soulpromise]);

  //Determine if the state is loading
  const isLoading = creating || updating;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
      <input 
        type="text" 
        placeholder='Editor ID'
        value={editedById} 
        onChange={(e) => setEditedById(e.target.value)} 
        className="p-2 border rounded"
        disabled={isLoading} // Disable input while loading
      />
      <input 
        type="text" 
        placeholder="Promise title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="p-2 border rounded"
        disabled={isLoading} // Disable input while loading
      />
      <textarea 
        placeholder="Promise description of souls" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className={`${styles['responsive-textarea']} p-2 border rounded`} 
        disabled={isLoading} // Disable input while loading      
      />

      //Only showing what version/how many updates:
      <input 
        type="number" 
        placeholder="Version" 
        value={version} 
        className="p-2 border rounded"
        readOnly
      />

      <input 
          type="text" 
          placeholder="Status" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="p-2 border rounded"
          disabled={isLoading}
        />

      <button type="submit" disabled={isLoading} className="p-2 bg-blue-500 text-white rounded">
        {
          isLoading ?  ( 
              <div className="spinner" /> // Display spinner while loading
            ) : (soulpromise ? 'Update Promise' : 'Make a Promise')
          }
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default EditButtonForm;