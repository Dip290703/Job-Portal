import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";
import { getJobs } from "../api/apiJobs";

const Job = () => {
  const { session, isLoaded } = useSession();

  const fetchJobs = async () => {
    if (!isLoaded || !session) {
      console.log("🔁 Session not loaded yet.");
      return;
    }

    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });

    const data = await getJobs(supabaseAccessToken);
    console.log("✅ Jobs fetched:", data);
  };

  useEffect(() => {
    fetchJobs();
  }, [isLoaded, session]);

  return <div>Job</div>;
};

export default Job;
