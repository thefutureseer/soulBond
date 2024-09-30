'use client';

import { useQuery } from '@apollo/client';
import { GET_PROMISES } from '../../graphql/promises';
import { PromiseType } from '../types/graphql';

const PromiseList = () => {
  const { loading, error, data } = useQuery(GET_PROMISES);

  if (loading) return <p>Loading promises...</p>;
  if (error) return <p>Error: {error.message}</p>;
console.log("Heres the data: ", data);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Promises List</h2>
      {data?.getPromises?.length > 0 ? (
        data.getPromises.map((soulpromise: PromiseType) => (
          <div key={soulpromise.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{soulpromise.title}</h3>
            <p>{soulpromise.description}</p>
            <p>Status: {soulpromise.status}</p>
            <p className="text-sm text-gray-600">Created at: { // Format the date correctly
                (() => {
                  const createdAtDate = new Date(soulpromise.createdAt);
                  const formatter = new Intl.DateTimeFormat('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    second: 'numeric' 
                  });
                  return formatter.format(createdAtDate);
                })()
              }
            </p>
          </div>
        ))
      ) : (
        <p>No promises found.</p>
      )}
    </div>
  );
};

export default PromiseList;