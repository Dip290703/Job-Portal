import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const handleRoleSelection = async (role) => {
    await user.update({ unsafeMetadata: { role }, })
      .then(() => {
        navigate(role === "Recruiter" ? "/postjobs" : "/jobs");
      })
      .catch((err) => {
        console.log("Error updating role:", err);
      });
  };
  
  useEffect(()=>{
    if(user?.unsafeMetadata?.role){
       navigate(user?.unsafeMetadata?.role === "Recruiter" ? "/postjobs" : "/jobs");
    }
  },[user])

 
  if (!isLoaded) {
    return <BarLoader className="mb-4 " width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-40 ">
      <h2 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-7xl sm:text-8xl tracking-tighter font-extrabold">
        I am a...
      </h2>
      <div className=" mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("Recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
