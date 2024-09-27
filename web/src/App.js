import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import PhilippinesMap from './components/PhilippinesMap';

const App = () => {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     const response = await fetch('http://localhost:5000/api/message');
  //     const data = await response.json();
  //     setMessage(data.message);
  //   };

  //   fetchMessage();
  // }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        {/* <h1 className="text-4xl font-bold text-blue-600">{message || "Loading..."}</h1> */}
        <div className="w-[600px] h-full relative p-5">
        <PhilippinesMap zoomLevel={5} />
        </div>
      </div>
    </div>
  );
};

export default App;