import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layout/AppLayout";
import SavedJobs from "./pages/SavedJobs";
import Job from "./pages/Job";
import './App.css'
import JobListing from "./pages/JobListing";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import OnBoarding from "./pages/OnBoarding";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/job/:id",
          element: 
         ( <ProtectedRoute><Job /></ProtectedRoute>),
          
        },
        {
          path: "/savedjobs",
          element:
       (    <ProtectedRoute><SavedJobs /></ProtectedRoute>),
          
        },
        {
          path: "/joblisting",
          element:
          ( <ProtectedRoute><JobListing /></ProtectedRoute>),
          
        },
        {
          path: "/postjobs",
          element:
          ( <ProtectedRoute> <PostJob /></ProtectedRoute>),
         
        },
        {
          path: "/myjobs",
          element:
           (<ProtectedRoute> <MyJobs /></ProtectedRoute>),
         
        },
        {
          path: "/onboarding",
          element: 
           (<ProtectedRoute> <OnBoarding /></ProtectedRoute>),
     
        },
        {
          path:"/jobs",
          element:
           (<ProtectedRoute>
            <Job/>
           </ProtectedRoute>
          )
        }
      ],
    },
  ]);
  return (
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
     </ThemeProvider>
  )
};

export default App;
