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
        data.getPromises.map((promise: PromiseType) => (
          <div key={promise.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{promise.title}</h3>
            <p>{promise.description}</p>
            <p>Status: {promise.status}</p>
            {/* <p className="text-sm text-gray-600">Created at: {new Date(promise.createdAt).toLocaleString()}</p> */}
          </div>
        ))
      ) : (
        <p>No promises found.</p>
      )}
    </div>
  );
};

export default PromiseList;