import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSavedJobs } from "@/Redux/savedJobsSlice"; // ✅ Correct import

const useGetSavedJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSavedJobs())
      .unwrap() // ✅ Ensures proper error handling
      .catch((error) => console.error("Error fetching saved jobs:", error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return { loading }; // ✅ Return an object for future extensibility
};

export default useGetSavedJobs;
