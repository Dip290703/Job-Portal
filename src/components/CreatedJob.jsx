import { getMyJobs } from "@/api/apiJobs"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { BarLoader } from "react-spinners"
import JobCard from "./JobCard"


const CreatedJob = () => {
  const {user }  = useUser()
  const  {
    loading : loadingCreateJobs,
    data:createdJobs,
    fn:fnCreatedJobs,
  }= useFetch(getMyJobs,{
    recruiter_id : user.id,
  })
  
  useEffect(() => {
    fnCreatedJobs()
  },[])
  if(loadingCreateJobs) {
    return <BarLoader className="mb-4 " width={"100%"} color="#36d7b7"
/>  }
  return (
    <div>
       <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  onJobSaved={fnCreatedJobs}
                  job={job}
                  key={job.id}
                  isMyJob
                />
              );
            })
          ) : (
            <div>no jobs</div>
          )}
        </div>
    </div>
  )
}

export default CreatedJob