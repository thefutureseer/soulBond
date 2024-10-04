'use client';

import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROMISES } from '../../graphql/promises';
import { PromiseType } from '../types/graphql';
import { format, isValid } from 'date-fns';
import EditButtonForm from './EditButtonForm';

const PromiseList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PROMISES);
  const [editingPromise, setEdit] = useState(false);
  const [selectedPromise, setSelectedPromise] = useState<PromiseType | undefined>(undefined);
  
  const handleEdit = (soulpromise: PromiseType) => {
    setSelectedPromise(soulpromise);
    setEdit(true);
  };
  
    if (loading) return <p>Loading promises...</p>;
    if (error) return <p>Error fetching promises: {error.message}</p>;

  return (
    <div>
      {
        editingPromise && selectedPromise && (
          <EditButtonForm
            soulpromise={selectedPromise}
            onClose={
              ()=>{
                setEdit(false);
                setSelectedPromise(undefined);
              }
            }
          />
        )
      }
      <h2 className="text-2xl font-bold mb-4">Promises List</h2>
      {data?.getPromises?.length > 0 ? (
        data.getPromises.map((soulpromise: PromiseType) => (
          <div key={soulpromise.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{soulpromise.title}</h3>
            <p>{soulpromise.description}</p>
            <p>Status: {soulpromise.status}</p>
            <p className="text-sm text-gray-600">last update was: { // Format the date correctly
              (() => {
                // Log the raw date value for debugging
                console.log("Raw createdAt value:", soulpromise.createdAt);

                // Convert the timestamp to a Date object
                const createdAtDate = new Date(Number(soulpromise.createdAt)); // Ensure it's a number

                // Check if the date is valid
                if (!isValid(createdAtDate)) {
                  console.error("Invalid date value for createdAt:", soulpromise.createdAt);
                  return "Invalid date"; // Fallback value if date is invalid
                }

                // Format the date if valid
                return format(createdAtDate, 'MMMM dd, yyyy HH:mm:ss');
              })()
              }
            </p>
            <button onClick={() => handleEdit(soulpromise)} className="p-2 bg-gradient-to-b from-indigo-300 to-white-100 text-white">Edit</button>
          </div>
        ))
      ) : (
        <p>No promises found.</p>
      )}
    </div>
  );
};

export default PromiseList;