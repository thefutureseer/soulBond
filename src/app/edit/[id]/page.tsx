'use client'

import React, { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { useQuery, useMutation } from '@apollo/client';
// import { useRouter } from 'next/router';
import { GET_PROMISE, UPDATE_PROMISE } from 'graphql/promises';
import { EditButtonFormProps } from '../../../types/graphql';
import { statusColors } from 'ui/statusColors';
import styles from 'styles/editButtonForm.module.css';

const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
  const { id } = params; // Get the promise ID from the route params
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [updatedAt, setCreated] = useState('');
  const [message, setMessage] = useState(''); // Error message
  const [editedById, setEditedById] = useState('');
  // const router = useRouter();

  const { data, loading, error } = useQuery(GET_PROMISE, {
    variables: { id },
  });

  const [updatePromise, { loading: updating }] = useMutation(UPDATE_PROMISE, {
    onCompleted: () => {
      setMessage("Update complete");
      // router.push('/'); // Redirect to the main page
      window.location.assign('/') // Full page reload which is less efficient
    },
    onError: (err) => setMessage(`Error: ${err.message}`),
  });

  useEffect(() => {
    if (data?.getPromise) {
      setTitle(data.getPromise.title);
      setDescription(data.getPromise.description);
      setStatus(data.getPromise.status);
      setCreated(data.getPromise.updatedAt);
      setEditedById(data.getPromise.editedById);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePromise({
        variables: {
          id,
          input: {
            title,
            description,
            status,
            editedById: "123e4567-e89b-12d3-a456-426614174000", // Hardcoded user ID for now
            updatedAt: new Date().toISOString(),
          }
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Soul Bond ID: {id}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="mb-4">
          <label className={styles.label}>Edited by user ID:</label>
          <p className="text-gray-900">{editedById}</p>
        </div>
        <div className="mb-4">
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.label}>Description:</label>
          <input
            type="text"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.label}>Update status here:</label>
          <div className={`${styles.selectWrapper} ${statusColors[status]}`}>
            <select
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="BROKEN">BROKEN</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Updated at: {(() => {
            const createdAtDate = new Date(Number(updatedAt));

            if (!isValid(createdAtDate)) {
              return 'Invalid date';
            }

            return format(createdAtDate, 'MMMM dd, yyyy HH:mm:ss');
          })()}
        </p>
          <button
            className={styles.button}
            type="submit"
            disabled={updating}
          >
            Submit
          </button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default EditButtonForm;