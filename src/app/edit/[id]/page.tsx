'use client' 
import React, { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROMISE, UPDATE_PROMISE } from 'graphql/promises';
import { EditButtonFormProps, PromiseType } from 'types/graphql';
import { statusColors } from 'ui/statusColors';
import styles from 'styles/editButtonForm.module.css';

const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
  const { id } = params; // Get the promise ID from the route params
  const [title, setTitle] = useState(''); // State for the title
  const [description, setDescription] = useState(''); // State for the description
  const [status, setStatus] = useState(''); // State for the status
  const [updatedAt, setCreated] = useState(''); // State for the updated at timestamp
  const [message, setMessage] = useState(''); // State for the message (error or success)
  const [createdById, setEditedById] = useState(''); // State for the edited by user ID
  const [edits, setEdits]= useState<PromiseType[]>([]); // State for the edits
  const [parentId, setParentId] = useState(''); // State for the parent ID  
  const [offset, setOffset] = useState(0); // State for the offset of pagination
  const [hasMore, setHasMore] = useState(true); // State for checking if there are more edits

  const limit = 2; // set limit to the number of edits per click

  // Fetch the promise data using the GET_PROMISE query
  const { data, loading, error, fetchMore } = useQuery(GET_PROMISE, {
    variables: { id, offset, limit },
  });

  // Define the mutation for updating the promise
  const [updatePromise, { loading: updating }] = useMutation(UPDATE_PROMISE, {
    onCompleted: () => {
      setMessage("Update complete");
      window.location.assign('/'); // Redirect to the main page with a full page reload
    },
    onError: (err) => setMessage(`Error: ${err.message}`), // Handle errors
  });

  // Update the state with the fetched promise data
  useEffect(() => {
    if (data?.getPromise) {
      console.log("this is data.getPromise.edits", data.getPromise.edits);  
      setTitle(data.getPromise.title);
      setDescription(data.getPromise.description);
      setStatus(data.getPromise.status);
      setCreated(data.getPromise.updatedAt);
      setEditedById(data.getPromise.createdById);
      setEdits(data.getPromise.edits);
      setParentId(data.getPromise.parent?.id || ''); // Set parent ID
    }
  }, [data]);

  // Handle form submission
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
            createdById: "123e4567-e89b-12d3-a456-426614174000", // Hardcoded user ID for now
            updatedAt: new Date().toISOString(),
            parentId: parentId, // Set parent ID 
          }
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  //load more edits
  const loadMoreEdits = () => {
    //fetch more edits
    fetchMore({
      variables: {
        offset: edits.length,
        limit,
      },
    }).then((result) => {
      //check if there are more edits
      if (result.data.getPromise.edits.length < limit) {
        setHasMore(false);
      }
      // Append new edits to the existing ones
      setEdits((prevEdits) => [...prevEdits, ...result.data.getPromise.edits]);
      //update offset
      setOffset((prevOffset) => prevOffset + limit);
    }).catch((err) => {
      console.error('Fetch More Error:', err);
    });
  };

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error.message}</p>; // Show error state

  return (
    <div className={styles.container}>
      <p className={styles.title}>Soul Bond ID: {id}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="mb-4">
          <label className={styles.label}>Edited by user ID:</label>
          <p className="text-gray-900">{createdById}</p>
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
        <div className="mb-4">
          <label className={styles.label}>Parent ID:</label>
          <input
            type="text"
            className={styles.input}
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          />
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
      <div className={styles.edits}>
        <h3>Previous Edits</h3>
        {
         edits.length > 0 ? (
          edits.map((edit) => (
            console.log("this is .edit full version & .edits 175 ",  edit.version ),
            console.log("this is .edit.edits 176 ",  edit.edits ),
            <div key={edit.id} className="mb-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">Version {edit.version}</h4>
              <p>{edit.title}</p>
              <p>{edit.description}</p>
              <p>Status: {edit.status}</p>
              <p className="text-sm text-gray-600">
                Created at: {(() => {
                  let createdAtDate = new Date(Number(edit.createdAt));
                  if(!isValid(createdAtDate)) {
                    return 'Invalid date';
                  }
                  return format(createdAtDate, 'MMMM dd, yyyy HH:mm:ss')
                })()}
              </p>
            </div>
          
          ))
        ) : ( console.log("this is edits length", edits.length ), 

              <p>No edits found.</p>  
            )
      }
      {hasMore && (
        <button
          className={styles.button}
          onClick={loadMoreEdits}
        >
          Load More
        </button>
      )}
      </div>
    </div>
  );
};

export default EditButtonForm;