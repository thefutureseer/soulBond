'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const PromiseList = () => {
  const [promises, setPromises] = useState<any[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for new promises
    socket.on('newPromise', (newPromise) => {
      setPromises((prevPromises) => [...prevPromises, newPromise]);
    });

    return () => {
      socket.off('newPromise');
      socket.off('connect');
    };
  }, []);

  return (
    <div>
      {promises.map((promise, index) => (
        <div key={index}>
          <h3>{promise.title}</h3>
          <p>{promise.description}</p>
          <p>Status: {promise.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PromiseList;