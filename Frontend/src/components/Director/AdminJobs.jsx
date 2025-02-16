import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByTitle,setSearchJobByCompany} from '@/Redux/JobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [companyInput, setCompanyInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  // const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setSearchJobByText(input));
  // }, [input]);
  useEffect(() => {//added
    dispatch(setSearchJobByCompany(companyInput));
  }, [companyInput]);

  useEffect(() => {//added
    dispatch(setSearchJobByTitle(titleInput));
  }, [titleInput]);

  return (
    <div className="bg-main-bg min-h-screen relative">
  {/* Overlay Background */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
  
  {/* Main Content Section */}
  <div className="relative z-10">
    <Navbar />
    <div className="max-w-6xl mx-auto my-10 rounded-2xl bg-white p-10 shadow-2xl">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by Company"
          onChange={(e) => setCompanyInput(e.target.value)}
        />
        <Input
          className="w-fit"
          placeholder="Filter by Job Title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
      </div>
      <AdminJobsTable />
    </div>
  </div>
</div>

  )
}

export default AdminJobs