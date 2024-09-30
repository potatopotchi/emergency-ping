//import React, { useEffect, useState } from 'react';
import './index.css';
import { Navbar } from "@synergy-project-t/ui-components";
import { AuthWrapper } from "@synergy-project-t/data-wrappers";
import { AdminHomepage } from "@synergy-project-t/pages";

const App = () => {
  //const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     const response = await fetch('http://localhost:5000/api/message');
  //     const data = await response.json();
  //     setMessage(data.message);
  //   };

  //   fetchMessage();
  // }, []);

  return (
    <AuthWrapper>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-100">
          {
          //<h1 className="text-4xl font-bold text-blue-600">{message || "Loading..."}</h1>
          }
        </div>
      </div>
    </AuthWrapper>
  );
};

export default App;