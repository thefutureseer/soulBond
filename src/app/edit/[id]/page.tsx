'use client'

import { useQuery, useMutation } from '@apollo/client';
import { GET_PROMISE, UPDATE_PROMISE } from 'graphql/promises';
import {EditButtonFormProps, UpdatePromiseInput} from '../../types/graphql'
import { useState, useEffect } from 'react';
// import { edgeServerAppPaths } from 'next/dist/build/webpack/plugins/pages-manifest-plugin';

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
    // console.log("edit page: id", id)
    console.log("Submitting update with variables:", {
      id,
      input: {
        title,
        description,
        status,
        editedById: "123e4567-e89b-12d3-a456-426614174000" // Hardcoded user ID for now
      },
    });
  
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
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      <p className="text-lg mb-4 font-semibold text-blue-400">Soul Bond ID: {id}</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Edited by user ID:</label>
          <p className="text-gray-900">123e4567-e89b-12d3-a456-426614174000</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status click to change:</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="BROKEN">BROKEN</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-pink-500 hover:bg-blue-800  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={updating}
          >
            Update
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default EditButtonForm;