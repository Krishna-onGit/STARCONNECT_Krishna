import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// ✅ Save a job
export const saveJob = createAsyncThunk(
    "savedJobs/saveJob",
    async (jobId, { rejectWithValue }) => { // 🔹 Changed _jobId to jobId
        try {
            const response = await axios.post("/api/v1/saved-job/save", { jobId }, { withCredentials: true });
            toast.success("Job saved successfully!"); // ✅ Success message
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save job"); // ✅ Error message
            return rejectWithValue(error.response?.data?.message || "Failed to save job");
        }
    }
);

// ✅ Fetch all saved jobs
export const fetchSavedJobs = createAsyncThunk(
    "savedJobs/fetchSavedJobs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/saved-jobs", { jobId }, { withCredentials: true });
            return response.data; // ✅ Ensure backend returns correct data format
        } catch (error) {
            toast.error("Failed to fetch saved jobs"); // ✅ Error message
            return rejectWithValue(error.response?.data?.message || "Failed to fetch saved jobs");
        }
    }
);

// ✅ Delete a saved job
export const deleteSavedJob = createAsyncThunk(
    "savedJobs/deleteSavedJob",
    async (jobId, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/v1/saved-job/delete/${jobId}`, { withCredentials: true });
            toast.success("Job removed from saved jobs!"); // ✅ Success message
            return jobId;
        } catch (error) {
            toast.error("Failed to remove saved job"); // ✅ Error message
            return rejectWithValue(error.response?.data?.message || "Failed to remove saved job");
        }
    }
);

const savedJobsSlice = createSlice({
    name: "savedJobs",
    initialState: {
        savedJobs: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Fetch saved jobs
            .addCase(fetchSavedJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSavedJobs.fulfilled, (state, action) => {
                state.savedJobs = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSavedJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // ✅ Save job
            .addCase(saveJob.pending, (state) => {
                state.status = "loading";
            })
            .addCase(saveJob.fulfilled, (state, action) => {
                state.savedJobs.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(saveJob.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // ✅ Delete saved job
            .addCase(deleteSavedJob.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteSavedJob.fulfilled, (state, action) => {
                state.savedJobs = state.savedJobs.filter((job) => job._id !== action.payload);
                state.status = "succeeded";
            })
            .addCase(deleteSavedJob.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default savedJobsSlice.reducer;
