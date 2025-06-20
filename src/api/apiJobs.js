import supabaseClient from "../utils/supabase";

export async function getJobs(token, { location, company_id, serachQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").select("*");
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (serachQuery) {
    query = query.ilike("title", `%${serachQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }
  return data;
}
