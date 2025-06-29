import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

const CreatedApplication = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications);

  useEffect(() => {
    if (isLoaded && user) {
      fnApplications({ user_id: user.id });
    }
  }, [isLoaded, user]);

  if (!isLoaded || loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const isEmpty = !Array.isArray(applications) || applications.length === 0;

  return (
    <div className="flex flex-col gap-2">
      {isEmpty ? (
        <p className="text-center text-muted-foreground text-sm py-4">
          You haven't applied for any jobs yet.
        </p>
      ) : (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        ))
      )}
    </div>
  );
};

export default CreatedApplication;
