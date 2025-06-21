import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";


const Job = () => {
  const [searchQuery,setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const {isLoaded} = useUser()
  const {
    fn:fnJobs,
    data:jobs,
    loading:loadingJobs,
  } = useFetch(getJobs,{
    location,
    company_id,
    searchQuery
  })

 
 useEffect(() => {
  if (isLoaded) fnJobs();
 }, [isLoaded,location,company_id,searchQuery])
 
  if (!isLoaded) {
    return <BarLoader className="mb-4 " width={"100%"} color="#36d7b7" />;
  }

  return <div>
    <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-6xl sm:text-7xl font-extrabold text-center pb-8">Latest Jobs</h1>
    {
      loadingJobs && (
        <BarLoader className="mt-4 " width={"100%"} color="#36d7b7" />
      )
    } 
    {
      loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
             jobs?.length ? (
              jobs.map((job) => {
                return <JobCard  job={job} key={job.id} />
              })
             ):(
              <div>no jobs</div>
             )
          }
        </div>
      )
    }
  </div>;
};

export default Job;
