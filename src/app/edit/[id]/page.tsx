'use client'
import { useParams } from "next/navigation";

 
const EditButtonForm: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          Soul Bond Editor
        </h1>
        <p className="text-gray-700 text-center mb-6">
          <span className="font-semibold">Bond ID:</span> {id}
        </p>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <p className="text-indigo-700 text-center font-medium">
            This page is currently under maintenance.
          </p>
        </div>
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// import React, { useState, useEffect } from 'react';
// import { format, isValid } from 'date-fns';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_PROMISE, UPDATE_PROMISE, GET_EDITSLOG_WITH_THIS_ID } from 'graphql/promises';
// import { EditButtonFormProps, EditsLog } from 'types/graphql';
// import { statusColors } from 'ui/statusColors';
// import styles from 'styles/editButtonForm.module.css';

// const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
//   const { id } = params; // Get the promise ID from the route params
//   const [title, setTitle] = useState(''); // State for the title
//   const [description, setDescription] = useState(''); // State for the description
//   const [status, setStatus] = useState(''); // State for the status
//   const [updatedAt, setCreated] = useState(''); // State for the updated at timestamp
//   const [message, setMessage] = useState(''); // State for the message (error or success)
//   const [createdById, setEditedById] = useState(''); // State for the edited by user ID
//   const [edits, setEdits]= useState<EditsLog[]>([]); // State for the edits
//   const [parentId, setParentId] = useState(''); // State for the parent ID  
//   const [offset, setOffset] = useState(0); // State for the offset of pagination
//   const [hasMore, setHasMore] = useState(true); // State for checking if there are more edits

//   const limit = 2; // set limit to the number of edits per click

//   // Fetch the editslog of the particular promise
//   const { data: editsLogData, loading: editsLogLoading, error: editsLogError } = useQuery(GET_EDITSLOG_WITH_THIS_ID, {  
//     variables: { parentId: id, offset, limit },
//     fetchPolicy: 'network-only', // Always fetch from the network
//   });

//   // Fetch the promise data using the GET_PROMISE query
//   const { data: soulPromiseData, loading: soulPromiseLoading, error: soulPromiseError, fetchMore } = useQuery(GET_PROMISE, {
//     variables: { id, offset, limit },
//   });

//   // Define the mutation for updating the promise
//   const [updatePromise, { loading: updating }] = useMutation(UPDATE_PROMISE, {
//     onCompleted: () => {
//       setMessage("Update complete");
//       window.location.assign('/'); // Redirect to the main page with a full page reload
//     },
//     onError: (err) => setMessage(`Error: ${err.message}`), // Handle errors
//   });

//   // Update the state with the fetched promise data
//   useEffect(() => {
//     if (editsLogData?.getPromise) {
//       console.log("this is data of editslogData: ", editsLogData);  
//       setTitle(editsLogData.getPromise.title);
//       setDescription(editsLogData.getPromise.description);
//       setStatus(editsLogData.getPromise.status);
//       setCreated(editsLogData.getPromise.updatedAt);
//       setEditedById(editsLogData.editedByUserId);
//       setEdits(editsLogData.edits);
//       setParentId(editsLogData.parent?.id || ''); // Set parent ID
//     }
//   }, [editsLogData]);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await updatePromise({
//         variables: {
//           id,
//           input: {
//             title,
//             description,
//             status,
//             createdById: "123e4567-e89b-12d3-a456-426614174000", // Hardcoded user ID for now
//             updatedAt: new Date().toISOString(),
//             parentId: parentId, // Set soulpromises parent ID 
//           }
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   //load more edits
//   const loadMoreEdits = () => {
//     //fetch more edits
//     fetchMore({
//       variables: {
//         offset: edits.length,
//         limit,
//       },
//     }).then((result) => {
//       //check if there are more edits
//       if (result.data < limit) {
//         // If the number of fetched edits is less than the limit, set hasMore to false
//         setHasMore(false);
//       }
//       // Append new edits to the existing ones
//       setEdits((prevEdits) => [...prevEdits, ...result.data.getPromise.edits]);
//       //update offset
//       setOffset((prevOffset) => prevOffset + limit);
//     }).catch((err) => {
//       console.error('Fetch More Error:', err);
//     });
//   };

//   if (soulPromiseLoading) return <p>Loading soul promises...</p>; // Show loading state
//   if (soulPromiseError) return <p>soul_Promise **Error: {soulPromiseError.message}</p>; // Show error state

//   return (
//     <div className={styles.container}>
//       <p className={styles.title}>Soul Bond ID: {id}</p>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className="mb-4">
//           <label className={styles.label}>Edited by user ID:</label>
//           <p className="text-gray-900">:{createdById}</p>
//         </div>
//         <div className="mb-4">
//           <label className={styles.label}>Title:</label>
//           <input
//             type="text"
//             className={styles.input}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className={styles.label}>Description:</label>
//           <input
//             type="text"
//             className={styles.input}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className={styles.label}>Update status here:</label>
//           <div className={`${styles.selectWrapper} ${statusColors[status]}`}>
//             <select
//               className={styles.select}
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="PENDING">PENDING</option>
//               <option value="COMPLETED">COMPLETED</option>
//               <option value="BROKEN">BROKEN</option>
//             </select>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className={styles.label}>Parent ID:</label>
//           <input
//             type="text"
//             className={styles.input}
//             value={parentId}
//             onChange={() => setParentId(id)}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-600">
//           Updated at: {(() => {
//             const createdAtDate = new Date(Number(updatedAt));

//             if (!isValid(createdAtDate)) {
//               return 'Invalid date';
//             }

//             return format(createdAtDate, 'MMMM dd, yyyy HH:mm:ss');
//           })()}
//         </p>
//           <button
//             className={styles.button}
//             type="submit"
//             disabled={updating}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//       {message && <p className={styles.message}>{message}</p>}
//       <div className={styles.edits}>
//         <h3>Previous Edits</h3>
//         {
//          edits.length > 0 ? (
//           edits.map((edit) => (
//             console.log("this is  .edits 183 ",  edit ),
//             console.log("this is .edit full version & .edits 184 ",  edit.parent ),
//             console.log("this is .edit.edits 185 ",  edit.changes ),
//             <div key={edit.id} className="mb-4 p-4 border rounded">
//               <h4 className="text-lg font-semibold">Version {edit.changes}</h4>
//               <p>Changes: {JSON.stringify(edit.changes)}</p>
//               <p>{edit.changes}</p>
//               <p>Status: {edit.changes}</p>
//               <p className="text-sm text-gray-600">
//                 Created at: {(() => {
//                   let createdAtDate = new Date(Number(edit.createdAt));
//                   if(!isValid(createdAtDate)) {
//                     return 'Invalid date';
//                   }
//                   return format(createdAtDate, 'MMMM dd, yyyy HH:mm:ss')
//                 })()}
//               </p>
//             </div>
          
//           ))
//         ) : ( console.log("this is edits length", edits.length ), 

//               <p>No edits found.</p>  
//             )
//       }
//       {hasMore && (
//         <button
//           className={styles.button}
//           onClick={loadMoreEdits}
//         >
//           Load More
//         </button>
//       )}
//       </div>
//     </div>
//   );
// };

export default EditButtonForm;