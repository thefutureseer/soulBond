// src/app/edit/[id]/page.tsx
'use client';

import React from 'react';

interface EditButtonFormProps {
  params: {
    id: string;
  };
}

const EditButtonForm: React.FC<EditButtonFormProps> = ({ params }) => {
  const { id } = params; // Get the promise id from the URL

  // Render user ID
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg mb-4">User ID: {id}</p>
    </div>
  );
};

export default EditButtonForm;