import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layout/AppLayout";
import SavedJobs from "./pages/SavedJobs";
import Job from "./pages/Job";

import JobListing from "./pages/JobListing";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import OnBoarding from "./pages/OnBoarding";

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
          element: <Job />,
        },
        {
          path: "/savedjobs",
          element: <SavedJobs />,
        },
        {
          path: "/joblisting",
          element: <JobListing />,
        },
        {
          path: "/postjobs",
          element: <PostJob />,
        },
        {
          path: "/myjobs",
          element: <MyJobs />,
        },
        {
          path: "/onboarding",
          element: <OnBoarding />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
