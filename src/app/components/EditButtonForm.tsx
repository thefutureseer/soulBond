'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { GET_PROMISES, UPDATE_PROMISE } from 'graphql/promises';
import { PromiseType, UpdatePromiseInput, UpdatePromiseResponse, GetPromisesQueryResult } from '../types/graphql'; 
import styles from 'styles/styles.module.css';

// Type guard for PromiseType
const isPromiseType = (soulpromise: any): soulpromise is PromiseType => {
  return soulpromise && typeof soulpromise.id === 'string' && typeof soulpromise.title === 'string';
};

 enum StatusUs {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  BROKEN = "BROKEN",
}

// Props for editing only
interface PromiseFormProps {
  soulpromise: PromiseType; // The promise that will be edited (required)
  onClose: () => void; // Callback to close the form
}

const EditButtonForm: React.FC<PromiseFormProps> = ({ soulpromise, onClose }) => {
  const [title, setTitle] = useState(soulpromise.title || '');
  const [description, setDescription] = useState(soulpromise.description || '');
  const [editedById, setEditedById] = useState('123e4567-e89b-12d3-a456-426614174000'); // Default editor ID
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [status, setStatus] = useState<StatusUs>(soulpromise.status); // Initialize with enum
  const [version, setVersion] = useState(soulpromise.version || 0); // Default version from the promise

  const [updatePromise, { loading: updating }] = useMutation<UpdatePromiseResponse>(UPDATE_PROMISE, {
    onCompleted: (data) => {
      setSuccessMessage('Promise updated successfully!');
      onClose(); // Close the form after success
    },
    onError: (err) => {
      setErrorMessage(err.message || 'An error occurred while updating the promise.');
      console.error('Error updating promise:', err.message);
    },
    update: (cache: ApolloCache<any>, { data }) => {
      const existingPromises = cache.readQuery<GetPromisesQueryResult>({ query: GET_PROMISES });
  
      if (existingPromises && existingPromises.getPromises) {
        cache.writeQuery({
          query: GET_PROMISES,
          data: {
            getPromises: existingPromises.getPromises.map((p: PromiseType) =>
              p.id === soulpromise.id ? { ...p, ...data?.updatePromise } : p
            ),
          },
        });
      }
    },
  });  

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title || !description) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      const input: UpdatePromiseInput = {
        id: soulpromise.id,
        title,
        description,
        status,
        editedById
      };

      setErrorMessage(''); // Clear any previous errors
      setSuccessMessage(''); // Clear success messages

      // Call the mutation to update the promise
      updatePromise({
        variables: {
          id: soulpromise.id,
          input,
        },
      });
    },
    [title, description, status, updatePromise, soulpromise.id]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ pointerEvents: updating ? 'none' : 'auto' }}>
      <input
        type="text"
        placeholder="Editor ID"
        value={editedById}
        onChange={(e) => setEditedById(e.target.value)}
        className="p-2 border rounded"
        disabled={updating} // Disable input while updating
      />
      <input
        type="text"
        placeholder="Promise title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
        disabled={updating} // Disable input while updating
      />
      <textarea
        placeholder="Promise description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`${styles['responsive-textarea']} p-2 border rounded`}
        disabled={updating} // Disable input while updating
      />

      {/* Show current version but keep it read-only */}
      <input
        type="number"
        placeholder="Version"
        value={version}
        className="p-2 border rounded"
        readOnly
      />

      {/* Status Dropdown */}
      <label htmlFor="status">Select Status:</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as StatusUs)} // Type assertion for dropdown
        className="p-2 border rounded"
        disabled={updating} // Disable input while updating
      >
        {Object.values(StatusUs).map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>

      <button type="submit" disabled={updating} className="p-2 bg-blue-500 text-white rounded">
        {updating ? <div className="spinner" /> : 'Update Promise'}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default EditButtonForm;