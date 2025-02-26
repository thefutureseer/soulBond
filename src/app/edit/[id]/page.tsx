'use client'

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROMISE, UPDATE_PROMISE } from 'graphql/promises';
import {EditButtonFormProps} from '../../../types/graphql'
import { statusColors } from 'ui/statusColors';
import styles from 'styles/EditButtonForm.module.css';

const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
  const { id } = params; // Get the promise ID from the route params
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  //Error message
  const [message, setMessage] = useState('');

  const { data, loading, error } = useQuery(GET_PROMISE, {
    variables: { id },
  });

  //If updating is true then submit button is disabled.
  const [updatePromise, {loading: updating}] = useMutation(UPDATE_PROMISE, {
    onCompleted: ()=> setMessage("Update complete"),
    onError: (err)=> setMessage(`error: ${err.message}`)
  })

  useEffect(() => {
    if (data?.getPromise) {
      setTitle(data.getPromise.title);
      setDescription(data.getPromise.description);
      setStatus(data.getPromise.status);
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
            editedById: "123e4567-e89b-12d3-a456-426614174000" // Hardcoded user ID for now
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
          <p className="text-gray-900">123e4567-e89b-12d3-a456-426614174000</p>
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
          <label className={styles.label}>Status updater:</label>
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
          <button
            className={styles.button}
            type="submit"
            disabled={updating}
          >
            Update
          </button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default EditButtonForm;