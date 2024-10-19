//import React, { useEffect, useState } from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Navbar } from "@synergy-project-t/ui-components";
import { AuthWrapper } from "@synergy-project-t/data-wrappers";
import { LoginPage, Homepage, ProfilePage } from "@synergy-project-t/pages";


const App = () => {

  const MainApp = 
    <AuthWrapper>
      <div className="flex flex-col h-screen bg-[#fbfbfb]">
        <Navbar />
        <div className='flex flex-col h-[100%] p-5'>
          <Outlet />
        </div>
      </div>
    </AuthWrapper>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: MainApp,
      children: [
        {
          index: true,
          path: "",
          element: <Homepage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return (
        <RouterProvider router={router} />
  );
};

export default App;