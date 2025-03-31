'use client';

import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_PROMISES } from 'graphql/promises';
import { SoulPromise, GetPromisesQueryResult } from 'src/types/graphql';
import { format, isValid } from 'date-fns';
import { statusColors } from 'ui/statusColors';

const PromiseList: React.FC = () => {
  const client = useApolloClient(); // Access Apollo Client
  const { loading, error, data } = useQuery<GetPromisesQueryResult>(GET_PROMISES);

  const handleEdit = (id: string) => {
    // Reset store before navigating to the edit page
    client.resetStore().then(() => {
      window.location.assign(`/edit/${id}`);
    });
  };

  if (loading) return <p>Loading promises...</p>;
  if (error) return <p>Error fetching promises: {error.message}</p>;

  return (
    <div>
      {data?.getPromises?.length ? (
        (data.getPromises ?? []).map((soulpromise: SoulPromise) => (
          <div key={soulpromise.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{soulpromise.title}</h3>
            <p>{soulpromise.description}</p>
            <div className={`p-2 mb-2 rounded ${statusColors[soulpromise.status]}`}>
              Status: {soulpromise.status}
            </div>
            <p className="text-sm text-gray-600">
              Last update was: {(() => {
                const createdAtDate = new Date(Number(soulpromise.updatedAt));

                if (!isValid(createdAtDate)) {
                  return 'Invalid date';
                }

                return format(createdAtDate, 'MMMM dd, yyyy HH:mm:ss');
              })()}
            </p>
            <button
              onClick={() => handleEdit(soulpromise.id)}
              className="p-2 bg-gradient-to-b from-indigo-300 to-white-100 text-white"
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>No promises found.</p>
      )}
    </div>
  );
};

export default PromiseList;