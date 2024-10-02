//import React, { useEffect, useState } from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Navbar } from "@synergy-project-t/ui-components";
import { AuthWrapper } from "@synergy-project-t/data-wrappers";
import { LoginPage, Homepage } from "@synergy-project-t/pages";


const App = () => {

  const MainApp = 
    <AuthWrapper>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Outlet />
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
      ],
    },
  ]);

  return (
        <RouterProvider router={router} />
  );
};

export default App;