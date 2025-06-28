import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";
import CreatedJob from "../components/CreatedJob";
import CreatedApplication from "@/components/CreatedApplication";

const MyJobs = () => {
  const {isLoaded,user} = useUser()

   if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-6xl font-extrabold sm:text-7xl  tracking-tighter text-center pb-8 ">
        {
          user?.unsafeMetadata?.role === "candidate" 
          ? "My Applications"
          : "My Jobs"
        }
      </h1>
      {
        user?.unsafeMetadata?.role === "candidate" ? (
          <CreatedApplication />
        ) : (
          <CreatedJob />
        )
      }
    </div>
  );
};

export default MyJobs;
