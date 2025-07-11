import { getSingleJob, updatiingHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/ApplicationCard";
import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updatiingHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChnage = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded, id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4 " width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center ">
        <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-4xl sm:text-6xl font-extrabold  pb-3">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>
      {/* //hiring Section */}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChnage}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-900" : "bg-red-900"} `}
          >
            <SelectValue
              placeholder={
                "Hiring Status" + (job?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for{" "}
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="!bg-transparent sm:text-lg"
      />

      {/* rende  applications */}
      {user?.unsafeMetadata?.role !== "Recruiter" && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find(
            (app) => app.candidate_id === user.id
          )}
        />
      )}

      {job?.applications?.length > 0 && user?.unsafeMetadata?.role === "Recruiter" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold ">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobListing;
