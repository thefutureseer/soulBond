"use client";
import PromiseForm from '../app/components/PromiseForm';
import PromiseList from '../app/components/PromiseList';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-100 text-gray-800 p-8 gap-16 sm:p-20">
      <h1 className="text-5xl font-bold tracking-wide drop-shadow-md text-indigo-800">
        Soul Bonding App
      </h1>
      
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-xl text-gray-900">
        <h2 className="text-2xl font-semibold mb-4">Create Your Promise</h2>
        <PromiseForm />
      </div>

      <div className="w-full max-w-lg bg-white rounded-lg p-8 shadow-xl text-gray-900">
        <h2 className="text-2xl font-semibold mb-4">Soul Connections</h2>
        <PromiseList />
      </div>
    </div>
  );
};

export default Home;