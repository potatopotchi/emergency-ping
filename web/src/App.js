import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import PhilippinesMap from './components/PhilippinesMap';

const markers = [
  {
    name: 'User 1', // user name
    icon: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109", // image icon
    status: 'NEED_HELP', // SAFE, NEED_HELP, NO_RESPONSE
    address: [10.534851, 122.875836], // user address
  },
  {
    name: 'User 2', 
    icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
    status: 'SAFE', 
    address: [7.938080467480591, 122.7804583101427],
  },
  {
    name: 'User 3',
    icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
    status: 'NO_RESPONSE',
    address: [11.9960484769978, 121.91716483177602],
  },
  {
    name: 'User 4',
    icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
    status: 'SAFE',
    address: [18.373760, 121.105051],
  },
  {
    name: 'User 5',
    icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
    status: 'NO_RESPONSE',
    address: [9.282173091121518, 125.84579344397739],
  },
  {
    name: 'User 6',
    icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
    status: 'SAFE',
    address: [13.751736402758034, 123.39197473649288],
  },
  {
    name: 'User 7',
    icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
    status: 'NEED_HELP',
    address: [13.781983178861278, 121.01534704946845],
  },
]

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
          <PhilippinesMap zoomLevel={5} markers={markers} />
        </div>
      </div>
    </div>
  );
};

export default App;